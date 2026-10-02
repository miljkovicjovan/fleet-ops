import FleetView from "@/app/components/dashboard/FleetView";

export default function VesselsPage() {
    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-medium text-cyan-400">
                        Fleet
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                        Vessels
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                        View and monitor all vessels in your fleet.
                    </p>
                </div>

                <FleetView />
            </div>
        </div>
    );
}