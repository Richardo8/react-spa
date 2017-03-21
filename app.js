const App = require('koa'),
  app = new App(),
  koa = require('koa-router')(),
  json = require('koa-json'),
  logger = require('koa-logger'), // 引入各种依赖
  jwt = require('koa-jwt'),
  path = require('path'),
  server = require('koa-static'),
  historyApiFallBack = require('koa-history-api-fallback');

// app.use(async (ctx, next) => {
//   require('koa-bodyparser')();
//   await next()
// });
// app.use(async (ctx, next) => {
//   json();
//   await next()
// });
// app.use(async (ctx, next) => {
//   logger();
//   await next()
// });
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
//为何把这些放在外边就不会报警告？？？？

// app.use(json());
// app.use(logger());

const auth = require('./server/routes/auth.js'),
  api = require('./server/routes/api.js'),
  upload = require('./server/routes/img.js');

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

// app.use(async (ctx, next) => {
//   upload.routes();
//   await next();
// })
//
// app.use(async (ctx, next) => {
//   auth.routes();
//   await next();
// })
//
// app.use(async (ctx, next) => {
//   api.routes();
//   await next();
// })
app.use(upload.routes());
app.use(auth.routes());
app.use(api.routes())

//jwt({secret: 'united'}),

// app.use(historyApiFallBack());// 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。

// app.use(server(path.resolve('dist')))
app.use(async (ctx, next) => {
  app.use(server(path.resolve('uploads')))
  await next();
})





app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
