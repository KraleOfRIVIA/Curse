const ReviewService = require('../service/ReviewService');

class ReviewController {

    async CreateReview(req, res, next) {
        try {
            const {title_game, text_review, autor, grade} = req.body
            const review = await ReviewService.CreateReview(title_game, text_review, autor, grade)
            res.json(review)
        } catch (e) {
            next(e)
        }
    }
    async GetReviewsForGame(req, res, next) {
        try {
            const {title_game} = req.params.title_game
            const reviews = await ReviewService.GetReviewsForGame(title_game)
            res.json(reviews)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ReviewController()