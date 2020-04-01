const Koa = require("koa");
const app = new Koa();
//引入connect
const { connect, initSchemas } = require("./database/init.js");
const mongoose = require("mongoose");
//立即执行函数
(async () => {
  await connect();
  await initSchemas();
  const User = mongoose.model("User");
  let oneUser = new User({ userName: "wgg2", password: "123456" });
  oneUser.save().then(() => {
    console.log("插入成功");
  });
  // 读出
  let users = await User.findOne({}).exec();
  console.log(users);
})();

app.use(async ctx => {
  ctx.body = "123";
});
app.listen(3000, () => {
  console.log("koa启动");
});
