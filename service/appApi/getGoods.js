const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");
// 导入商品类数据进数据库
router.get("/insertGoods", async ctx => {
  fs.readFile("./data_json/newJson.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = mongoose.model("Goods");
    data.map((value, index) => {
      // console.log(value);
      let newGoods = new Goods(value);
      newGoods
        .save()
        .then(() => {
          saveCount++;
          console.log("成功");
        })
        .catch(error => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
// 注意   下面的相对路径 不能写../data_json/category.json  会导致错误 fs写入是相对于index.js文件的
// 文件的读取路径是基于入口文件的位置
router.get("/insertCategory", async ctx => {
  fs.readFile("./data_json/category.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model("Category");
    data.RECORDS.map((value, index) => {
      // console.log(value);
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(() => {
          saveCount++;
          console.log("成功");
        })
        .catch(error => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
router.get("/insertCategorySub", async ctx => {
  fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model("CategorySub");
    data.RECORDS.map((value, index) => {
      // console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch(error => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
// 获取商品信息的详细接口
router.get("/getGoodsInfo", async ctx => {
  // console.log(ctx.query.goodsId);
  let goodsId = ctx.request.query.goodsId;
  // console.log(ctx.request.body.goodsId);
  const Goods = mongoose.model("Goods");
  await Goods.findOne({ ID: goodsId })
    .exec()
    .then(async result => {
      ctx.body = { code: 200, data: result };
    })
    .catch(err => {
      console.log(err);
      ctx.body = { code: 500, message: err };
    });
});
// ======
router.post("/getDetailGoodsInfo", async ctx => {
  try {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model("Goods");
    let result = await Goods.findOne({ ID: goodsId }).exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});
module.exports = router;
