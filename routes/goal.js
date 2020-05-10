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

router.get('/:goalId', checkAuth, goalControllers.getGoal)

router.patch(
  '/:goalId',
  checkAuth,
  [
    check('title').not().isEmpty().isString(),
    check('description').not().isEmpty().isString(),
  ],
  goalControllers.patchGoal
)

router.delete('/:goalId', checkAuth, goalControllers.deleteGoal)

module.exports = router
