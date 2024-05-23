const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const db = require('./index');
const { accounts } = require('./schema');

const createAdmin = async () => {
    const connection = db.getConnection();

    const password = 'admin123';
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUND));

    const data = {
        first_name: 'admin first name',
        last_name: 'admin last name',
        email: 'admina@gmail.com',
        phone: '032123476256',
        password: hash,
        birthday: dayjs().format('YYYY-MM-DD'),
        user_type: 'admin',
    };

    const admin = await connection.insert(accounts).values(data);
    return admin;
};

createAdmin()
    .then((data) => console.log('admin created. ' + data))
    .catch((error) => console.log(error))
    .finally(() => process.exit());
