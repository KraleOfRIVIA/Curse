const Router = require('express').Router
const userController = require('../controllers/UserController')
const GameController = require('../controllers/GameController')
const ReviewController = require('../controllers/ReviewController')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/AuthMiddleware')

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users',authMiddleware ,userController.GetUsers);
router.get('/games/:title', authMiddleware, GameController.GetGameByTitle);
router.get('/games', GameController.GetGames);
router.post('/createGame', authMiddleware, GameController.CreateGame);
router.post('/addGameToUser', authMiddleware, userController.AddGameToUser);
router.post('/removeGameFromUser', authMiddleware, userController.RemoveGameFromUser);
router.post('/getUserGames', userController.GetGamesFromUser);
router.post('/createReview', ReviewController.CreateReview);
router.get('/getReviews/:title_game', ReviewController.GetReviewsForGame);
router.post('/deleteReview',authMiddleware, ReviewController.RemoveReview);
module.exports = router
