const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const HttpError = require('../models/http-error')
const User = require('../models/User')

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

  res
    .status(201)
    .json({ id: newUser.id, email: newUser.email, token: 'Dummy token' })
}
