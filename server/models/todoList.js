let db = require('../config/db'),
  todoListSchema = require('../schema/todoList');

let todoListModel = db.model('Todo', todoListSchema);

class Todo{
  constructor(username, content, status){
    this.user_name = username;
    this.content = content;
    this.status = status;
  }

  static async getTodoListByName(name){
    try{
      return await todoListModel.find({ 'user_name': name})
    }catch(err) {
      return err;
    }
  }

  static async createTodoList(data){
    try{
      let saveData = {
        user_name: data.name,
        content: data.content,
        status: data.status
      }
      return await todoListModel.create(saveData);//此时return了一个model，在controller中直接判断是否出错就可以了
    }catch (err){
      return err;
    }
  }

  static async updateTodoList(data){
    try{
      let checkData = {
        content: data.content
      }
      return await todoListModel.update(checkData, {$set: {status: data.status == '1' ? '0' : '1'}})
    }catch(err){
      return err;
    }
  }

  static async removeTodo(content){
    try{
      let checkData = {
        content: content
      }
      return await todoListModel.remove(checkData)
    }catch(err){
      return err;
    }
  }
}

module.exports = Todo;



