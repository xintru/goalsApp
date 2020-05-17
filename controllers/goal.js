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
  const { title, description, date, subgoals } = req.body
  const userId = req.userData.userId

  const newGoal = new Goal({
    title,
    description,
    date,
    subgoals,
    creator: userId,
  })
  let user
  try {
    user = await User.findById(userId)
  } catch (error) {
    return next(new HttpError('Something went wrong', 500))
  }
  if (!user) {
    return next(new HttpError('Could not find the user with this id', 404))
  }
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    user.goals.push(newGoal)
    await user.save({ session })
    console.log('saved user')
    await newGoal.save({ session })
    await session.commitTransaction()
  } catch (error) {
    return next(new HttpError('Something went wrong', 500))
  }
  return res.status(201).json(newGoal.toObject({ getters: true }))
}

exports.getGoal = async (req, res, next) => {
  const { goalId } = req.params
  let goal
  try {
    goal = await Goal.findById(goalId)
  } catch (error) {
    return next(new HttpError('Something went wrong', 500))
  }

  if (!goal) {
    return next(new HttpError('There is no such goal', 404))
  }

  res.status(200).json({ goal: goal.toObject({ getters: true }) })
}

exports.patchGoal = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    )
  }
  const { title, description } = req.body
  const { goalId } = req.params
  const { userId } = req.userData

  let existingGoal
  try {
    existingGoal = await Goal.findById(goalId)
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500))
  }

  if (!existingGoal) {
    return next(new HttpError('Could not find a goal with this id', 404))
  }

  if (existingGoal.creator.toString() !== userId) {
    return next(new HttpError('You are not allowed to edit this goal.', 401))
  }

  existingGoal.title = title
  existingGoal.description = description
  try {
    existingGoal.save()
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500))
  }

  res.status(200).json(existingGoal.toObject({ getters: true }))
}

exports.deleteGoal = async (req, res, next) => {
  const { goalId } = req.params
  const { userId } = req.userData
  let goal
  try {
    goal = await Goal.findById(goalId).populate('creator')
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not delete goal.', 500)
    )
  }

  if (!goal) {
    return next(new HttpError('Could not find the goal for this id', 404))
  }

  if (goal.creator.id.toString() !== userId) {
    return next(new HttpError('You are not allowed to delete this goal.', 401))
  }

  try {
    const session = await mongoose.startSession()
    session.startTransaction({ session })
    await goal.remove({ session })
    goal.creator.goals.pull(goal)
    await goal.creator.save({ session })
    await session.commitTransaction()
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not delete goal.', 500)
    )
  }

  res.status(200).json(goal.toObject({ getters: true }))
}
