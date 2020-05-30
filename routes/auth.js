const { Router } = require('express')
const { check } = require('express-validator')
const checkAuth = require('../middleware/check-auth')

const router = Router()
const userControllers = require('../controllers/auth')

router.post(
  '/signup',
  [
    check('email').isEmail().normalizeEmail(),
    check('name').not().isEmpty(),
    check('password').isLength({ min: 6 }),
    check('confirmPassword').isLength({ min: 6 }),
  ],
  userControllers.signUp
)

router.post(
  '/login',
  [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }),
  ],
  userControllers.login
)

router.get('/refresh', userControllers.refreshToken)

module.exports = router
