const jwt = require('jsonwebtoken');

exports.verifyToken = function (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (_error) {
        return 'token expired';
    }
};
