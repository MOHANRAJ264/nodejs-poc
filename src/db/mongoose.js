const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODATABSE, { useNewUrlParser: true, useCreateIndex: true })