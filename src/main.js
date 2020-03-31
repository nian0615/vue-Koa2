import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// Lazyload vue包提供的懒加载
import Vant, { Lazyload } from "vant";
import "vant/lib/index.css";
// import VueAwesomeSwiper from 'vue-awesome-swiper'  局部引入
// import 'swiper/css/swiper.css'
// axios.defaults.baseURL = "http://rap2.taobao.org:38080/app/mock";
Vue.prototype.$axios = axios;
Vue.use(Lazyload);
Vue.use(Vant);
// Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
