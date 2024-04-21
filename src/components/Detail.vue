<template>
  <div class="detail">
    <a-layout :style="layout">
      <a-layout-sider :style="siderStyle" width="15%">
        <left-sider :leftData="leftData"></left-sider>
      </a-layout-sider>
      <a-layout-content :style="contentStyle" class="content">
        <ul class="devices">
          <li class="device" v-for="device in devices">
            <device :device="device"></device>
          </li>
        </ul>
        <div class="device_main">
          <device-chart :deviceData="deviceData"></device-chart>
          <div class="device_info"></div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import GS from "@/assets/620000.json";

const route = useRoute();
import { v4 as uuidv4 } from "uuid";
import LeftSider from "@/components/LeftSider.vue";
import Device from "@/components/Device.vue";
import DeviceChart from "@/components/DeviceChart.vue";
import { pinyin } from "pinyin-pro";

const layout = {
  background: "none",
};
const siderStyle = {
  border: "1px solid #04abff",
  background: "none",
};
const contentStyle = {
  marginLeft: "20px",
};

// console.log(props.param)
const leftData = [
  {
    id: uuidv4(),
    name: "设备状态管理",
  },
  {
    id: uuidv4(),
    name: "故障报警管理",
  },
  {
    id: uuidv4(),
    name: "水量控制信息管理",
  },
  {
    id: uuidv4(),
    name: "用户数据管理",
  },
  {
    id: uuidv4(),
    name: "温度控制信息管理",
  },
  {
    id: uuidv4(),
    name: "压力控制信息管理",
  },
  {
    id: uuidv4(),
    name: "设备能耗信息管理",
  },
];
const devices = [
  {
    bgIndex: 1,
    name: "设备总数",
    count: "106",
  },
  {
    bgIndex: 2,
    name: "离线设备数",
    count: "106",
  },
  {
    bgIndex: 3,
    name: "运行设备数",
    count: "106",
  },
  {
    bgIndex: 4,
    name: "关闭设备数",
    count: "106",
  },
  {
    bgIndex: 5,
    name: "预警设备数",
    count: "106",
  },
];
const deviceDatas = [];
for (let item of GS.features) {
  const device = {
    id: uuidv4(),
    name: item.properties.name,
    chartTitle: "设备数据",
    pinyin: pinyin(item.properties.name, { toneType: "none" })
      .split(" ")
      .join(""),
    data: [],
  };
  for (let i = 0; i < 12; i++) {
    device.data.push({
      month: `${i + 1}月`,
      hotData: Math.floor(Math.random() * 1000),
      coldData: Math.floor(Math.random() * 1000),
    });
  }
  deviceDatas.push(device);
}
console.log(route.params.param);
const deviceData = deviceDatas.find(
  (item) => item.pinyin === route.params.param,
);
</script>
<style scoped lang="less">
.detail {
  margin-top: 20px;
  width: 90%;
  height: 80%;
  min-width: 2000px;
  min-height: 1000px;
  display: flex;
  //background: url("../assets/detailbg.svg") no-repeat center center;
  .content {
    //background-size: 3200px 950px;
    background: url("../assets/detailbg.svg") no-repeat center top;
    background-size: contain;
    border: 1px solid #04abff;
    //border: 1px solid red;
    color: white;
    //background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .devices {
      display: flex;
      padding: 0 40px;
      margin-top: 80px;
    }

    .device_main {
      width: 100%;
      padding: 0 100px;
      display: flex;

      .device_info {
        flex: 1;
        background-color: red;
      }
    }
  }
}
</style>
