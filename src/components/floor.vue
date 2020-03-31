<template>
  <div>
    <div class="hot-title">
      {{ floorTitle }}
    </div>
    <div class="hot">
      <div class="hot-left">
        <img :src="floor[0].image" v-if="floor.length > 0" alt="" />
      </div>
      <div>
        <div class="hot-right">
          <img :src="floor[1].image" v-if="floor.length > 0" alt="" />
        </div>
        <div>
          <img :src="floor[2].image" v-if="floor.length > 0" alt="" />
        </div>
      </div>
    </div>
    <div class="hot-rule">
      <div v-for="(item, index) in floor.slice(3)" :key="index">
        <img :src="item.image" width="100%" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floor",
  props: {
    floor: {
      type: Array,
      defalut: []
    },
    floorTitle: ""
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="less" scoped>
// hot 部分
.hot-title {
  border-bottom: 1px solid #eee;
  background: #eee;
  margin-top: 0.2rem;
  padding: 0.2rem;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}
.hot {
  display: flex;
  flex-direction: row;
  background: #fff;
  border-bottom: 1px solid #ddd;
  div {
    box-sizing: border-box;
    width: 10rem;
    img {
      width: 100%;
    }
  }
  .hot-left {
    border-right: 1px solid #ddd;
  }
  .hot-right {
    border-bottom: 1px solid #ddd;
  }
}
.hot-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    width: 10rem;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
  }
}
</style>
