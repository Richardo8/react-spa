## 如何实现koa2的路由
[koa2-router文档](https://github.com/alexmingoia/koa-router/tree/master/)


在routes文件夹下新建路由文件，在该文件中书写详细的路由代码，新的koa-route中需要写成

    router.get('/', function(ctx, next) {...})

如上的形式。

也就是类似于中间件的形式，可以使用async函数来完成。

在koa的入口程序（app.js或index.js）中，引入路由文件，并且在入口文件中挂载上路由文件。

例如：

    const App = require('koa'),
          app = new App(),
          router = require('koa-router')(),
          routerFile = require('./server/routes/routerFile.js');
    app.use(auth.routes());

如上，app.use(auth.routes())加载路由文件即可。

## 如何通过冒号方式查询数据

在路由文件中：

    router.get('/user/:name', async (ctx, next) => {
      let name = ctx.params.name;
      ctx.body = await getUserInfo(name);
      await next();
    });


使用ctx.params即可获取很多数据，进而使用ctx.body返回数据



