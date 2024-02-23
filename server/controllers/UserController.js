const UserService = require('../service/UserService');
const {validationResult} = require('express-validator');
const ApiError = require('../exception/ApiError');
class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body
            const userData = await UserService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)

        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
    async GetUsers(req, res, next) {
        try {
            const users = await UserService.GetUsers();
            return res.json(users);
        } catch (e) {
            next(e)
        }
    }
    async AddGameToUser(req, res, next) {
        try {
            const {email, game} = req.body
            const user = await UserService.AddGameToUser(email, game);
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }
    async GetGamesFromUser(req, res, next) {
        try {
            const {email} = req.body
            const games = await UserService.GetGamesFromUser(email);
            return res.json(games);
        }
        catch (e) {
            next(e)
        }
    }
    async RemoveGameFromUser(req, res, next) {
        try {
            const {email, game} = req.body
            const user = await UserService.RemoveGameFromUser(email, game);
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new UserController()