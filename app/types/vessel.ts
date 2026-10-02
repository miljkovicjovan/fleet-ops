export type VesselStatus = "active" | "offline" | "inactive";

export type Vessel = {
    id: string;
    name: string;
    imo: string;
    status: VesselStatus;
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    lastUpdated: string;
};