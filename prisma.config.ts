import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // The main entry for your schema
  schema: "prisma/schema.prisma",

  // Where migrations should be generated and seed script configuration
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  // The database URL for Prisma CLI (migrations, db push, etc.)
  datasource: {
    url: process.env.DIRECT_URL || env("DATABASE_URL"),
  },
});
