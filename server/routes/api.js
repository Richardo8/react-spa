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

//get
// router.get('/todolist/update/:content/:status', async(ctx, next) => {
//   ctx.body = await TodoCont.updateTodoList(ctx.params);
//   await next();
// })

//post post下使用ctx.request.body获取从前端传输过的数据，get则使用ctx.params获取路径中正则表达式的内容，如上所示的路径中的content和status
router.post('/todolist/update', async(ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = await TodoCont.updateTodoList(ctx.request.body);
  await next();
})

router.post('/todolist/remove/', async(ctx, next) => {
  ctx.body = await TodoCont.removeTodo(ctx.request.body.content);
  await next();
})

module.exports = router;
