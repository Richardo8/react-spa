let mongoose = require('mongoose')

let todoListSchema = new mongoose.Schema({
  user_name: String,
  content: String,
  status: Number
})

/*mongoose中没有Int类型，只能用number代替*/

module.exports = todoListSchema;


