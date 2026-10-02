import Link from "next/link";
import { mockVessels } from "../../data/mock-vessels";

const columns = ["Vessel", "Status", "Speed", "Heading", "Last Update"];

function StatusIndicator({
    status,
}: {
    status: "active" | "offline" | "inactive";
}) {
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
    return (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
                <h2 className="text-sm font-semibold text-zinc-100">
                    Fleet Vessels
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                    Current status and telemetry for your vessels.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-zinc-800 bg-zinc-950/40">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-800">
                        {mockVessels.map((vessel) => (
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
                                    <StatusIndicator status={vessel.status} />
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
        </div>
    );
}