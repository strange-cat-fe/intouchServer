const { Router } = require('express')
const router = Router()

const Post = require('../models/Post')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate().exec()
    res.status(200).json({ payload: posts })
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

router.post('/new', async (req, res) => {
  try {
    const { text, date, img } = req.body

    const newPost = new Post({
      date,
      img,
      text,
      author: {
        username: res.user.username,
        img: res.user.img,
        _id: res.user._id,
      },
    })
    await newPost.save()

    res.status(200).json({ payload: newPost })
  } catch (e) {
    res.status(200).json({ error: e })
  }
})

module.exports = router
