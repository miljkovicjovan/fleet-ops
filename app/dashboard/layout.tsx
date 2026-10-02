import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Sidebar from "../components/dashboard/Sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="flex min-h-screen">
                <Sidebar
                    user={{
                        email: session.user.email ?? "User",
                    }}
                />

                <main className="min-w-0 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}