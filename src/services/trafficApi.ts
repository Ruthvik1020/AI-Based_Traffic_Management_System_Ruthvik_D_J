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
  }) {
};

