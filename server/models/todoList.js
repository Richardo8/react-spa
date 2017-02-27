let db = require('../config/db'),
  todoListSchema = require('../schema/todoList');

let todoListModel = db.model('Todo', todoListSchema);

class Todo{
  constructor(username, content, status){
    this.username = username;
    this.content = content;
    this.status = status;
  }

  static async getTodoListByName(name){
    try{
      return await todoListModel.find({ 'username': name})
    }catch(err) {
      return err;
    }
  }

  static async createTodoList(data){
    try{
      let saveData = {
        username: data.name,
        content: data.content,
        status: data.status
      }
      return await todoListModel.create(saveData)
    }catch (err){
      return err;
    }
  }
}

module.exports = Todo;



