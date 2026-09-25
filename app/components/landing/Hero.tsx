import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background glow */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-24">
                <div className="max-w-4xl">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-px w-8 bg-cyan-400" />

                        <span className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                            Fleet Intelligence Platform
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                        Monitor your fleet.
                        <br />
                        <span className="text-white/50">
                            Understand every movement.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
                        FleetOps gives you a single place to monitor vessels in real time,
                        explore historical routes, analyze fleet activity, and respond to
                        important events.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/login"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
                        >
                            Login to FleetOps
                            <span className="ml-2">→</span>
                        </Link>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/40">
                        <span>Real-time tracking</span>
                        <span>Historical routes</span>
                        <span>Smart alerts</span>
                    </div>
                </div>
            </div>
        </section>
    );
}