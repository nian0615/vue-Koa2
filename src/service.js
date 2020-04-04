const BASEURL = "http://rap2.taobao.org:38080/app/mock";
const LOCAlurl = "http://localhost:3000";
const URL = {
  getHome: BASEURL + "/data/1510940",
  register: LOCAlurl + "/user/register",
  login: LOCAlurl + "/user/login",
  goods: LOCAlurl + "/goods/getGoodsInfo"
};
module.exports = URL;
