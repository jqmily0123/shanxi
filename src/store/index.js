import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// 创建 Vuex store
export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage, // 选择使用 localStorage
      // storage: window.sessionStorage, // 或者使用 sessionStorage
    }),
  ],
  state() {
    return {
      user: null, // 示例状态
    };
  },
  mutations: {
    addUser(state, user) {
      state.user = user;
    },
    removeUser(state, user) {
      state.user = undefined;
    },
  },

  getters: {
    user: (state) => state.user,
  },
});
