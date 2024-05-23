const ApiResponse = (res, statusCode = 200, payload = [], message) => {
    const response = {
        success: true,
        statusCode,
        message,
        payload,
    };

    return res.status(statusCode).json(response);
};

module.exports = ApiResponse;
