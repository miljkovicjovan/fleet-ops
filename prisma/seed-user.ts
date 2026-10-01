// script used to seed a demo user into the database
// (does not run automatically, must be run manually with `pnpm exec tsx prisma/seed-user.ts`)

import "dotenv/config";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { db } from "./db";

async function main() {
    await db.connect();

    // we get the credentials from the environment variables
    const email = process.env.DEMO_EMAIL!;
    const password = process.env.DEMO_PASSWORD!;

    const existingUser = await db.orm.public.User
        .where({ email })
        .first();

    // only create the demo user if it doesn't already exist
    if (existingUser) {
        console.log(`User already exists: ${email}`);
        await db.close();
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await db.orm.public.User.create({
        id: randomUUID(),
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    console.log("Demo user created!");
    console.log("Email:", user.email);

    await db.close();
}

main().catch(console.error);