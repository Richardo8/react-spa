const App = require('koa'),
  app = new App(),
  koa = require('koa-router')(),
  json = require('koa-json'),
  logger = require('koa-logger'), // 引入各种依赖
  auth = require('./server/routes/auth.js');

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

app.on('error', function(err, ctx){
  console.log('server error', err);
});

app.use(auth.routes());

// koa.use('/auth', auth.routes());

// app.use(koa.routes());

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
