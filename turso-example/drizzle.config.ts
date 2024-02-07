import { type Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:./local.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
