"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
        >
            Sign out
        </button>
    );
}