const fs = require("fs");

// 初步提纯
fs.readFile("./data_json/goods.json", "utf8", function(err, data) {
  let newData = JSON.parse(data); // 格式化内容
  let i = 0;
  let pushData = [];
  // RECORDS json中的对象名称
  newData.RECORDS.map((value, index) => {
    //   image有图片地址的就加进去
    if (value.IMAGE1 !== null) {
      i++;
      pushData.push(value);
    }
  });
  fs.writeFile("./data_json/newJson.json", JSON.stringify(pushData), function(
    err
  ) {
    if (err) console.log("失败");
    else console.log("写入成功");
  });
});
