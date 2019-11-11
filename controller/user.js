const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

router.post('/register', async (ctx) => {
  const User = mongoose.model('User');
  let newUser = new User(ctx.request.body);
  console.log(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    };
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    };
  });
});


router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body;
  let userName = loginUser.userName;
  let password = loginUser.password;
  console.log(ctx.request.body)
  const User = mongoose.model('User');
  await User.findOne({ userName: userName }).then(async (result) => {
    console.log(result)
    if (result) {
      let newUser = new User();
      await newUser.comparePassword(password, result.password)
        .then(isMatch => {
          console.log(isMatch)
          if (isMatch) {
            ctx.body = {
              code: 200,
              message: '登录成功',
              userInfo: result
            };

          } else {
            ctx.body = {
              code: 201,
              message: '登录失败'
            };
          }
        })

    } else {
      ctx.body = {
        code: 201,
        message: '用户名不存在'
      };
    }
  })

});




module.exports = router;