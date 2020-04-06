<template>
  <div>
    <div class="nav-div">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!--清空购物车-->
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart"
        >清空购物车</van-button
      >
    </div>
    <!-- 显示购物车 -->
    <div class="cart-list">
      <div class="list" v-for="(item, index) in cartInfo" :key="index">
        <div class="list-img">
          <img :src="item.image" width="100%" srcset="" />
        </div>
        <div class="list-text">
          <div class="list-name">
            {{ item.name }}
          </div>
          <div class="control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="list-price">
          <div>￥{{ item.price | money }}元</div>
          <div>x {{ item.count }}</div>
          <div class="allPrice">
            ￥{{ (item.price * item.count) | money }}元
          </div>
        </div>
      </div>
    </div>
    <!-- 商品总价 -->
    <div class="total">商品总价：{{ totalMoney | money }}</div>
  </div>
</template>

<script>
import { toMoney } from "../Filter/filter";
export default {
  data() {
    return {
      cartInfo: [], // 购物车内商品
      isEmpty: false, // 购物车商品是否为空
    };
  },
  filters: {
    money(money) {
      return toMoney(money);
    },
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    },
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log(JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? false : true;
    },
    //清空购物车的商品
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
  },
};
</script>

<style lang="less" scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background: #ffffff;
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.65rem;
    border: 1px solid #e4e7ed;
    .list-img {
      flex: 6;
    }
    .list-text {
      flex: 14;
      padding-left: 10px;
      padding-top: 10px;
      .control {
        padding-top: 10px;
      }
    }
    .list-price {
      flex: 4;
      text-align: right;
      padding-top: 10px;
      .allPrice {
        color: red;
      }
    }
  }
}
.total {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>
