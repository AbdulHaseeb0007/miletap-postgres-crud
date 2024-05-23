const { pgTable, bigserial, varchar, text, date, timestamp, pgEnum } = require('drizzle-orm/pg-core');

const userType = pgEnum('user_type', ['user', 'admin']);
exports.userType = userType;

const accounts = pgTable('accounts', {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    first_name: varchar('first_name', { length: 30 }).notNull(),
    last_name: varchar('last_name', { length: 30 }).notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    phone: varchar('phone', { length: 15 }).notNull(),
    password: text('password').notNull(),
    birthday: date('birthday').notNull(),
    user_type: userType('user_type').default('user'),
    create_at: timestamp('create_at').defaultNow(),
    last_modified: timestamp('last_modified').defaultNow(),
});

exports.accounts = accounts;
