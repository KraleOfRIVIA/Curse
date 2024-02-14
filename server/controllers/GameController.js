
const GameService = require('../service/GameService');

class GameController {
    async GetGameByTitle(req, res, next) {
        try {
            const title = req.params.title;
            const game = await GameService.GetGameByTitle(title);
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }
            res.json(game);
        } catch (e) {
            next(e);
        }
    };
    async GetGames(req, res, next) {
        try {
            const games = await GameService.GetGames();
            res.json(games);
        } catch (e) {
            next(e);
        }
    }
    async CreateGame(req, res, next) {
        try {
            const {title, image, description, genre, year} = req.body
            const game = await GameService.CreateGame(title, image, description, genre, year);
            res.json(game);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = new GameController();