const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();

router
  .get("/", async ctx => {
    ctx.body = "首页";
  })
  .post("/register", async ctx => {
    const User = mongoose.model("User");
    let newUser = new User(ctx.request.body);
    ctx.body = ctx.request.body;
    await newUser
      .save()
      .then(() => {
        ctx.body = {
          code: 200,
          message: "注册成功"
        };
      })
      .catch(err => {
        ctx.body = {
          code: 500,
          message: err
        };
      });
  })
  .post("/login", async ctx => {
    let loginUser = ctx.request.body;
    let username = loginUser.username;
    let password = loginUser.password;
    const User = mongoose.model("User");
    await User.findOne({ username: username })
      .exec()
      .then(async res => {
        // console.log(res);
        // 在数据库中查出这条数据
        if (res) {
          let newUser = new User();
          // console.log(newUser, "====>");
          await newUser
            // 调用schema中的方法
            .comparePassword(password, res.password)
            .then(() => {
              ctx.body = { code: 200, message: "用户名密码正确" };
            })
            .catch(err => {
              console.log(err);
              ctx.body = { code: 500, message: err };
            });
        } else {
          ctx.body = { code: 200, message: "用户名不存在" };
        }
      })
      .catch(err => {
        console.log(err);
        ctx.body = { code: 500, message: "用户名密码不正确" };
      });
  });

module.exports = router;
