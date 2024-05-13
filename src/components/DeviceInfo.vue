<template>
  <div class="container">
    <div class="th_c">
      <ul class="th">
        <li v-for="(item, index) in th" :key="index">{{ item }}</li>
        <li class="option">操作</li>
      </ul>
    </div>

    <vue3SeamlessScroll :list="list" class="lists" v-bind="classOption">
      <div v-for="item in list" class="list">
        <div>{{ item.id.slice(0, 8) }}</div>
        <div>{{ item.deviceName }}</div>
        <div>{{ item.deviceStatus }}</div>
        <div>{{ item.deviceMaintenanceStatus }}</div>
        <div>{{ item.installationDate }}</div>
        <div class="option">
          <span @click="update(item)">修改</span>
          <span @click="deleteDevice(item)">删除</span>
        </div>
      </div>
    </vue3SeamlessScroll>
  </div>
</template>
<script setup>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import moment from "moment";
import { defineEmits, ref, watchEffect } from "vue";
const emit = defineEmits(["handleUpdate", "handleDelete"]);
const props = defineProps({
  deviceInfos: Object,
});
console.log(props.deviceInfos);
const classOption = {
  step: 0.1, // 滚动速度
  hover: true, // 鼠标悬停是否停止滚动
  wheel: true, // 启用鼠标滚轮滚动
};
const { th, list } = props.deviceInfos;
const update = (item) => {
  emit("handleUpdate", item);
};
const deleteDevice = (item) => {
  emit("handleDelete", item);
};
</script>
<style lang="less" scoped>
.container {
  width: 650px;
  display: flex;
  height: 500px;
  flex-direction: column;
  background-color: white;
  .th_c {
    .th {
      display: flex;
      padding: 10px 0;
      background-color: #00201f;
      box-sizing: border-box;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      li {
        flex: 1;
      }
    }
  }
  .lists {
    //border:1px solid red;
    overflow-y: hidden;
    overflow-x: visible;
    .list {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid black;
      background-color: #00fff7;
      z-index: 1000;
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-weight: bold;
      }
      .option {
        box-sizing: border-box;

        display: flex;
        justify-content: center;
        align-items: center;
        //border: 1px solid red;
        span {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          //background-color: red;
        }
        span:first-child {
          background-color: red;
        }
        span:last-child {
          background-color: orange;
        }
      }
    }
  }
}
</style>
