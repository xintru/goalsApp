const mongoose = require('mongoose')

const { Schema } = mongoose

mongoose.set('useCreateIndex', true)

const goalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  subgoals: [
    {
      title: String,
      completed: Boolean,
    },
  ],
  completed: {
    type: Boolean,
    required: true,
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

module.exports = mongoose.model('Goal', goalSchema)
