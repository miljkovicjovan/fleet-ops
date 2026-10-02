"use client";

import { Vessel } from "@/app/types/vessel";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VesselPage() {
    const params = useParams();
    const id = params.id as string;

    const [vessel, setVessel] = useState<Vessel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVessel() {
            try {
                const response = await fetch(
                    `/api/vessels/${id}`
                );

                if (response.status === 404) {
                    setError("Vessel not found.");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch vessel"
                    );
                }

                const data: Vessel =
                    await response.json();

                setVessel(data);
            } catch {
                setError(
                    "Failed to load vessel information."
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchVessel();
    }, [id]);

    if (isLoading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />

                    <div className="mt-6 h-9 w-64 animate-pulse rounded bg-zinc-800" />

                    <div className="mt-2 h-4 w-40 animate-pulse rounded bg-zinc-800" />

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-28 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50"
                                />
                            )
                        )}
                    </div>

                    <div className="mt-6 h-40 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50" />
                </div>
            </div>
        );
    }

    if (error || !vessel) {
        return (
            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/dashboard/vessels"
                        className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                    >
                        ← Back to Vessels
                    </Link>

                    <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                        <p className="text-sm text-red-400">
                            {error ?? "Vessel not found."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/dashboard/vessels"
                    className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                >
                    ← Back to Vessels
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