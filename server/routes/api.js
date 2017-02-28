let TodoCont = require('../controllers/todoList'),
  router = require('koa-router')();

router.get('/todolist/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.body = await TodoCont.getTodoList(name);
  await next();
})

router.post('/todolist', async(ctx, next) => {
  ctx.body = await TodoCont.createTodoList(ctx.request.body);
  await next();
})

router.get('/todolist/update/:content/:status', async(ctx, next) => {
  ctx.body = await TodoCont.updateTodoList(ctx.params);
  await next();
})

router.get('/todolist/remove/:content', async(ctx, next) => {
  ctx.body = await TodoCont.removeTodo(ctx.params.content);
  await next();
})

module.exports = router;
