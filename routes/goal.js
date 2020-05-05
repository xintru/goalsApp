const { Router } = require('express')
const checkAuth = require('../middleware/check-auth')
const { check } = require('express-validator')

const router = Router()
const goalControllers = require('../controllers/goal')

router.post(
  '/',
  checkAuth,
  [
    check('title').not().isEmpty().isString(),
    check('description').not().isEmpty().isString(),
  ],
  goalControllers.postGoal
)

module.exports = router
