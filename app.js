const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use('/api/auth/', authRoutes)

app.use((req, res, next) => {
  throw new HttpError('Could not find this route', 404)
})

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Something went wrong.' })
})

mongoose
  .connect(
    'mongodb+srv://admin:test123@diplomacluster-khs7e.mongodb.net/landmarks?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000)
    console.log('server started')
  })
  .catch(error => console.log(error))
