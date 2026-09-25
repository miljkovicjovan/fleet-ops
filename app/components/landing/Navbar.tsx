import Link from "next/link";

export function Navbar() {
    return (
        <header className="border-b border-white/10">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="text-xl font-semibold tracking-tight text-white"
                >
                    FleetOps
                </Link>

                <Link
                    href="/login"
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
                >
                    Login
                </Link>
            </nav>
        </header>
    );
}