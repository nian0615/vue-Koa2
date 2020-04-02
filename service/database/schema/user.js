const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let objId = Schema.Types.ObjectId;
// 此处下载不下来  因为得配置python环境
// const bcrypt = require("bcrypt");
// const SALT_WORK_FACTOR = 10;
// 创建模型
const userSchema = new Schema({
  userId: objId,
  // 用户名不能重复
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
});

//每次存储数据时都要执行
/* userSchema.pre("save", function(next) {
  //let user = this
  // console.log(this);
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
}); */
// 比较密码的方法
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      if (_password === password) {
        resolve();
      } else {
        reject();
      }
    });
  }
};
// 发布模型
mongoose.model("User", userSchema);
