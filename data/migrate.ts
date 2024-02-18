import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as schema from "./schema.js";

export async function runMigrations() {
  if (!process.env.DB_URL) {
    throw new Error("DB URL not set");
  }

  const migrationClient = postgres(process.env.DB_URL, {
    max: 1,
    ssl: process.env.NODE_ENV === "production",
  });

  const db = drizzle(migrationClient, { schema });

  await migrate(db, { migrationsFolder: "migrations" });

  await migrationClient.end();
}
