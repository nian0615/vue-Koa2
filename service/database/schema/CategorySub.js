const mongoose = require("mongoose"); //引入Mongoose
const Schema = mongoose.Schema; //声明Schema

const categorySub = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_ID: { type: String },
  MALL_SUB_NAME: { type: String },
  SORT: { type: Number },
  COMMENTS: { type: String }
});
mongoose.model("CategorySub", categorySub);
