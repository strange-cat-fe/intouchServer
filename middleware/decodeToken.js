const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../lib/config')

module.exports = async function (req, res, next) {
  try {
    if (req.originalUrl.includes('/api/auth')) return next()

    const encodedToken = req.header('AUTHORIZATION').split(' ')[1]
    const { _id } = jwt.verify(encodedToken, config.jwtSecret)

    const user = await User.findById(_id)

    if (user) {
      res.user = user
      return next()
    }

    res.status(401).json()
  } catch (e) {
    res.status(200).json({ error: e })
  }
}
