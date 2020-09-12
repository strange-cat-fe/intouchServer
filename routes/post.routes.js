const { Router } = require('express')
const router = Router()

const Post = require('../models/Post')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author').exec()
    res.status(200).json({ payload: posts })
  } catch (e) {
    res.status(200).json({ error: '' })
  }
})
