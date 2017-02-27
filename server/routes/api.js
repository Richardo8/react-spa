let TodoCont = require('../controllers/todoList'),
  router = require('koa-router')();

router.get('/todolist/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.body = await TodoCont.getTodoList(name);
  await next();
})

router.post('/todolist', async(ctx, next) => {
  ctx.body = await TodoCont.createTodoList(ctx);
  await next();
})

module.exports = router;
