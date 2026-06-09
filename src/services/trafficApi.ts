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
};

