const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')


router.post('/addPerson', async ctx => {
  const personInfo = mongoose.model('Person')
  let info = ctx.request.body
  let person = new personInfo(info)
  console.log(info)
  await person.save().then(() => {
    ctx.body = {
      code: 200,
      message: '添加成功'
    }
  })
})

router.get('/getPerson', async ctx => {
  let getInfo = mongoose.model('Person')
  await getInfo.find({}).then(res => {
    ctx.body = res
  })
})


module.exports = router;