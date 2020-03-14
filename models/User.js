const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

mongoose.set('useCreateIndex', true)

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  image: {
    type: String,
  },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
