const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const session = require('cookie-session')
const moment = require('moment')

const HttpError = require('../models/http-error')
const User = require('../models/User')
const { JWT_PRIVATE_KEY, JWT_REFRESH_KEY } = require('../secrets/secrets')

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    )
  }

  const { email, name, password, confirmPassword } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }

  if (existingUser) {
    return next(new HttpError('User already exists', 422))
  }

  if (password !== confirmPassword) {
    return next(new HttpError("Passwords don't match"), 422)
  }

  let hashedPassword

  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (error) {
    return next(new HttpError('Could not create user, please try again.', 500))
  }

  let refreshToken
  try {
    refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_KEY)
  } catch (error) {
    return next(new HttpError('Creating Token failed', 500))
  }

  const newUser = new User({
    email,
    name,
    password: hashedPassword,
    goals: [],
    avatar: '/uploads/images/default_avatar.png',
    refresh: refreshToken,
  })

  try {
    await newUser.save()
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }

  let token
  try {
    token = await jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_PRIVATE_KEY,
      { expiresIn: '20m' }
    )
  } catch (error) {
    return next(new HttpError('Signing up failed', 500))
  }

  req.session.crumbs = refreshToken

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
    token,
    expDate: moment().add(20, 'm').format(),
  })
}

exports.login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid email or password.', 403))
  }

  const { email, password } = req.body
  let user
  try {
    user = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }

  if (!user) {
    return next(new HttpError('Invalid email or password', 403))
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, user.password)
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid email or password', 403))
  }

  let refreshToken
  try {
    refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_KEY)
  } catch (error) {
    return next(new HttpError('Creating Token failed', 500))
  }

  user.refresh = refreshToken

  try {
    await user.save()
  } catch (error) {
    return next(new HttpError('Something went wrong', 500))
  }

  let token
  try {
    token = await jwt.sign(
      { userId: user.id, email: user.email },
      JWT_PRIVATE_KEY,
      { expiresIn: '20m' }
    )
  } catch (error) {
    return next(new HttpError('Logging in failed', 500))
  }

  req.session.crumbs = refreshToken

  res.json({
    userId: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token,
    expDate: moment().add(20, 'm').format(),
  })
}

exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.session.crumbs
  const { userId } = jwt.verify(refreshToken, JWT_REFRESH_KEY)
  let user
  try {
    user = await User.findById(userId)
  } catch (error) {
    return next(new HttpError('Could not find such user', 404))
  }

  if (refreshToken !== user.refresh) {
    return next(new HttpError('Tokens not match', 403))
  }

  try {
    token = await jwt.sign(
      { userId: user.id, email: user.email },
      JWT_PRIVATE_KEY,
      { expiresIn: '20m' }
    )
  } catch (error) {
    return next(new HttpError('Refreshing Token failed', 500))
  }

  res.status(201).json({
    token,
    expDate: moment().add(20, 'm').format(),
  })
}
