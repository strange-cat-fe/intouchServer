const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const Post = require('../models/Post')

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(200).json({ error: 'User is not found' })

    const { _id, username, email, img, followers = [], following = [] } = user

    const posts = await Post.find({ 'author._id': _id })
    res.status(200).json({
      payload: {
        _id,
        username,
        email,
        img,
        following,
        followers,
        posts,
      },
    })
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

module.exports = router
