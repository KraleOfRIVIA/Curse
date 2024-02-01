const Router = require('express').Router
const userController = require('../controllers/UserController')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users',authMiddleware ,userController.GetUsers);

module.exports = router