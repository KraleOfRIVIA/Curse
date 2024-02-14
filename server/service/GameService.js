const GameModel = require('../models/GameModel')
const {BadRequest} = require("../exception/ApiError");

class GameService {
    async GetGameByTitle(title) {
        const game = await GameModel.findOne({title: title})
        return game
    }
    async GetGames() {
        const games = await GameModel.find()
        return games
    }
    async CreateGame(image,title,description,genre,year) {
        const candidate = await GameModel.findOne({title: title});
        if(candidate)
            {
                throw BadRequest(`Game already exists with this ${title}`)
            }
        const game = await GameModel.create({image,title,description,genre,year});
        return game
    }
    async GetGamesByTitle(titles) {
        const games = await GameModel.find({title: { $in: titles }})
        return games
    }
}
module.exports = new GameService()