const getUserInfo = require('../controllers/user'),
  router = require('koa-router')();

router.get('/user/:name', async (ctx, next) => {
  let name = ctx.params.name;
  let data = await getUserInfo(name);
  console.log(data);
  ctx.body = data;
  await next();
});

module.exports = router;


