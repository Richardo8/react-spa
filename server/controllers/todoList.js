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

async function getUnfinishedNum(name) {
  let result = await TodoList.getUnfinishedNum(name);
  if(result instanceof Error){
    return {
      status: 0,
      info: '数据库错误'
    }
  }else{
    return result;
  }
}

async function getFinishedNum(name) {
  let result = await TodoList.getFinishedNum(name);
  if(result instanceof Error){
    return {
      status: 0,
      info: '数据库错误'
    }
  }else{
    return result;
  }
}

async function getTenUnfinished(name, page) {
  let result = await TodoList.getTenUnfinishedTodoListByName(name, page);
  if(result instanceof Error){
    return {
      status: 0,
      info: '数据库错误'
    }
  }else{
    return result;
  }
}

async function getTenFinished(name) {
  let result = await TodoList.getTenFinishedTodoListByName(name);
  if(result instanceof Error){
    return {
      status: 0,
      info: '数据库错误'
    }
  }else{
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

async function updateTodoList(data) {
  let result = await TodoList.updateTodoList(data);
  if(result instanceof Error){
    return {
      status: 0,
      info: '服务器错误'
    }
  }else{
    return {
      status: 1,
      info: '更新成功'
    }
  }
}

async function removeTodo(content) {
  let result = await TodoList.removeTodo(content);
  if(result instanceof Error){
    return {
      status: 0,
      info: '服务器错误'
    }
  }else{
    return {
      status: 1,
      info: '删除成功'
    }
  }
}

module.exports = {
  getTodoList,
  getUnfinishedNum,
  getFinishedNum,
  getTenUnfinished,
  getTenFinished,
  createTodoList,
  updateTodoList,
  removeTodo
}
