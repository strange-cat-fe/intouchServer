require('dotenv').config()
const app = require('express')()
const cors = require('cors')

const middlewares = require('./middleware/index')
const routes = require('./routes/index')

process.env.NODE_ENV == 'test' && app.use(cors())

middlewares.forEach((m) => app.use(m))
routes.forEach((r) => app.use(r.prefix, r.route))

module.exports = app
