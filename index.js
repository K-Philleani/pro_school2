const Koa = require('koa');
const app = new Koa();

const cors = require('koa2-cors');
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}));

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const Router = require('koa-router');
let user = require('./controller/user.js');
let order = require('./controller/order.js')
let person = require('./controller/person')
let ques = require('./controller/ques')

let router = new Router();
router.use('/user', user.routes());
router.use('/order', order.routes())
router.use('/person',person.routes())
router.use('/ques', ques.routes())

app.use(router.routes());
app.use(router.allowedMethods());


const { connect, initSchemas } = require('./init.js');
(async () => {
  await connect();
  initSchemas();
})();


app.use(async (ctx) => {
  ctx.body = '服务器正在运行';
})

app.listen(3000, () => {
  console.log('服务器正在运行');
});