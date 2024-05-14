<template>
  <div class="user">
    <span class="avatar">
      <img :src="user.avatar" v-if="user.avatar" />
      <img src="@/assets/avatar.jpg" v-else />
    </span>
    <div class="username" v-if="user.username">
      <span>{{ user.username }}</span>
      <a-button @click="logout">退出登录</a-button>
    </div>
    <div v-else>
      <a-button @click="login">登录/注册</a-button>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const props = defineProps({
  user: Object,
});
console.log(props.user.avatar);
const logout = () => {
  store.commit("removeUser");
  router.push("/");
};
// console.log(store.getters.user);
</script>
<style lang="less" scoped>
.user {
  width: 250px;
  height: 40px;
  //background-color: orange;
  color: black;
  font-size: 20px;
  line-height: 40px;
  position: absolute;
  right: 360px;
  top: 70px;
  display: flex;
  //border: 1px solid red;
  background-color: white;
  .avatar {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    //border: 1px solid red;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .username {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //background-color: red;
    .ant-btn {
      height: 100%;
      background-color: orange;
      color: white;
      font-size: 16px;
    }
  }
}
</style>
