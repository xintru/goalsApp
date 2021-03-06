const fs = require('fs')
const path = require('path')
const HttpError = require('../models/http-error')
const User = require('../models/User')

exports.getUser = async (req, res, next) => {
  const userId = req.userData.userId

  let user
  try {
    user = await User.findById(userId, '-password').populate({
      path: 'goals',
      select: ['title', 'description', 'date', 'subgoals', 'completed'],
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
      goals: user.goals.map((goal) => goal.toObject({ getters: true })),
      avatar: user.avatar,
    },
  })
}

exports.patchUserAvatar = async (req, res, next) => {
  const userId = req.userData.userId
  let user
  try {
    user = await User.findById(userId)
  } catch (error) {
    return next(new HttpError('Something went wrong finding the user', 500))
  }

  if (!user) {
    return next(new HttpError('There is no such user with this id', 404))
  }

  if (user.avatar !== '/uploads/images/default_avatar.png') {
    fs.unlink(path.join(__dirname, '..', user.avatar), (err) => {
      console.log('Could not remove old user avatar.')
    })
  }
  try {
    user.avatar = `/${req.file.path.replace(/\\/g, '/')}`
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
