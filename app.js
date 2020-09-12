require('dotenv').config()
const mongoose = require('mongoose')
const app = require('express')()

const jsonParser = require('body-parser').json()

let DB_URI = process.env.DB_URI
if (process.env.NODE_ENV === 'test') {
  app.use(require('cors')())
  DB_URI = 'mongodb://127.0.0.1:27017/intouchServer'
  console.log('__Test is running on local db__')
}

app.use(jsonParser)
app.use(require('./middleware/decodeToken.js'))

app.use('/api/auth', require('./routes/auth.routes'))
;(async function () {
  try {
    await mongoose.connect(DB_URI, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (e) {
    console.log(e)
  }
})()

module.exports = app.listen(5000, () =>
  console.log('Server is running on port 5000...')
)
