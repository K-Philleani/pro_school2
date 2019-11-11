const mongoose = require('mongoose')
const Schema = mongoose.Schema

let quesSchema = new Schema({
  id: Schema.Types.ObjectId,
  msg: String
})


mongoose.model('Ques', quesSchema)