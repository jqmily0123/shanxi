<template>
  <div class="app">
    <Header></Header>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>
<style>
.app,
body,
html,
#app {
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  background: url("@/assets/背景.png") no-repeat;
  background-size: 100% 100%;
}
</style>
