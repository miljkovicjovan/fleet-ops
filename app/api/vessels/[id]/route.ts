import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    { params }: RouteContext
) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    try {
        const vessel = await db.orm.public.Vessel.where({
            id,
        }).first();

        if (!vessel) {
            return NextResponse.json(
                { error: "Vessel not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(vessel);
    } catch (error) {
        console.error(
            "Failed to fetch vessel:",
            error
        );

        return NextResponse.json(
            { error: "Failed to fetch vessel" },
            { status: 500 }
        );
    }
}