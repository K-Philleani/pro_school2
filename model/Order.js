const mongoose = require('mongoose') 
const Schema = mongoose.Schema // 使用Schema设置数据格式和类型

const orderSchema = new Schema({
  id: Schema.Types.ObjectId,
  orderId: String,
  name: String,
  tel: Number,
  address: String,
  company: String,
  status: String
})


mongoose.model('Order', orderSchema)