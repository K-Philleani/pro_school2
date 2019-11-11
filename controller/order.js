const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertInfo', async ctx => {
  fs.readFile('./data/order.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    console.log(data)
    let count = 0
    const Order = mongoose.model('Order')
    data.map(value => {
      let order = new Order(value)
      order.save().then(() => {
        count++
        console.log('成功' + count)
      }).catch(() => {
        console.log('失败' + count)
      })
    })
  })
  ctx.body = '导入数据'
})

router.get('/getInfo', async ctx => {
  let OrderInfo = mongoose.model('Order')
  await OrderInfo.find({}).then(res => {
    ctx.body = res
  })
})

router.post('/searchId', async ctx => {
  let OrderSearch = mongoose.model('Order')
  let orderId = ctx.request.body.orderId
  let orderName = ctx.request.body.name
  console.log(ctx.request)
  console.log(orderId)
  await OrderSearch.findOne({ 
    orderId: orderId
  }).then(async res => {
    console.log(res)
    if (res) {
      ctx.body = {
        code: 200,
        message: '查询成功',
        orderId: res
      }
    } else {
      ctx.body = {
        code: 201,
        message: '未查到'
      }
    }
  })
})

router.post('/addInfo', async ctx => {
  let OrderAdd = mongoose.model('Order')
  let orderInfo = new OrderAdd(ctx.request.body)
  await orderInfo.save().then(async res => {
    console.log(res)
    if (res) {
      ctx.body = {
        code: 200,
        message: '添加成功'
      }
    } else {
      ctx.body = {
        code: 200,
        message: '添加失败'
      }
    }
  })
})

router.post('/orderDel', async ctx => {
  const OrderDel = mongoose.model('Order')
  console.log(ctx.request.body)
  let orderId = ctx.request.body
  await OrderDel.remove(orderId).then(async res => {
    console.log(res)
    if (res) {
      ctx.body = {
        code: 200,
        message: '删除成功'
      }
    } else {
      ctx.body = {
        code: 500,
        message: '删除错误'
      }
    }
  })
})


module.exports = router