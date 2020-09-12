const { connect } = require('mongoose')
const config = require('./config')

const dbConfig = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = function () {
  return new Promise((resolve, reject) => {
    try {
      connect(config.dbUri, dbConfig).then(() =>
        resolve(`Database connection established. Uri: ${config.dbUri}`)
      )
    } catch (e) {
      reject(console.log('DB ERROR! - ', e.message))
    }
  })
}
