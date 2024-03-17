const ReviewService = require('../service/ReviewService');

class ReviewController {

    async CreateReview(req, res, next) {
        try {
            const {title_game, text_review, author, grade} = req.body
            if (grade > 5) {
                throw new Error('Grade must be between 0 and 5')
            }
            const review = await ReviewService.CreateReview(title_game, text_review, author, grade)
            res.json(review)
        } catch (e) {
            next(e)
        }
    }
    async GetReviewsForGame(req, res, next) {
        try {
            const title_game = req.params.title_game
            const reviews = await ReviewService.GetReviewsForGame(title_game)
            res.json(reviews)
        } catch (e) {
            next(e)
        }
    }
    async RemoveReview(req, res, next) {
        try {
            const author = req.body.author
            const review = await ReviewService.RemoveReview(author)
            res.json(review)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ReviewController()