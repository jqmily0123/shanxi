<template>
  <div class="detail">
    <a-layout :style="layout">
      <a-layout-sider :style="siderStyle" width="15%">
        <left-sider :leftData="leftData" :left-click="leftChange"></left-sider>
      </a-layout-sider>
      <a-layout-content :style="contentStyle" class="content">
        <ul class="devices" v-if="deviceCount">
          <li class="device" v-for="device in devices">
            <device :device="device"></device>
          </li>
        </ul>
        <div class="device_main" v-if="historyData">
          <device-chart
            :deviceData="historyData"
            :key="deviceKey"
          ></device-chart>
          <device-info
            class="device_info"
            :deviceInfos="deviceInfos"
            :handleShow="changeShowUpdate"
            :handleCancel="changeShowDeletion"
          ></device-info>
        </div>
      </a-layout-content>
    </a-layout>
    <update-box
      :handleShow="changeShowUpdate"
      :updateData="updateData"
    ></update-box>
    <confirm-deletion
      :handleCancel="changeShowDeletion"
      :showDeletion="showDeletion"
    ></confirm-deletion>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import DeviceInfo from "@/components/DeviceInfo.vue";
import UpdateBox from "@/components/updateBox.vue";
import ConfirmDeletion from "@/components/ConfirmDeletion.vue";
import { v4 as uuidv4 } from "uuid";
import LeftSider from "@/components/LeftSider.vue";
import Device from "@/components/Device.vue";
import DeviceChart from "@/components/DeviceChart.vue";
import { onMounted, reactive, ref } from "vue";
import {
  getCityWaterPressure,
  getCityEnergyConsumption,
  getCityWaterTemperature,
  getCityWaterConsume,
  getDeviceCount,
  getDeviceInfo,
} from "@/apis";

const route = useRoute();
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
const leftData = [
  {
    id: uuidv4(),
    name: "用户数据管理",
  },
  {
    id: uuidv4(),
    name: "水量控制信息管理",
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
const devices = reactive([
  {
    bgIndex: 1,
    name: "设备总数",
  },
  {
    bgIndex: 2,
    name: "离线设备数",
  },
  {
    bgIndex: 3,
    name: "运行设备数",
  },
  {
    bgIndex: 4,
    name: "关闭设备数",
  },
  {
    bgIndex: 5,
    name: "预警设备数",
  },
]);

const deviceInfos = reactive({});
deviceInfos.th = ["设备编号", "设备名称", "设备状态", "设备检修状态"];
deviceInfos.list = [];

const showUpdate = ref(false);
const changeShowUpdate = () => {
  showUpdate.value = !showUpdate.value;
};
const updateData = ref({
  showUpdate,
});

const showDeletion = ref(false);
const changeShowDeletion = () => {
  showDeletion.value = !showDeletion.value;
};

const methedMap = {
  用户数据管理: getCityEnergyConsumption,
  水量控制信息管理: getCityWaterConsume,
  温度控制信息管理: getCityWaterTemperature,
  压力控制信息管理: getCityWaterPressure,
  设备能耗信息管理: getCityEnergyConsumption,
};

const historyData = ref();
const deviceKey = ref(0);
const leftChange = async (item) => {
  const param = route.params.param;
  historyData.value = await methedMap[item.name](param);
  deviceKey.value++;
};
const deviceCount = ref();
// for (let i = 0; i < 100; i++) {
//   const deviceInfo = {
//     id: uuidv4().slice(0, 8),
//     deviceName: "净水器",
//     deviceStatus: "正常",
//     deviceMaintenanceStatus: "正在检修",
//   };
//   deviceInfos.list.push(deviceInfo);
// }
const mapResultToShow = (devices, deviceCount) => {
  devices[0].count = deviceCount.value.totalDevicesCount;
  devices[1].count = deviceCount.value.offlineDevicesCount;
  devices[2].count = deviceCount.value.onlineDevicesCount;
  devices[3].count = deviceCount.value.shutdownDevicesCount;
  devices[4].count = deviceCount.value.warningDevicesCount;
};
onMounted(async () => {
  const param = route.params.param;
  historyData.value = await methedMap["用户数据管理"](param);
  deviceCount.value = await getDeviceCount();
  mapResultToShow(devices, deviceCount);
  deviceInfos.list = await getDeviceInfo(param);
  console.log(deviceInfos);
});
</script>
<style scoped lang="less">
.detail {
  width: 90%;
  height: 80%;
  min-width: 1900px;
  min-height: 1000px;
  display: flex;
  position: relative;
  top: 20px;
  .content {
    background: url("../assets/detailbg.svg") no-repeat center top;
    background-size: contain;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    .devices {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 40px;
      margin-top: 80px;
      //border:1px solid red;
    }

    .device_main {
      width: 100%;
      padding: 0 100px;
      display: flex;

      .device_info {
        flex: 1;
      }
    }
  }
  :deep(.ant-layout) {
    .ant-layout-sider {
      border: none !important;
    }
  }
}
</style>
