"use client";

import DashboardFleetView from "../components/dashboard/FleetView";
import FleetStatCard from "../components/dashboard/FleetStatCard";
import { useEffect, useState } from "react";
import { Vessel } from "../types/vessel";

export default function DashboardPage() {
    const [vessels, setVessels] = useState<Vessel[]>([]);

    useEffect(() => {
        async function fetchVessels() {
            const response = await fetch("/api/vessels");

            if (!response.ok) {
                throw new Error("Failed to fetch vessels");
            }

            const data: Vessel[] = await response.json();

            setVessels(data);
        }

        fetchVessels();
    }, []);

    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-medium text-cyan-400">
                        Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                        Fleet Overview
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                        Monitor your fleet, track vessel activity, and stay on
                        top of important alerts.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <FleetStatCard
                        label="Total Vessels"
                        value={vessels.length}
                        description="Vessels in your fleet"
                    />

                    <FleetStatCard
                        label="Active"
                        value={vessels.filter((vessel) => vessel.status === "active").length}
                        description="Currently operational"
                    />

                    <FleetStatCard
                        label="Offline"
                        value={vessels.filter((vessel) => vessel.status === "offline").length}
                        description="Not reporting data"
                    />

                    <FleetStatCard
                        label="In Alert"
                        value={2}
                        description="Require attention"
                    />
                </div>

                <DashboardFleetView />
            </div>
        </div>
    );
}