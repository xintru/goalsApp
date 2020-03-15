const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()
const userControllers = require('../controllers/userControllers')

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .normalizeEmail(),
    check('name')
      .not()
      .isEmpty(),
    check('password').isLength({ min: 6 }),
    check('confirmPassword').isLength({ min: 6 }),
  ],
  userControllers.signUp
)

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .normalizeEmail(),
    check('password').isLength({ min: 6 }),
  ],
  userControllers.login
)

module.exports = router
