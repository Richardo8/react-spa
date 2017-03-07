let router = require('koa-router')(),
  multer = require('koa-multer');

const upload = multer({ dest: 'uploads/'});


router.post('/edit/profile', async(ctx, next) => {
  console.log(ctx)
  upload.single('avator');
  next();
})

module.exports = router;
