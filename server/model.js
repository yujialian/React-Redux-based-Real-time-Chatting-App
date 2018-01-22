const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/talent_hunter'
//Connect mongo, using imooc set
mongoose.connect(DB_URL)
const models = {
  user: {
    'user':{'type':String, 'require':true},
    'pwd':{'type':String, 'require':true},
    'type':{'type':String, 'require':true},
    //Avatar
    'avatar':{'type':String},
    //Personal description or position description
    'desc':{'type':String},
    //Position name
    'title':{'type':String},
    //If boss, there are 2 additional fields
    'company':{'type':String},
    'salary':{'type':String}
  },
  chat: {

  }
}
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel:function(name) {
    return mongoose.model(name)
  }
}
