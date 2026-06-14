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
export const trafficApiService = {
	async analyzeTraffic(payload: {
		laneStates: LaneStatePayload[];
		currentPrompt: string;
		hasEmergency: boolean;
	}): Promise<TrafficAnalysisResponse> {
    if (!payload.laneStates || payload.laneStates.length === 0) {
      throw new Error("Cannot run processing analysis matrices on empty intersection states.");
    }

    try {
      const res = await fetch("/api/analyze-traffic", {
	      method: "POST",
	      headers: {
		      "Content-Type": "application/json",
		      "Accept": "application/json",
		      "X-Core-Client": "NeuralTraffic-V1"
	},
	body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`AI Core returned invalid server status indicator: ${res.status}`);
     }

     const data = await res.json();
     return data;

     } catch (error: any) {
      console.error("Critical connection failure identified in AI streaming infrastructure:", error);
      return {
        success: false,
        reportText: `Local Failover Alert: Network query parsing dropped. Reason: ${error.message || "Unknown error"}`
      };
    }
},

async saveMetrics(payload: { laneNorthCount: number; laneEastCount: number; }) {
	if (payload.normalWait < 0 || payload.aiWait < 0) {
