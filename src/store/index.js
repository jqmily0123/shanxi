import { createStore } from "vuex";

// 创建 Vuex store
export default createStore({
  state() {
    return {
      user: null, // 示例状态
    };
  },
  mutations: {
    addUser(state, user) {
      state.user = user;
    },
  },

  getters: {
    user: (state) => state.user,
  },
});
