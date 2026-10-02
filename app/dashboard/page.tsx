import FleetMap from "../components/dashboard/FleetMap";
import FleetStatCard from "../components/dashboard/FleetStatCard";
import VesselList from "../components/dashboard/VesselList";
import { mockVessels } from "../data/mock-vessels";

const fleetStats = {
    totalVessels: mockVessels.length,
    activeVessels: mockVessels.filter(
        (vessel) => vessel.status === "active"
    ).length,
    offlineVessels: mockVessels.filter(
        (vessel) => vessel.status === "offline"
    ).length,
    vesselsInAlert: 2,
};

export default function DashboardPage() {
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
                        value={fleetStats.totalVessels}
                        description="Vessels in your fleet"
                    />

                    <FleetStatCard
                        label="Active"
                        value={fleetStats.activeVessels}
                        description="Currently operational"
                    />

                    <FleetStatCard
                        label="Offline"
                        value={fleetStats.offlineVessels}
                        description="Not reporting data"
                    />

                    <FleetStatCard
                        label="In Alert"
                        value={fleetStats.vesselsInAlert}
                        description="Require attention"
                    />
                </div>

                <div className="mt-6">
                    <FleetMap />
                </div>

                <div className="mt-6">
                    <VesselList />
                </div>
            </div>
        </div>
    );
}