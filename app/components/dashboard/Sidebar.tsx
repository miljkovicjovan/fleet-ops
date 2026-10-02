"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type SidebarProps = {
    user: {
        email: string;
    };
};

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Vessels",
        href: "/dashboard/vessels",
    },
    {
        name: "Alerts",
        href: "/dashboard/alerts",
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
    },
];

export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
            <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 ring-1 ring-cyan-400/20">
                        <span className="text-sm font-bold text-cyan-400">
                            F
                        </span>
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-wide text-zinc-100">
                            FleetOps
                        </p>

                        <p className="text-[11px] text-zinc-500">
                            Fleet Intelligence
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-3 py-6">
                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                    Navigation
                </p>

                <div className="space-y-1">
                    {navigation.map((item) => {
                        const isActive =
                            item.href === "/dashboard"
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-cyan-400/10 text-cyan-400"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="border-t border-zinc-800 p-3">
                <div className="mb-2 rounded-lg px-3 py-3">
                    <p className="text-xs text-zinc-500">Signed in as</p>

                    <p className="mt-1 truncate text-sm text-zinc-200">
                        {user.email}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
}