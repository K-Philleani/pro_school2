const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')


router.post('/addQues', async ctx => {
  const QuesInfo = mongoose.model('Ques')
  let ques = QuesInfo(ctx.request.body)
  await ques.save().then(() => {
    ctx.body = {
      code: 200,
      message: '反馈成功'
    
    }
  })

})


module.exports = router