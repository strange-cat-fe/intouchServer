const authRoutes = require('./auth.routes')
const postsRoutes = require('./post.routes')
const likeRoutes = require('./post.likes.routes')

module.exports = [
  { prefix: '/api/auth', route: authRoutes },
  { prefix: '/api/posts', route: postsRoutes },
  { prefix: '/api/posts', route: likeRoutes },
]
