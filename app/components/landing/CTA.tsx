import Link from "next/link";

export function CTA() {
    return (
        <section className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-24">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-6 py-16 text-center sm:px-12">
                    {/* Background glow */}
                    <div
                        className="pointer-events-none absolute left-1/2 top-0 z-0 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                            FleetOps
                        </p>

                        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                            Ready to explore your fleet?
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/50">
                            Log in to access the FleetOps monitoring dashboard and start
                            exploring vessel data.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/login"
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
                            >
                                Login to FleetOps
                                <span className="ml-2">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}