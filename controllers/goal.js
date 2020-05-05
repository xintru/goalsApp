const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Goal = require('../models/Goal')
const User = require('../models/User')

exports.postGoal = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    )
  }
  const { title, description } = req.body
  const userId = req.userData.userId
  const newGoal = new Goal({
    title,
    description,
    creator: userId,
  })
  let user
  try {
    user = await User.findById(userId)
  } catch (error) {
    return next(new HttpError('Could not find the user with this id', 404))
  }
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    user.goals.push(newGoal)
    await user.save({ session })
    await newGoal.save({ session })
    await session.commitTransaction()
  } catch (error) {
    return next(new HttpError('Something went wrong', 500))
  }
  return res.status(201).json(newGoal)
}
