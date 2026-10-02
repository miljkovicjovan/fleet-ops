const features = [
    {
        number: "01",
        title: "Real-Time Tracking",
        description:
            "Monitor vessel location, speed, and status as your fleet moves.",
    },
    {
        number: "02",
        title: "Fleet Intelligence",
        description:
            "Search and filter your fleet to quickly find the vessels and information you need.",
    },
    {
        number: "03",
        title: "Historical Routes",
        description:
            "Inspect individual vessels and explore their previous movements over time.",
    },
    {
        number: "04",
        title: "Smart Alerts",
        description:
            "Create alerts for events such as entering an area or exceeding a speed threshold.",
    },
];

export function Features() {
    return (
        <section className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-24">
                {/* Section heading */}
                <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                        Fleet visibility
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Everything you need to monitor your fleet.
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-white/50">
                        From live vessel positions to historical movement and automated
                        alerts, FleetOps brings the information you need into one place.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
                    {features.map((feature) => (
                        <article
                            key={feature.number}
                            className="bg-[#0a0a0a] p-8 transition-colors hover:bg-white/3 sm:p-10"
                        >
                            <span className="text-sm font-medium text-white/30">
                                {feature.number}
                            </span>

                            <h3 className="mt-8 text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-4 max-w-md leading-7 text-white/50">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}