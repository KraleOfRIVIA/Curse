const {BadRequest} = require("../exception/ApiError");
const ReviewModel = require("../models/ReviewModel");
const GameService = require("../service/GameService");

class ReviewService {

    async CreateReview(title_game, text_review, author, grade) {
        const candidate = await ReviewModel.findOne({author: author, title_game: title_game});
        const game = await GameService.GetGameByTitle(title_game);

        if (candidate) {
            throw BadRequest(`Review already exists for ${title_game} by ${author}`);
        }

        if (!game) {
            throw BadRequest(`Game not found with title ${title_game}`);
        }

        return await ReviewModel.create({title_game, text_review, author, grade});
    }
    async GetReviewsForGame(title_game) {
        const reviews = await ReviewModel.find({title_game: title_game});
        return reviews
    }
    async RemoveReview(author) {
        const review = await ReviewModel.findOneAndDelete({author: author});
        return review
    }
}
module.exports = new ReviewService()