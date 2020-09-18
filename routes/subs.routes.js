const { Router } = require('express')
const jwt = require('jsonwebtoken')
const config = require('../lib/config')

const router = Router()

const User = require('../models/User')

const mapFollowing = (user) => {
  return user.following.map((f) => f._id)
}

router.post('/:id/follow', async (req, res) => {
  try {
    const user = res.user
    const following = await User.findById(req.params.id)

    const isFollower = user.following.some((f) => f._id.equals(following._id))

    if (isFollower) {
      user.following.pull(following._id)
      following.followers.pull(user._id)
    } else {
      user.following.push(following)
      following.followers.push(user)
    }

    console.log(456)
    await following.save()
    await user.save()

    const token = jwt.sign(
      { username: user.username, _id: user._id, following: mapFollowing(user) },
      config.jwtSecret,
      {
        expiresIn: '5d',
      }
    )

    console.log(mapFollowing(user))
    res.status(200).json({ payload: token })
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

module.exports = router
