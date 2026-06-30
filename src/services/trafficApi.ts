export type LaneDirection = "North" | "East" | "South" | "West";
export type LightState = "green" | "yellow" | "red";

export interface LaneStatePayload {
	direction: LaneDirection;
	light: LightState;
	vehicleCount: number;
	density: "LOW" | "MEDIUM" | "HIGH";
	densityScore: number;
}

export interface PredictionData {
  lane: LaneDirection;
  projectedQueueLength: number;
  confidenceScore: number;
  recommendedDuration: number;
}

export interface TrafficAnalysisResponse {
	success: boolean;
	reportText: string;
	predictions?: PredictionData[];
	optimizedTimingConfig?: Record<LaneDirection, number>;
}

export interface MetricsSavePayload {
	laneNorthCount: number;
	laneEastCount: number;
	laneSouthCount: number;
	laneWestCount: number;
	normalWait: number;
	aiWait: number;
	logStr: string;
}

export interface DBResponse {
	success: boolean;
	entry?: {id: number; timestamp: string;};
	list?: Array<{ id: number; timestamp: string; aiWait: number }>;
}
export const trafficApiService = {
  /**
   * Dispatches current intersection matrix snapshot to Gemini AI Optimizer
   */
  async analyzeTraffic(payload: { laneStates: LaneStatePayload[]; currentPrompt: string; hasEmergency: boolean; }): Promise<TrafficAnalysisResponse> {
    if (!payload.laneStates || payload.laneStates.length === 0) {
      throw new Error("Empty intersection states.");
    }
    try {
      const res = await fetch("/api/analyze-traffic", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "X-Core-Client": "NeuralTraffic-V1" 
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("AI Core returned non-200 connection status metrics index.");
      }
      return await res.json();
    } catch (error: any) {
      return { 
        success: false, 
        reportText: `Local Failover Alert: Network query parsing dropped execution. ${error.message}` 
      };
    }
  },

  /**
   * Commits structural metrics snapshot to the SQLite persistence registry
   */
  async saveMetrics(payload: MetricsSavePayload): Promise<DBResponse> {
    if (payload.normalWait < 0 || payload.aiWait < 0) {
      throw new Error("Metrics constraints violation: Negative waiting values are invalid.");
    }
    try {
      const res = await fetch("/api/database/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error: any) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  },
  async fetchHistory(): Promise<DBResponse> {
  }
