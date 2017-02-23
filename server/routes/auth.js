const getUserInfo = require('../controllers/user'),
  router = require('koa-router')();

router.get('/user/liu', async (ctx, next) => {
  await getUserInfo();
  await next();
});

module.exports = router;


