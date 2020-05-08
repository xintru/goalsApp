const HttpError = require('../models/http-error')
const User = require('../models/User')

exports.getUser = async (req, res, next) => {
  const userId = req.userData.userId

  let user
  try {
    user = await User.findById(userId, '-password').populate({
      path: 'goals',
      select: ['title', 'description'],
    })
  } catch (error) {
    return next(new HttpError('Something went wrong finding the user', 500))
  }

  if (!user) {
    return next(new HttpError('There is no such user with this id', 404))
  }

  return res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      goals: user.goals,
      avatar: user.avatar,
    },
  })
}

exports.patchUserAvatar = async (req, res, next) => {
  const userId = req.userData.userId

  let user
  try {
    user = await User.findOne(userId)
  } catch (error) {
    return next(new HttpError('Something went wrong finding the user', 500))
  }

  if (!user) {
    return next(new HttpError('There is no such user with this id', 404))
  }

  try {
    user.avatar = req.file.path
    await user.save()
  } catch (error) {
    return next(
      new HttpError('Something went wrong saving the new avatar', 500)
    )
  }

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
      goals: user.goals,
      avatar: user.avatar,
    },
  })
}
