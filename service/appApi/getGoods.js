const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");
// 导入商品类数据进数据库
router.get("/insertGoods", async (ctx) => {
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
        .catch((error) => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
// 注意   下面的相对路径 不能写../data_json/category.json  会导致错误 fs写入是相对于index.js文件的
// 文件的读取路径是基于入口文件的位置
router.get("/insertCategory", async (ctx) => {
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
        .catch((error) => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
router.get("/insertCategorySub", async (ctx) => {
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
        .catch((error) => {
          console.log("失败：" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});
// 获取商品信息的详细接口
router.get("/getGoodsInfo", async (ctx) => {
  // console.log(ctx.query.goodsId);
  let goodsId = ctx.request.query.goodsId;
  // console.log(ctx.request.body.goodsId);
  const Goods = mongoose.model("Goods");
  await Goods.findOne({ ID: goodsId })
    .exec()
    .then(async (result) => {
      ctx.body = { code: 200, data: result };
    })
    .catch((err) => {
      console.log(err);
      ctx.body = { code: 500, message: err };
    });
});
// ====== 简写
/* router.post("/getGoodsInfo", async ctx => {
  try {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model("Goods");
    let result = await Goods.findOne({ ID: goodsId }).exec();
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
}); */
// ----
// 读取商品的大类
router.get("/getGoodsList", async (ctx) => {
  try {
    const Category = mongoose.model("Category");
    let result = await Category.find().exec(); // 得到所有数据
    ctx.body = { code: 200, message: result };
  } catch (err) {
    ctx.body = { code: 500, message: err };
  }
});

// 读取小类的信息
router.post("/getGoodsListSub", async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId;
    // let categoryId = "1";
    const CategorySub = mongoose.model("CategorySub");
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId,
    }).exec();
    ctx.body = { code: 200, message: result };
  } catch (error) {
    ctx.body = { code: 500, message: err };
  }
});

// 根据类别获取列表
router.post("/getGoodsListBycategoryId", async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId; //子类别id
    let page = ctx.request.body.page; // 当前页数
    let num = 10; // 每页显示10个
    let start = (page - 1) * 10; // 开始位置
    // let categorySubId = "2c9f6c946016ea9b016016f79c8e0000";
    const Goods = mongoose.model("Goods");
    let result = await Goods.find({
      SUB_ID: categorySubId,
    })
      .skip(start)
      .limit(num)
      .exec();
    ctx.body = { code: 200, message: result };
  } catch (error) {
    ctx.body = { code: 500, message: err };
  }
});
module.exports = router;
