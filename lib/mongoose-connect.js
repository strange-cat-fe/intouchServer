const mongoose = require('mongoose')
const config = require('./config')

const dbConfig = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      try {
        mongoose
          .connect(config.dbUri, dbConfig)
          .then(() =>
            resolve(`Database connection established. Uri: ${config.dbUri}`)
          )
      } catch (e) {
        reject(console.log('DB ERROR! - ', e.message))
      }
    })
  },
  disconnect: (done) => mongoose.disconnect(done),
}
