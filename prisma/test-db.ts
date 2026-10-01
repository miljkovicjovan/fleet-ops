// script used to test the database connection and query the users table
// (does not run automatically, must be run manually with `pnpm exec tsx prisma/test-db.ts`)

import "dotenv/config";
import { db } from "./db";

async function main() {
    await db.connect();

    const users = await db.orm.public.User.all();

    console.log("Users:", users.map((user) => ({
        id: user.id,
        email: user.email,
        hasPasswordHash: Boolean(user.passwordHash),
    })));

    await db.close();
}

main().catch(console.error);