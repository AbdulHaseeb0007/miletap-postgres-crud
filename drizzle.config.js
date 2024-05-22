const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  schema: "./src/db/schema.js",
  dialect: "postgresql",
  // driver: "pg",
  // out: "./drizzle",
  dbCredentials: {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.DB_PASSWORD,
    database: process.env.PGDATABASE,
  },
  migration: {
    table: "migrations",
    schema: "public",
  },
});
