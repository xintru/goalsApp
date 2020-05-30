const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const helmet = require('helmet')
const session = require('cookie-session')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const goalRoutes = require('./routes/goal')
const HttpError = require('./models/http-error')

const app = express()

//TODO закодировать в рефреш токен юзерайди

app.set('trust proxy', 1)
app.use(helmet())
app.use(bodyParser.json())
app.use(
  session({
    secret: 'hansel_gretel',
    name: 'crumbs',
    httpOnly: true,
    maxAge: 7200000,
  })
)
app.use(
  '/uploads/images',
  express.static(path.join(__dirname, 'uploads', 'images'))
)

app.use('/api/auth/', authRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/goals/', goalRoutes)

app.use((req, res, next) => {
  throw new HttpError('Could not find this route', 404)
})

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path)
  }
  if (res.headerSent) {
    return next(error)
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Something went wrong.' })
})

mongoose
  .connect(
    'mongodb+srv://admin:test123@diplomacluster-khs7e.mongodb.net/goals?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000)
    console.log('server started')
  })
  .catch((error) => console.log(error))
