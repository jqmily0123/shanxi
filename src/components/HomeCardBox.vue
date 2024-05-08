<template>
  <div class="home-card-box">
    <div class="title">{{ title }}</div>
    <div class="children" v-if="children">
      <div v-for="child in children" :key="child.id" class="child">
        <component :is="child.component" :item="child" class="com"></component>
        <div class="subtitle" v-if="child.subTitle">{{ child.subTitle }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  item: Object,
});
const { title, children } = props.item;
</script>
<style scoped lang="less">
.home-card-box {
  width: 100%;
  height: 300px;
  background: url(@/assets/homeCard.svg) no-repeat center center;
  //background-color: red;
  //background-size: 300% 275px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  position: relative;
  //background-color: red;
  .title {
    font-size: 25px;
    color: #fff;
    position: absolute;
    top: 20px;
    font-weight: bold;
  }
  .children {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .child {
      //margin-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .com {
        //margin-bottom: 20px;
      }
      .subtitle {
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>
