const { signupUsers } = require('./repo');

exports.signupUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const inserted = await signupUsers(req.body);
        console.log(inserted);
        return ApiResponse(201, [], 'signup successfully.');
    } catch (error) {
        return next(error);
    }
};

exports.userLogin = async (req, res, next) => {
    try {
    } catch (error) {
        return next(error);
    }
};
