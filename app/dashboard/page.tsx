import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LogoutButton from "../components/LogOutButton";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
                <section className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl">
                    <div className="mb-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/20">
                                <span className="text-lg font-bold text-cyan-400">
                                    F
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-wide text-zinc-100">
                                    FleetOps
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Fleet Intelligence Platform
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-cyan-400">
                                Dashboard
                            </p>

                            <h1 className="text-3xl font-semibold tracking-tight">
                                Welcome back
                            </h1>

                            <p className="text-zinc-400">
                                Monitor your fleet, track vessels, and stay on
                                top of important alerts.
                            </p>
                        </div>
                    </div>

                    <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Signed in as
                        </p>

                        <p className="text-sm text-zinc-200">
                            {session.user.email}
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                        <p className="text-sm text-zinc-500">
                            FleetOps dashboard
                        </p>

                        <LogoutButton />
                    </div>
                </section>
            </div>
        </main>
    );
}