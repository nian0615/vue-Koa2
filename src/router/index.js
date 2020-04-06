import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "mainHome",
    component: Main,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/categoryList",
        name: "categoryList",
        component: function () {
          return import("../views/CategoryList.vue");
        },
      },
      {
        path: "/cart",
        name: "Cart",
        component: function () {
          return import("../views/cart.vue");
        },
      },
    ],
  },

  {
    path: "/register",
    name: "Register",
    component: function () {
      return import("../views/Register.vue");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: function () {
      return import("../views/login.vue");
    },
  },
  {
    path: "/goods",
    name: "Goods",
    component: function () {
      return import("../views/Goods.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
