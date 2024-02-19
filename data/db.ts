import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

if (!process.env.DB_URL) {
  throw new Error("DB_URL not set");
}

const queryClient = postgres(process.env.DB_URL, {
  ssl: process.env.NODE_ENV === "production",
});

export const db = drizzle(queryClient, { schema });
