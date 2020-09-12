require('dotenv').config()
const app = require('./app')
const connectMongoose = require('./lib/mongoose-connect')

connectMongoose().then((message) => {
  console.log(message)
  app.listen(5000, () => console.log('Server is running on port 5000...'))
})
