
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
}
module.exports = new GameController();