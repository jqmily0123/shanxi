<template>
  <div class="header">
    <img src="@/assets/top.svg" />
    <div class="title">陕西城市供水系统</div>
    <div class="clock">{{ date }}</div>
    <user-button v-if="user" :user="user"></user-button>
  </div>
</template>
<script setup>
import moment from "moment";
import dayjs from "dayjs";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import UserButton from "@/components/UserButton.vue";
const store = useStore();
const user = computed(() => store.getters.user);
console.log(user);
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
  //background-color: pink;
  .clock {
    color: white;
    font-size: 16px;
    position: absolute;
    top: 63px;
    left: 330px;
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
}
</style>
