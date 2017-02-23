const getUserInfo = require('../controllers/user'),
  router = require('koa-router')();

router.get('/user/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.body = await getUserInfo(name);
  await next();
});

/*
* 在路由中使用ctx.params.name获取url中相关数据（即冒号后边的数据），搜索完数据之后使用ctx.bod = 即可返回查询到的数据*/

module.exports = router;


