const {
  pgTable,
  bigserial,
  varchar,
  date,
  timestamp,
} = require("drizzle-orm/pg-core");

const accounts = pgTable("accounts", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  first_name: varchar("first_name", { length: 30 }).notNull(),
  last_name: varchar("last_name", { length: 30 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  phone: varchar("phone", { length: 11 }).notNull(),
  password: varchar("password", { length: 200 }).notNull(),
  birthday: date("birthday").notNull(),
  create_at: timestamp("create_at").notNull().defaultNow(),
  last_modified: timestamp("lst_modified").notNull().defaultNow(),
});

exports.accounts = accounts;
