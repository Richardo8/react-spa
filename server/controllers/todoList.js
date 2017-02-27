let TodoList = require('../models/todoList')

async function getTodoList(name) {
  let result =  await TodoList.getTodoListByName(name);
  if(result instanceof Error){
    return {
      status: 0,
      info: '服务器错误'
    }
  }else {
    return result;
  }
}

async function createTodoList(data) {
  let result = await TodoList.createTodoList(data);
  if(result instanceof Error){
    return {
      status: 0,
      info: '服务器错误'
    }
  }else{
    return {
      status: 1,
      info: '保存成功'
    }
  }
}

module.exports = {
  getTodoList,
  createTodoList
}
