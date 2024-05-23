const { eq } = require('drizzle-orm');
const db = require('./db');
const { accounts } = require('./db/schema');

const connection = db.getConnection();

exports.createUser = (data) => connection.insert(accounts).values(data);
exports.updateUser = (data, id) => connection.update(accounts).set(data).where(eq(accounts.id, id));
exports.loginUser = (email) => connection.select().from(accounts).where(eq(accounts.email, email));
exports.deleteUser = async (id) => connection.delete(accounts).where(eq(accounts.id, id));

exports.getUsers = () =>
    connection
        .select({
            id: accounts.id,
            first_name: accounts.first_name,
            last_name: accounts.last_name,
            email: accounts.email,
            phone: accounts.phone,
            birthday: accounts.birthday,
            user_type: accounts.user_type,
            create_at: accounts.create_at,
            last_modified: accounts.last_modified,
        })
        .from(accounts)
        .where(eq(accounts.user_type, 'user'));
