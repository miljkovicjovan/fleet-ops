type FleetStatCardProps = {
    label: string;
    value: number;
    description: string;
};

export default function FleetStatCard({
    label,
    value,
    description,
}: FleetStatCardProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div>
                <p className="text-sm font-medium text-zinc-400">
                    {label}
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
                    {value}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                    {description}
                </p>
            </div>
        </div>
    );
}