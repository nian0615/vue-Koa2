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
            <van-tabs v-model="active">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="'categorySub' + index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import url from "../service";
export default {
  name: "categoryList",
  data() {
    return {
      category: [],
      categoryId: 0,
      categorySub: [],
      active: 0
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let widthHeight = document.documentElement.clientHeight;
    // 46 头顶部的高度
    document.getElementById("leftBar").style.height = widthHeight - 46 + "px";
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    clickCategoryId(index, ID) {
      this.gerCategorySub(ID);
      this.categoryId = index;
    },
    getCategory() {
      this.$axios
        .get(url.category, { params: {} })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            // console.log(res);
            this.category = res.data.message;
            // console.log(this.category[0]);
            this.gerCategorySub(this.category[0].ID);
          } else {
            this.$toast.fail("服务器错误 获取类别列表失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 读取小类类别
    gerCategorySub(categoryId) {
      this.$axios
        .post(url.categorySub, {
          categoryId: categoryId
        })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            // console.log(res);
            this.categorySub = res.data.message;
            this.active = 0; // 默认选中第一个
          } else {
            this.$toast.fail("服务器错误 获取类别列表失败");
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
</style>
