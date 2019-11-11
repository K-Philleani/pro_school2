const mongoose = require('mongoose') // 引入mongoose插件
const db = 'mongodb://localhost/wuliu' // 设置数据库地址
const glob = require('glob') // 引入全局
const path = require('path') // 引入path(node)路径模块

// 全局方式遍历引入model文件夹下所有JS文件，并以initSchemas为名向外暴露
exports.initSchemas = () => {
  glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require)
}
// 设置数据库链接方法，并向外暴露
exports.connect = () => {
  //  链接数据库
  mongoose.connect(db, { useNewUrlParser: true })
  // 链接失败后，重新链接
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(db)
  })
  // 链接出错后，重新链接，并输出err信息
  mongoose.connection.on('error', err => {
    console.log(err)
    mongoose.connect(db)
  })
  // 链接成功后，输出成功提示
  mongoose.connection.once('open', () => {
    console.log('数据库链接成功!')
  })
}
