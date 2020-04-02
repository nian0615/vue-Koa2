const Koa = require("koa");
const app = new Koa();
const cors = require("koa2-cors");
app.use(cors());
//引入connect
const { connect, initSchemas } = require("./database/init.js");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
const Router = require("koa-router");
let user = require("./appApi/user");

let router = new Router();
router.use("/user", user.routes(), user.allowedMethods());
//立即执行函数
(async () => {
  await connect();
  await initSchemas();
})();

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("koa启动");
});
