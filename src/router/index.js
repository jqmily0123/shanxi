// import Vue from 'vue';
import { createRouter, createWebHistory } from "vue-router";

// 引入你的组件
import Home from "../view/Home.vue";
import Admin from "../view/Admin.vue";
import Login from "../view/Login.vue";
// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/detail/:param",
    name: "Detail",
    component: () => import("../components/Detail.vue"),
    props: true,
  },
];

const router = createRouter({
  // mode: 'history',
  history: createWebHistory(),
  routes,
});

export default router;
