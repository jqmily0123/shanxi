<template>
  <div class="typis">
    <span id="text" class="msg"></span>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import TypeIt from "typeit";

onMounted(() => {
  new TypeIt("#text", {
    strings: [
      "您好",
      "欢迎来到陕西城市供水系统",
      "您的美丽成就我的动力",
      "成福明作品",
    ],
  }).go();
});
</script>

<style lang="less" scoped>
.typis {
  margin-top: 300px;
  margin-left: 500px;
  color: orange;
  font-size: 50px;
  text-align: left;

  text-shadow:
    0 0 10px orange,
    0 0 20px orange,
    0 0 30px orange,
    0 0 40px orange;
}
//.msg .cursorChar {
//  display: inline;
//  opacity: 1;
//  animation: blink 0.7s infinite;
//}
.msg {
  color: white;
  letter-spacing: 5px;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
