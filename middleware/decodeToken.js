const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  try {
    if (req.originalUrl.includes('/api/auth')) return next()

    const encodedToken = req.header('AUTHORIZATION').split(' ')[1]
    const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET)
    res.user = decodedToken

    next()
  } catch (e) {}
}
