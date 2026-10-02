import { requireAuth } from "@/app/lib/api-auth";
import { db } from "@/prisma/db";

export async function GET() {
    const session = await requireAuth();

    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const vessels = await db.orm.public.Vessel.all();

    return Response.json(vessels);
}