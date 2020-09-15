const { Router } = require('express')
const router = Router()

const Post = require('../models/Post')

const mapLikes = (post) => {
  const likes = post.likes.map((l) => ({ l: l._id }))
  post.likes = likes
  return post
}

router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = res.user

    const isLiked = post.likes.some((like) => like._id.equals(user._id))
    if (isLiked) {
      post.likes.pull(user._id)
    } else {
      post.likes.push(user)
    }
    await post.save()
    res.status(200).json({ payload: mapLikes(post) })
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

module.exports = router
