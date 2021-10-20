const rootRouter      = require('express').Router()
const authController  = require('../controllers/authController')
const userController  = require('../controllers/userController')
const isAuth          = require('../middlewares/isAuth')
const isNotAuth       = require('../middlewares/isNotAuth')
const validate        = require('../middlewares/validate')

rootRouter.post('/register', [
    isNotAuth, authController.registerRules, 
    validate, authController.register
])
rootRouter.post('/login', [
    isNotAuth, authController.login
])
rootRouter.get('/profile', [
    isAuth, userController.show
])
rootRouter.put('/profile', [
    isAuth, userController.updateRules, 
    validate, userController.update
])
module.exports = rootRouter