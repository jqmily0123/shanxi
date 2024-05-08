<template>
  <div class="header">
    <img src="@/assets/top.svg" />
    <div class="title">陕西城市供水系统</div>
    <div class="clock">{{ date }}</div>
    <div class="user">
      <span class="avatar">
        <img src="@/assets/avatar.jpg" />
      </span>
      <span class="username">我是焦爸爸</span>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import dayjs from "dayjs";
import { ref } from "vue";
const date = ref();
setInterval(() => {
  date.value = dayjs().format("YYYY[年]MM[月]DD[日] HH:mm:ss dddd");
}, 100);
</script>
<style scoped lang="less">
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  .clock {
    color: white;
    font-size: 16px;
    position: absolute;
    top: 63px;
    left: 370px;
  }
  //background-color: #f0f0f0;
  position: relative;
  img,
  .title {
    position: absolute;
  }
  .title {
    font-size: 50px;
    color: #fff;
  }
  .user {
    width: 150px;
    height: 40px;
    background-color: orange;
    color: white;
    font-size: 20px;
    line-height: 40px;
    position: absolute;
    border-radius: 20px;
    right: 350px;
    top: 63px;
    display: flex;
    .avatar {
      display: flex;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      //border: 1px solid red;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .username {
    }
  }
}
</style>
