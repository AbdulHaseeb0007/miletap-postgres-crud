const db = require('./db');
const { accounts } = require('./db/schema');

const connection = db.getConnection();

exports.signupUsers = (data) => {
    console.log(data);
    return connection.insert(accounts).values(data);
    // return
};
exports.getUsers = async () => {};
exports.createUser = async () => {};
exports.updateUser = async () => {};
exports.deleteUser = async () => {};
