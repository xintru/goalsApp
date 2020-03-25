const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error')
const User = require('../models/User')
const { JWT_PRIVATE_KEY } = require('../secrets/secrets')

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

  const newUser = new User({
    email,
    name,
    password: hashedPassword,
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
      { expiresIn: '1h' }
    )
  } catch (error) {
    return next(new HttpError('Signing up failed', 500))
  }

  res
    .status(201)
    .json({ id: newUser.id, name: newUser.name, email: newUser.email, token })
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
    return next('Invalid email or password', 403)
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

  let token
  try {
    token = await jwt.sign(
      { userId: user.id, email: user.email },
      JWT_PRIVATE_KEY,
      { expiresIn: '1h' }
    )
  } catch (error) {
    return next(new HttpError('Logging in failed', 500))
  }

  res.json({ userId: user.id, name: user.name, email: user.email, token })
}
