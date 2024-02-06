const GameModel = require('../models/GameModel')

class GameService {
    async GetGameByTitle(title) {
        const game = await GameModel.findOne({title: title})
        return game
    }
    async GetGames() {
        const games = await GameModel.find()
        return games
    }
}
module.exports = new GameService()