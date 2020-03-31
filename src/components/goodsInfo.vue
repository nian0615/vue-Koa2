<template>
  <div>
    <div>
      <img v-lazy="data.image" width="90%" alt="" />
    </div>
    <div class="goods-name">{{ data.name }}</div>
    <div>￥{{ data.mallPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "../Filter/filter";
export default {
  name: "goods",
  props: ["data"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    // console.log(this.data);
  }
};
</script>

<style lang="less" scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
