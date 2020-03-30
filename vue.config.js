const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set("@", resolve("/src"))
      .set("style", resolve("src/style"));

    //注意 store 和 router 没必要配置
  }
};
// module.exports = {
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://kx969m.natappfree.cc",
//         changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//         ws: true, // 开启webSocket
//         pathRewrite: {
//           "^/api": "" // 替换成target中的地址
//         }
//       }
//     }
//   }
// };
