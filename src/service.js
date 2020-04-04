const BASEURL = "http://rap2.taobao.org:38080/app/mock";
const LOCAlurl = "http://localhost:3000";
const URL = {
  getHome: BASEURL + "/data/1510940",
  register: LOCAlurl + "/user/register",
  login: LOCAlurl + "/user/login",
  goods: LOCAlurl + "/goods/getGoodsInfo",
  category: LOCAlurl + "/goods/getGoodsList", // 获取商品大类的信息
  categorySub: LOCAlurl + "/goods/getGoodsListSub" // 获取商品小类的信息
};
module.exports = URL;
