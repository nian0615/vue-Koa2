<template>
  <div class="home">
    <div class="header-search">
      <van-row>
        <van-col span="3">
          <img :src="locationImg" alt="定位" class="image" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5" style="padding-left: 0.6rem;">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- banner板块 -->
    <div class="banner-img">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannerImage" :key="index">
          <img v-lazy="item.image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 九宫格 -->
    <div class="type-bar">
      <div v-for="(item, index) in category" :key="index + 'index'">
        <img v-lazy="item.image" alt="" class="img" style="width: 90%;" />
        <span>{{ item.mallCategoryName }}</span>
      </div>
    </div>
    <!--addBanner - -->
    <div>
      <img v-lazy="this.addBanner" style="width: 100%;" alt="" />
    </div>
    <!-- recommend -->
    <div class="recommend">
      <div class="reommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in recommend" :key="index">
            <div class="recomment-item">
              <img :src="item.image" alt="" width="80%" />
              <div class="item-title">{{ item.goodsName }}</div>
              <div>
                ￥{{ item.price | moneyFilter }}(￥{{
                  item.mallPrice | moneyFilter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor -->
    <floor :floor="floor1" :floorTitle="floorTitle.floor1"></floor>
    <floor :floor="floor2" :floorTitle="floorTitle.floor2"></floor>
    <floor :floor="floor3" :floorTitle="floorTitle.floor3"></floor>
    <!-- 热卖部分 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list style="height: 130rem; overflow: hidden;">
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <div @click="getId(item)">
                <goods-info :data="{ ...item }"></goods-info>
              </div>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service";
import floor from "../components/floor";
import goodsInfo from "../components/goodsInfo";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { toMoney } from "../Filter/filter";
export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    floor,
    goodsInfo,
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  data() {
    return {
      // 打包后不会出错
      locationImg: require("../assets/ding.png"),
      bannerImage: [],
      category: [],
      addBanner: "",
      recommend: [],
      swiperOptions: {
        slidesPerView: 3,
      },
      floor1: [],
      floorTitle: {},
      floor2: [],
      floor3: [],
      hotGoods: [],
    };
  },
  created() {},
  mounted() {
    this.$axios
      .get(service.getHome)
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.category = res.data.data.category;
          this.addBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerImage = res.data.data.slides;
          this.recommend = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floorTitle = res.data.data.floorName;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.hotGoods = res.data.data.hotGoods;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    getId(item) {
      // console.log(111);
      // console.log(item);
      this.$router.push({
        path: "/goods",
        // name: "Goods",
        query: {
          goodsId: item.goodsId,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "~style/Variables.less";
.header-search {
  height: 2.2rem;
  background-color: @bgColor;
  line-height: 2.2rem;
  overflow: hidden;
  .image {
    width: 50%;
    padding-top: 0.6rem;
    padding-left: 0.6rem;
  }
  // 查找的input
  .search-input {
    width: 100%;
    height: 1.3rem;
    border: none;
    border-bottom: 1px solid #fff !important;
    background: #e5017d;
    color: #fff;
  }
}
// 轮播图
.banner-img {
  clear: both;
  // 以免网速慢的时候三个小点显示出来  bug
  max-height: 15rem;
  overflow: hidden;
  img {
    width: 100%;
  }
}
// type-bar
.type-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;
  background: #ffffff;
  margin: 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  div {
    flex: 1;
    font-size: 12px;
    padding: 0.3rem;
    text-align: center;
  }
  .img {
    width: 90%;
  }
}
// ----recommend
.recommend {
  background: #fff;
  margin-top: 0.3rem;
  .reommend-title {
    border-bottom: 1px solid #eee;
    padding: 0.2rem;
    font-size: 14px;
    color: @bgColor;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
    .recomment-item {
      width: 99%;
      border-right: 1px solid #eee;
      text-align: center;
      font-size: 12px;
    }
  }
}
// 热卖部分
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
