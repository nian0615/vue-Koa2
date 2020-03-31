<template>
  <div>
    <swiper class="swiper-slide" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in slide" :key="index">
        Slide {{ item }}
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "swiperDefault",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      slide: [0, 1, 2, 3, 4, 5],
      swiperOptions: {
        // direction: "vertical",  竖屏
        pagination: {
          el: ".swiper-pagination"
        }
        // Some Swiper option/callback...
      }
    };
  }
};
</script>

<style lang="less" scoped>
.swiper-slide {
  height: 4rem;
  text-align: center;
  padding-top: 3rem;
  border-bottom: 1px sloid #ccc;
}
</style>
