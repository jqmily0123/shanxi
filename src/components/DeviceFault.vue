<template>
  <div class="device_fault">
    <div class="t_header">
      <span>设备编号</span>
      <span>设备名称</span>
      <span>设备状态</span>
      <span>设备检修状态</span>
    </div>
    <vue3-seamless-scroll class="t_body" :list="childData">
      <div
        v-for="item in childData"
        :key="item.id"
        :class="[item.deviceStatus === '设备故障' ? 'isActive' : '', 'tr']"
      >
        <span>{{ item.id.slice(0, 8) }}</span>
        <span>{{ item.deviceName }}</span>
        <span>{{ item.deviceStatus }}</span>
        <span>{{ item.deviceMaintenanceStatus }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>
<script setup>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const props = defineProps({
  item: Object,
});
const { childData } = props.item;
console.log(childData);
</script>
<style scoped lang="less">
li {
  list-style: none;
}
.device_fault {
  width: 430px;
  height: 220px;
  //background-color: pink;
  overflow: hidden;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1.5px;
  .t_header,
  .tr {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;

    span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      //background-color: red;
    }
  }
  .t_header {
    margin-top: 13px;
    background-color: #00201f;
    //margin: 0 10px;
  }

  .t_body {
    //margin-top: 10px;
    overflow: hidden;
    .tr {
      background: linear-gradient(to right, rgba(6, 37, 36, 0.01), #002625);
    }
  }
}
.isActive {
  color: #ff0000;
}
</style>
