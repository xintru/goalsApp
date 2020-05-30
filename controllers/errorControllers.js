const fs = require('fs')

exports.nothingHereErrorHandler = (req, res, next) => {
  throw new HttpError('Could not find this route', 404)
}

exports.mainErrorHandler = (error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path)
  }
  if (res.headerSent) {
    return next(error)
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'Something went wrong.' })
}
