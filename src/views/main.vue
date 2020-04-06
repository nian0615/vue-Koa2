<template>
  <div>
    <div class="view">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeRouter(active)">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">列表</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "mainHome",
  data() {
    return {
      active: 0,
    };
  },
  created() {
    this.changeActived();
  },
  updated() {
    this.changeActived();
  },
  methods: {
    changeActived() {
      let nowPath = this.$route.path;
      //   console.log(nowPath);
      if (nowPath == "/cart") {
        this.active = 2;
      }
    },
    changeRouter(active) {
      //   console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "Home" });
          break;
        case 1:
          this.$router.push({ name: "categoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          //   this.$router.push({ name: "Login" });
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
