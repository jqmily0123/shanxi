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
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

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
