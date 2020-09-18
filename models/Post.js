const { Schema, model } = require('mongoose')

const post = new Schema({
  date: {
    type: String,
    default: 'No date',
  },
  img: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  author: {
    type: {
      username: String,
      _id: String,
      img: String,
    },
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
})

module.exports = model('Post', post)
