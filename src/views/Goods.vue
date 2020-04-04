<template>
  <div>
    <div class="nave-bar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </div>
    <div class="topimage">
      <img :src="goodsInfo.IMAGE1" alt="" width="100%" />
    </div>
    <div class="goods-title">
      {{ goodsInfo.NAME }}
    </div>
    <div class="goods-price">
      价格：${{ goodsInfo.PRESENT_PRICE | moneyFilter }}元
    </div>
    <div class="goods-body">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-foot">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoney } from "../Filter/filter";
import url from "../service";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getGoodsInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    getGoodsInfo() {
      this.$axios
        .get(url.goods, {
          params: {
            goodsId: this.goodsId
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.data) {
            this.goodsInfo = res.data.data;
          } else {
            this.$toast.fail("服务器错误 获取商品信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.goods-title,
.goods-price {
  background: #fff;
  font-size: 0.9rem;
  text-align: center;
}
// 如果是图文混排  还是有问题  最优方法是后台解决
.detail {
  font-size: 0;
}
.goods-foot {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  background: #ffffff;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  div {
    flex: 1;
    padding: 5px;
  }
}
</style>
