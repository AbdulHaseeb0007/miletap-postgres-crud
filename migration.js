const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

(async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  await sql.end();
})();
