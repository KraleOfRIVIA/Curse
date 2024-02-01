const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token');
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData)
        {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({user: userId, refreshToken})
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData;
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
}
module.exports = new TokenService()