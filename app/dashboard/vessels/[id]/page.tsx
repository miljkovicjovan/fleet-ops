import Link from "next/link";
import { notFound } from "next/navigation";
import { mockVessels } from "../../../data/mock-vessels";

type VesselPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function VesselPage({
    params,
}: VesselPageProps) {
    const { id } = await params;

    const vessel = mockVessels.find((vessel) => vessel.id === id);

    if (!vessel) {
        notFound();
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/dashboard"
                    className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                >
                    ← Back to Dashboard
                </Link>

                <div className="mt-6">
                    <p className="text-sm font-medium text-cyan-400">
                        Vessel
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100">
                        {vessel.name}
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        IMO {vessel.imo}
                    </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                        <p className="text-sm text-zinc-500">
                            Status
                        </p>

                        <p className="mt-2 text-2xl font-semibold capitalize text-zinc-100">
                            {vessel.status}
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                        <p className="text-sm text-zinc-500">
                            Speed
                        </p>

                        <p className="mt-2 text-2xl font-semibold text-zinc-100">
                            {vessel.speed.toFixed(1)} kn
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                        <p className="text-sm text-zinc-500">
                            Heading
                        </p>

                        <p className="mt-2 text-2xl font-semibold text-zinc-100">
                            {vessel.heading}°
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                        <p className="text-sm text-zinc-500">
                            Last Update
                        </p>

                        <p className="mt-2 text-sm font-medium text-zinc-100">
                            {new Date(
                                vessel.lastUpdated
                            ).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h2 className="text-sm font-semibold text-zinc-100">
                        Position
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-zinc-500">
                                Latitude
                            </p>

                            <p className="mt-1 text-sm text-zinc-300">
                                {vessel.latitude.toFixed(4)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-500">
                                Longitude
                            </p>

                            <p className="mt-1 text-sm text-zinc-300">
                                {vessel.longitude.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}