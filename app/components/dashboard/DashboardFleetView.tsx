"use client";

import { useState } from "react";
import FleetMap from "./FleetMap";
import VesselList from "./VesselList";

export default function DashboardFleetView() {
    const [selectedVesselId, setSelectedVesselId] = useState<string | null>(
        null
    );

    return (
        <>
            <div className="mt-6">
                <FleetMap
                    selectedVesselId={selectedVesselId}
                    onVesselSelect={setSelectedVesselId}
                />
            </div>

            <div className="mt-6">
                <VesselList
                    selectedVesselId={selectedVesselId}
                    onVesselSelect={setSelectedVesselId}
                />
            </div>
        </>
    );
}