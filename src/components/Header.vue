<template>
  <div class="header">
    <img src="@/assets/top.svg">
    <div class="title">陕西城市供水系统</div>
  </div>
</template>
<script setup>
</script>
<style scoped lang="less">
  .header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    //background-color: #f0f0f0;
    position: relative;
    img, .title{
      position: absolute;
    }
    .title{
      font-size: 50px;
      color: #fff;
    }
  }
</style>