const authRoutes = require('./auth.routes')
const postsRoutes = require('./post.routes')
const likeRoutes = require('./post.likes.routes')
const profileRoutes = require('./profile.routes')
const subsRoutes = require('./subs.routes')

module.exports = [
  { prefix: '/api/auth', route: authRoutes },
  { prefix: '/api/posts', route: postsRoutes },
  { prefix: '/api/posts', route: likeRoutes },
  { prefix: '/api/profile', route: profileRoutes },
  { prefix: '/api/profile', route: subsRoutes },
]
