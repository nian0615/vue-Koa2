const mongoose = require("mongoose");
const db = "mongodb://localhost/koaDb";
const glob = require("glob");
const { resolve } = require("path");

// 载入所有Schema
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, "./schema", "**/*.js")).forEach(require);
};
exports.connect = () => {
  // 链接数据库
  mongoose.connect(db);
  //   正常连接才能执行以下代码，否则就要返回错误
  new Promise((resolve, reject) => {
    // 声明一个连接次数  以免数据库没开 一直请求连接
    let num = 0;
    // 增加监听
    // 数据库断开了
    mongoose.connection.on("disconnected", err => {
      if (num <= 3) {
        num++;
        // 重新连接
        mongoose.connect(db);
      } else {
        throw new Error("数据库连接异常，请人为处理");
        reject();
      }
    });
    mongoose.connection.on("err", err => {
      if (num <= 3) {
        num++;
        // 重新连接
        mongoose.connect(db);
      } else {
        throw new Error("数据库连接异常，请人为处理");
        reject();
      }
    });
    mongoose.connection.once("open", () => {
      resolve();
      console.log("MongoDB connected successful");
    });
  });
};
