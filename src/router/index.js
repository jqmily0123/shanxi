// import Vue from 'vue';
import { createRouter, createWebHistory } from "vue-router";
// import { useRouter } from "vue-router";
import store from "@/store/index.js";
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
// const store = useStore();

router.beforeEach((to, from, next) => {
  // 例如，检查用户是否已登录

  if (to.path === "/login" && store.state.user) {
    // 重定向到首页
    store.commit("removeUser");
    next("/login");
  } else {
    next(); // 继续导航
  }
});
export default router;
