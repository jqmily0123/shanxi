<template>
  <div class="container">
    <div class="th">
      <span v-for="item in th">{{ item }}</span>
    </div>
    <vue3-seamless-scroll
      :list="users"
      class="td"
      :limitScrollNum="15"
      :wheel="true"
    >
      <div v-for="user in users" :key="user.id" class="tr">
        <div>{{ user.id }}</div>
        <div>{{ user.username }}</div>
        <div class="option">
          <span @click="deleteUser(user)">删除</span>
        </div>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>
<script setup>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const emit = defineEmits(["onUpdateUser", "onDeleteUser"]);
const th = ["用户id", "用户名", "操作"];
const props = defineProps({
  users: Object,
});
const deleteUser = (user) => {
  emit("onDeleteUser", user);
};
</script>
<style lang="less" scoped>
.container {
  width: 800px;
  height: 600px;
  //border: 1px solid red;
  .th {
    display: flex;
    padding: 10px 0;
    background-color: #00201f;
    box-sizing: border-box;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    span {
      height: 30px;
      line-height: 30px;
      text-align: center;
      flex: 1;
    }
  }
  .td {
    width: 100%;
    //overflow: hidden;
    .tr {
      display: flex;
      border-bottom: 2px solid black;
      div {
        //border: 1px solid red;
        flex: 1;
        //border: 1px solid red;
        //color: black;
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        background-color: #00fff7;
        span {
          padding: 5px 10px;
        }
        span:nth-child(1) {
          background-color: red;
        }
        span:nth-child(2) {
          background-color: orange;
        }
      }
    }
  }
}
</style>
