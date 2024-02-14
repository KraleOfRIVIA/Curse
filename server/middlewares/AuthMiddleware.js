const tokenService = require('../service/TokenService')
const ApiError = require('../exception/ApiError')

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }

};
