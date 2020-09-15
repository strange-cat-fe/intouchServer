const { Router } = require('express')
const router = Router()

const Post = require('../models/Post')

router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    const isLiked = post.likes.some((like) => like._id.equals(res.user._id))
    if (isLiked) {
      post.likes.pull(res.user._id)
      res.status(200).json({ payload: post })
    } else {
      post.likes.push(res.user)
      res.status(200).json({ payload: post })
    }
    await post.save()
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

module.exports = router
