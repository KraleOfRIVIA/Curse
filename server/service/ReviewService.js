const {BadRequest} = require("../exception/ApiError");
const ReviewModel = require("../models/ReviewModel");

class ReviewService {

    async CreateReview(title_game, text_review, author, grade) {
        const candidate = await ReviewModel.findOne({author: author});
        if (candidate) {
            throw BadRequest(`Review already exists with this ${author}`);
        }
        return await ReviewModel.create({title_game, text_review, author, grade});
    }
    async GetReviewsForGame(title_game) {
        const reviews = await ReviewModel.find({title_game: title_game});
        return reviews
    }
}
module.exports = new ReviewService()