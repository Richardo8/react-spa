const UserCont = require('../controllers/user'),
  router = require('koa-router')();

router.get('/user/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.body = await UserCont.getUserInfo(name);
  await next();
});

router.post('/user', async (ctx, next) => {
  ctx.body = await UserCont.postUserInfo(ctx);
  await next();
})

/*
* 在路由中使用ctx.params.name获取url中相关数据（即冒号后边的数据），搜索完数据之后使用ctx.bod = 即可返回查询到的数据.
* 如果放出的接口是一个对象，obj.function即可。*/

module.exports = router;


