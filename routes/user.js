const { Router } = require('express')
const checkAuth = require('../middleware/check-auth')
const fileUpload = require('../middleware/file-upload')

const router = Router()
const userControllers = require('../controllers/user')

router.get('/', checkAuth, userControllers.getUser)

router.patch(
  '/',
  checkAuth,
  fileUpload.single('image'),
  userControllers.patchUserAvatar
)

module.exports = router