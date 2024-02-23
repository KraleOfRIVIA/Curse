const uuid = require('uuid');
const UserModel = require('../models/UserModel');
const GameService = require('../service/GameService');
const bcrypt = require('bcrypt')
const tokenService = require('./TokenService');
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exception/ApiError');

// @ts-ignore
class UserService {

    async register(email, password) {
        const candidate = await UserModel.findOne({email});
        if(candidate)
        {
            throw ApiError.BadRequest(`User already exists with this ${email}`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        password = hashPassword;
        const user = await UserModel.create({email, password});

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async login(email, password) {
        const user = await UserModel.findOne({email});
        if(!user)
        {
            throw ApiError.BadRequest('User not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals)
        {
            throw ApiError.BadRequest('Wrong password')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if(!refreshToken)
        {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb)
        {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
    async GetUsers() {
        const users = await UserModel.find();
        return users
    }
    async AddGameToUser(email, title) {
        const user = await UserModel.findOne({email : email});
        if(!user)
        {
            throw ApiError.BadRequest('User not found')
        }
        const gameToAdd = await GameService.GetGameByTitle(title);
        if(!gameToAdd)
        {
            throw ApiError.BadRequest('Game not found')
        }
        if (user.games.includes(title)) {
            throw ApiError.BadRequest('Game already exists for the user');
        }
        user.games.push(title);
        await user.save();
        return user
    }
    async RemoveGameFromUser(email, title) {
        const user = await UserModel.findOne({email : email});
        if(!user)
        {
            throw ApiError.BadRequest('User not found')
        }
        const gameToRemove = await GameService.GetGameByTitle(title);
        if(!gameToRemove)
        {
            throw ApiError.BadRequest('Game not found')
        }
        user.games = user.games.filter(game => game !== title);
        await user.save();
        return user
    }
    async GetGamesFromUser(email) {
        const user = await UserModel.findOne({email : email});
        if(!user)
        {
            throw ApiError.BadRequest('User not found')
        }
        const games = await GameService.GetGamesByTitle(user.games);
        return games
    }
}
module.exports = new UserService()