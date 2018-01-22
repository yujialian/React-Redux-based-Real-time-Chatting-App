const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
//Connect mongo, using imooc set
mongoose.connect(DB_URL)
