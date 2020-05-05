const { Router } = require('express')
const checkAuth = require('../middleware/check-auth')

const router = Router()
const userControllers = require('../controllers/user')

router.get('/', checkAuth, userControllers.getUser)

module.exports = router
