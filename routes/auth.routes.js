const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const config = require('../lib/config')

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const isMatch = await bcrypt.compare(password, candidate.password)

      if (isMatch) {
        const token = jwt.sign(
          {
            username: candidate.username,
            _id: candidate._id,
          },
          config.jwtSecret,
          { expiresIn: '5d' }
        )

        return res.status(200).json({ payload: token })
      }
      return res.status(200).json({ error: 'Password is wrong. Try again' })
    }
    res.status(200).json({ error: "User with this email doesn't exist" })
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body
    const candidateByMail = await User.findOne({ email })
    const candidateByName = await User.findOne({ username })

    if (!candidateByMail && !candidateByName) {
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new User({ email, username, password: hashedPassword })
      const { _id } = await newUser.save()

      const token = jwt.sign({ username, _id }, config.jwtSecret, {
        expiresIn: '5d',
      })

      return res.status(200).json({ payload: token })
    }

    res
      .status(200)
      .json({ error: 'User with this email or username already exists' })
  } catch (e) {
    console.log(e)
    res.status(200).json({ error: e })
  }
})

module.exports = router
