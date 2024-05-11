<template>
  <div class="app">
    <Header></Header>
    <RouterView></RouterView>
    <!--    <test></test>-->
    <!--    <user-info></user-info>-->
  </div>
</template>

<script setup>
import Test from "@/view/Test.vue";
import Header from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
</script>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app,
body,
html,
#app {
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  background: url("@/assets/背景.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  caret-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
