// import Vue from 'vue';
import { createRouter, createWebHistory } from "vue-router";

// 引入你的组件
import Home from "../view/Home.vue";
import Login from "../view/Login.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // 从根路径重定向到 /login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/detail/:param",
    name: "Detail",
    component: () => import("../view/Detail.vue"),
    props: true,
  },
];

const router = createRouter({
  // mode: 'history',
  history: createWebHistory(),
  routes,
});

export default router;
