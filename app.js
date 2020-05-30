const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const helmet = require('helmet')
const session = require('cookie-session')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const goalRoutes = require('./routes/goal')
const {
  mainErrorHandler,
  nothingHereErrorHandler,
} = require('./controllers/errorControllers')
const HttpError = require('./models/http-error')
const { MONGO_CLUSTER_KEY } = require('./secrets/secrets')
const { SESSION_OPTIONS } = require('./constants/constants')

const app = express()

// SERVER FLOW --------------------------------------------

app.set('trust proxy', 1)
app.use(helmet())
app.use(bodyParser.json())
app.use(session(SESSION_OPTIONS))
app.use(
  '/uploads/images',
  express.static(path.join(__dirname, 'uploads', 'images'))
)
app.use('/api/auth/', authRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/goals/', goalRoutes)
app.use(nothingHereErrorHandler)
app.use(mainErrorHandler)

// MONGOOSE CONNECTION -------------------------------------

const server = http.createServer(app)
mongoose
  .connect(MONGO_CLUSTER_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(5000)
    console.log('server started')
  })
  .catch((error) => console.log(error))

//
// GRACEFULL SHUTDOWN --------------------------------------
//

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

let connections = []

server.on('connection', (connection) => {
  connections.push(connection)
  connection.on(
    'close',
    () => (connections = connections.filter((curr) => curr !== connection))
  )
})

function shutDown() {
  console.log('Received kill signal, shutting down gracefully')
  server.close(() => {
    console.log('Closed out remaining connections')
    process.exit(0)
  })

  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    )
    process.exit(1)
  }, 10000)

  connections.forEach((curr) => curr.end())
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000)
}
