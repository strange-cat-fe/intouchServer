const authRoutes = require('./auth.routes')
const postsRoutes = require('./post.routes')

module.exports = [
  { prefix: '/api/auth', route: authRoutes },
  { prefix: '/api/posts', route: postsRoutes },
]
