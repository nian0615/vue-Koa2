const Router = require("koa-router");

let router = new Router();

router
  .get("/", async ctx => {
    ctx.body = "首页";
  })
  .post("/login", async ctx => {
    ctx.body = ctx.request.body;
  });

module.exports = router;
