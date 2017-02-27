const App = require('koa'),
  app = new App(),
  koa = require('koa-router')(),
  json = require('koa-json'),
  logger = require('koa-logger'), // 引入各种依赖
  jwt = require('koa-jwt'),
  auth = require('./server/routes/auth.js'),
  api = require('./server/routes/api.js');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.req.method, ctx.req.url, ms); // 显示执行的时间
  // koa2中已经完全使用ctx，即上下文，读取数据从ctx中获取。
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    if(401 == err.status){
      ctx.status = 401;
      ctx.body = {
        status: 0,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    }else{
      throw err;
    }
  }
})

app.on('error', function(err, ctx){
  console.log('server error', err);
});

app.use(auth.routes());
app.use(jwt({secret: 'united'}), api.routes());

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
