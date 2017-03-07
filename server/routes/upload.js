let router = require('koa-router')(),
  multer = require('koa-multer');

const upload = multer({ dest: 'uploads/'});


router.post('/edit/profile', upload.single('avatar'), async(ctx, next) => {
  await next();
})

module.exports = router;
