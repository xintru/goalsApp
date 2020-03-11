const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')

const app = express()

app.use(bodyParser.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use('/api/auth/', authRoutes)

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Something went wrong.' })
})

app.listen(5000, () => {
  console.log('server started')
})
