const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
  id: Schema.Types.ObjectId,
  userName: String,
  tel: Number,
  age: Number,
  address: String,
  name: String,
  sex: String
})


mongoose.model('Person', personSchema)