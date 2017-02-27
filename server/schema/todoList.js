let mongoose = require('mongoose')

let todoListSchema = new mongoose.Schema({
  user_name: string,
  content: string,
  status: int
})

module.exports = todoListSchema;


