const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = function (req, res, next) {
  try {
    //if (req.originalUrl.includes('/api/auth')) return next()

    const encodedToken = req.header('AUTHORIZATION').split(' ')[1]
    const { _id } = jwt.verify(encodedToken, process.env.JWT_SECRET)

    User.findById(_id).then((user) => {
      if (user) res.user = user
      else return res.status(401)
    })

    next()
  } catch (e) {
    res.status(200).json({ error: e.message })
  }
}
