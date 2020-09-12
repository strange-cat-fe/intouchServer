module.exports = {
  dbUri:
    process.env.NODE_ENV == 'test'
      ? 'mongodb://127.0.0.1:27017/intouchServer'
      : process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
}
