export type LaneDirection = "North" | "East" | "South" | "West";
export type LightState = "green" | "yellow" | "red";
export interface LaneStatePayload {
	direction: LaneDirection;
	light: LightState;
	vehicleCount: number;
	density: "LOW" | "MEDIUM" | "HIGH";
	densityScore: number;
}
