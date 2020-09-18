const app = require('./app')
const mongoDB = require('./lib/mongoose-connect')

mongoDB.connect().then((message) => {
  console.log(message)
  app.listen(5000, () => console.log('Server is running on port 5000...'))
})
