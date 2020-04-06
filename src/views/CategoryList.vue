<template>
  <div>
    <van-nav-bar
      title="类别列表"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftBar">
            <ul v-for="(item, index) in category" :key="index">
              <li
                @click="clickCategoryId(index, item.ID)"
                :class="{ categoryActive: categoryId == index }"
                class="leftItem"
              >
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div>
            <van-tabs v-model="active" @click="onclickCategorySubid">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="'categorySub' + index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
          <!-- list -->
          <div id="list">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div
                  class="list-item"
                  v-for="(item, index) in goodsList"
                  :key="index"
                  @click="goGoodsInfo(item.ID)"
                >
                  <div class="item-img">
                    <!--   <van-image :src="item.IMAGE1">
                      <template v-slot:error>加载失败</template>
                    </van-image> -->
                    <img :src="item.IMAGE1" :onerror="errImage" width="100%" />
                  </div>
                  <div class="item-text">{{ item.NAME }}</div>
                  <div class="item-price">
                    价格：￥{{ item.ORI_PRICE | moneyFilter }}
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import url from "../service";
import { toMoney } from "../Filter/filter";
export default {
  name: "categoryList",
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  data() {
    return {
      category: [],
      categoryId: 0,
      page: 1, // 商品列表页数
      goodsList: [], // 商品列表信息
      categorySubId: "", // 商品子类别id
      categorySub: [],
      active: 0,
      loading: false, // 上拉加载
      finished: false, // 是否有数据
      // list: [], // 商品大类数据
      refreshing: false, // 下拉刷新
      errImage: 'this.src="' + require("../assets/errorimg.png") + '"', // 错误图片的路径
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let widthHeight = document.documentElement.clientHeight;
    // 46 头顶部的高度
    document.getElementById("leftBar").style.height = widthHeight - 46 + "px";
    // List高度
    document.getElementById("list").style.height = widthHeight - 90 + "px";
  },
  methods: {
    // 跳转页面
    goGoodsInfo(id) {
      this.$router.push({
        name: "Goods",
        params: {
          goodsId: id,
        },
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    clickCategoryId(index, ID) {
      this.categoryId = index;
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.gerCategorySub(ID);
    },
    getCategory() {
      new Promise((resolve, reject) => {
        this.$axios
          .get(url.category, { params: {} })
          .then((res) => {
            if (res.data.code == 200 && res.data.message) {
              this.category = res.data.message;
              resolve("success");
            } else {
              this.$toast.fail("服务器错误 获取类别列表失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }).then((res) => {
        this.gerCategorySub(this.category[0].ID);
      });
    },
    // 读取小类类别
    gerCategorySub(categoryId) {
      this.$axios
        .post(url.categorySub, {
          categoryId: categoryId,
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.message) {
            // console.log(res);
            this.categorySub = res.data.message;
            this.active = 0; // 默认选中第一个
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
          } else {
            this.$toast.fail("服务器错误 获取类别列表失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          // console.log(this.refreshing);
          this.goodsList = [];
          this.refreshing = false;
        }
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getCategorySubList();
        /*     if (this.refreshing) {
          // console.log(this.refreshing);
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        } */
      }, 1000);
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.goodsList = [];
      this.page = 1;
      this.onLoad();
    },
    // 点击小类别事件
    onclickCategorySubid(index, title) {
      /* console.log(index);
      console.log(this.categorySub[index]); */
      this.categorySubId = this.categorySub[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    // 分页
    getCategorySubList() {
      this.$axios
        .post(url.categorySubList, {
          categorySubId: this.categorySubId,
          page: this.page,
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.message.length) {
            // console.log(res);
            this.page++;
            this.goodsList = this.goodsList.concat(res.data.message);
            // this.active = 0; // 默认选中第一个
          } else {
            this.finished = true;
            // this.$toast.fail("服务器错误 获取类别列表失败");
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(this.loading);
    },
  },
};
</script>

<style lang="less" scoped>
#leftBar {
  background: #eeeeee;
  .leftItem {
    font-size: 0.8rem;
    line-height: 2rem;
    padding: 3px;
    border-bottom: 1px solid #e4e7ed;
    text-align: center;
  }
  .categoryActive {
    background: #ffee44;
  }
}
#list {
  overflow: scroll;
  .list-item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
    .item-img {
      flex: 8;
    }
    .item-text {
      flex: 16;
      margin-top: 10px;
      margin-left: 10px;
    }
    .item-price {
    }
  }
}
</style>
