const mongoose = require('mongoose')
const app = require('express')()

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://danila:19283746@cluster0-jati1.mongodb.net/intouchServer',
      {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    app.listen(5000, () => console.log('Server is running on port 5000...'))
  } catch (e) {
    console.log(e)
  }
}

start()
