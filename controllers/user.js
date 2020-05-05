const HttpError = require('../models/http-error')
const User = require('../models/User')

exports.getUser = async (req, res, next) => {
  const userId = req.userData.userId

  let user
  try {
    user = await User.findById(userId, '-password').populate('goals')
  } catch (error) {
    return next(new HttpError('Something went wrong finding the user', 500))
  }

  if (!user) {
    return next(new HttpError('There is no such user with this id', 404))
  }

  return res.status(200).json({ user: user.toObject({ getters: true }) })
}
