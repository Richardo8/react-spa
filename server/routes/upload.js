let router = require('koa-router')(),
  multer = require('koa-multer');
//
// const upload = multer({
//   dest: 'uploads/',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '.jpg')
//   }
// });
//
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '.jpg');
//   }
// })
//
// let upload = multer({ storage: storage })


let storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
//添加配置文件到muler对象。
let upload = multer({
  storage: storage
});


router.post('/edit/profile', upload.single('avatar'), async(ctx, next) => {
  console.log(ctx.req.file);
  ctx.body = ctx.req.file.path;
  await next();
})

module.exports = router;
