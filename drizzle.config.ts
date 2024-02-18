import type { Config } from "drizzle-kit";

if (!process.env.DB_URL) {
  throw new Error("DB_URL ENVIRONMENT NOT SET");
}

export default {
  schema: "./data/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
} satisfies Config;
