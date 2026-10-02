"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mockVessels } from "../../data/mock-vessels";
import type { VesselStatus } from "../../types/vessel";

const columns = ["Vessel", "Status", "Speed", "Heading", "Last Update"];

const statusOptions: Array<"all" | VesselStatus> = [
    "all",
    "active",
    "offline",
    "inactive",
];

type SortKey = "name" | "status" | "speed" | "heading" | "lastUpdated";
type SortDirection = "asc" | "desc";

function StatusIndicator({ status }: { status: VesselStatus }) {
    const color = {
        active: "bg-cyan-400",
        offline: "bg-red-400",
        inactive: "bg-zinc-500",
    }[status];

    return (
        <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${color}`} />

            <span className="text-sm capitalize text-zinc-300">
                {status}
            </span>
        </div>
    );
}

export default function VesselList() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"all" | VesselStatus>("all");
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortDirection, setSortDirection] =
        useState<SortDirection>("asc");

    const filteredVessels = useMemo(() => {
        const vessels = mockVessels.filter((vessel) => {
            const matchesSearch =
                vessel.name.toLowerCase().includes(search.toLowerCase()) ||
                vessel.imo.includes(search);

            const matchesStatus =
                status === "all" || vessel.status === status;

            return matchesSearch && matchesStatus;
        });

        return vessels.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (aValue < bValue) {
                return sortDirection === "asc" ? -1 : 1;
            }

            if (aValue > bValue) {
                return sortDirection === "asc" ? 1 : -1;
            }

            return 0;
        });
    }, [search, status, sortKey, sortDirection]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection((current) =>
                current === "asc" ? "desc" : "asc"
            );

            return;
        }

        setSortKey(key);
        setSortDirection("asc");
    };

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-100">
                            Fleet Vessels
                        </h2>

                        <p className="mt-1 text-xs text-zinc-500">
                            {filteredVessels.length} of {mockVessels.length}{" "}
                            vessels
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search vessel or IMO..."
                            className="h-9 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-400/50"
                        />

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(
                                    event.target.value as
                                    | "all"
                                    | VesselStatus
                                )
                            }
                            className="h-9 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm capitalize text-zinc-300 outline-none focus:border-cyan-400/50"
                        >
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option === "all"
                                        ? "All Statuses"
                                        : option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-zinc-800 bg-zinc-950/40">
                        <tr>
                            {columns.map((column) => {
                                const sortKeyMap: Record<string, SortKey> = {
                                    Vessel: "name",
                                    Status: "status",
                                    Speed: "speed",
                                    Heading: "heading",
                                    "Last Update": "lastUpdated",
                                };

                                const key = sortKeyMap[column];
                                const isSorted = sortKey === key;

                                return (
                                    <th
                                        key={column}
                                        className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSort(key)}
                                            className="flex items-center gap-2 transition-colors hover:text-zinc-200"
                                        >
                                            {column}

                                            {isSorted && (
                                                <span className="text-cyan-400">
                                                    {sortDirection === "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </button>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-800">
                        {filteredVessels.map((vessel) => (
                            <tr
                                key={vessel.id}
                                className="transition-colors hover:bg-zinc-800/30"
                            >
                                <td className="px-5 py-4">
                                    <Link
                                        href={`/dashboard/vessels/${vessel.id}`}
                                        className="group"
                                    >
                                        <p className="text-sm font-medium text-zinc-100 transition-colors group-hover:text-cyan-400">
                                            {vessel.name}
                                        </p>

                                        <p className="mt-1 text-xs text-zinc-500">
                                            IMO {vessel.imo}
                                        </p>
                                    </Link>
                                </td>

                                <td className="px-5 py-4">
                                    <StatusIndicator
                                        status={vessel.status}
                                    />
                                </td>

                                <td className="px-5 py-4 text-sm text-zinc-300">
                                    {vessel.speed.toFixed(1)} kn
                                </td>

                                <td className="px-5 py-4 text-sm text-zinc-300">
                                    {vessel.heading}°
                                </td>

                                <td className="px-5 py-4 text-sm text-zinc-400">
                                    {new Date(
                                        vessel.lastUpdated
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredVessels.length === 0 && (
                <div className="px-5 py-12 text-center">
                    <p className="text-sm text-zinc-400">
                        No vessels found.
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                        Try changing your search or status filter.
                    </p>
                </div>
            )}
        </div>
    );
}