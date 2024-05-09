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
        <div class="main">
          <div v-if="isUserAdmin">
            <UserAdmin
              :users="users"
              v-if="users"
              @onDeleteUser="deleteUser"
            ></UserAdmin>
          </div>
          <div class="device_main" v-else>
            <device-chart
              v-if="historyData"
              :deviceData="historyData"
              :key="deviceKey"
            ></device-chart>
            <device-info
              v-if="deviceInfos.list"
              class="device_info"
              :deviceInfos="deviceInfos"
              @handleUpdate="changeShowUpdate"
              @handleDelete="showDelete"
              :key="deviceInfoKey"
            ></device-info>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <update-box
      @cancel="onCancel"
      @updateDeviceInfo="onUpdateDeviceInfo"
      :updateData="updateData"
      :key="updateKey"
    ></update-box>
    <confirm-deletion
      :showDeletion="showDeletion"
      :deleteId="deleteId"
      @onDelete="deleteDeviceInfo"
      @onCancel="cancelDeleteDeviceInfo"
    ></confirm-deletion>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import DeviceInfo from "@/components/DeviceInfo.vue";
import UpdateBox from "@/components/UpdateBox.vue";
import ConfirmDeletion from "@/components/ConfirmDeletion.vue";
import { v4 as uuidv4 } from "uuid";
import LeftSider from "@/components/LeftSider.vue";
import Device from "@/components/Device.vue";
import DeviceChart from "@/components/DeviceChart.vue";
import UserAdmin from "@/components/UserAdmin.vue";
import { onMounted, reactive, ref } from "vue";
import {
  getCityWaterPressure,
  getCityEnergyConsumption,
  getCityWaterTemperature,
  getCityWaterConsume,
  getDeviceCount,
  getDeviceInfo,
  updateDeviceInfo,
  deleteDeviceInfoById,
  getUsers,
  deleteUserById,
} from "@/apis";

const route = useRoute();
const router = useRouter();
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
  {
    id: uuidv4(),
    name: "返回首页",
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

const updateKey = ref(0);
const changeShowUpdate = (item) => {
  updateData.id = item.id;
  updateData.deviceName = item.deviceName;
  updateData.deviceStatus = item.deviceStatus;
  updateData.deviceMaintenanceStatus = item.deviceMaintenanceStatus;
  updateData.showUpdate = !updateData.showUpdate;
  updateKey.value++;
};

const updateData = reactive({
  showUpdate: false,
  id: "",
  deviceName: "",
  deviceStatus: "",
  deviceMaintenanceStatus: "",
});

const showDeletion = ref(false);
const deleteId = ref();
const showDelete = (item) => {
  deleteId.value = item.id;
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
  if (item.name === "返回首页") {
    router.push("/home");
    return;
  }
  if (item.name !== "用户数据管理") {
    isUserAdmin.value = false;
    const param = route.params.param;
    historyData.value = await methedMap[item.name](param);
    deviceKey.value++;
  } else {
    isUserAdmin.value = true;
  }
};
const deviceCount = ref();

const mapResultToShow = (devices, deviceCount) => {
  devices[0].count = deviceCount.value.totalDevicesCount;
  devices[1].count = deviceCount.value.offlineDevicesCount;
  devices[2].count = deviceCount.value.onlineDevicesCount;
  devices[3].count = deviceCount.value.shutdownDevicesCount;
  devices[4].count = deviceCount.value.warningDevicesCount;
};

//处理更新逻辑
const deviceInfoKey = ref(0);
const onUpdateDeviceInfo = async (data) => {
  const [changeData, preData] = data;
  if (
    changeData.deviceName === preData.deviceName &&
    changeData.deviceStatus === preData.deviceStatus &&
    changeData.deviceMaintenanceStatus === preData.deviceMaintenanceStatus
  ) {
    return;
  }
  const res = await updateDeviceInfo(changeData);
  deviceInfos.list = await getDeviceInfo(param.value);
  deviceInfoKey.value++;
  updateData.showUpdate = false;
};
const onCancel = () => {
  updateData.showUpdate = false;
};

//处理删除逻辑
const deleteDeviceInfo = async (item) => {
  await deleteDeviceInfoById(item);
  deviceInfos.list = await getDeviceInfo(param.value);
  deviceInfoKey.value++;
  showDeletion.value = false;
};
const cancelDeleteDeviceInfo = () => {
  showDeletion.value = false;
};
const param = ref();
onMounted(async () => {
  param.value = route.params.param;
  historyData.value = await methedMap["用户数据管理"](param.value);
  deviceCount.value = await getDeviceCount();
  mapResultToShow(devices, deviceCount);
  deviceInfos.list = await getDeviceInfo(param.value);
  //获取用户数据
  users.value = await getUsers();
  // console.log(users.value);
});
const isUserAdmin = ref(true);
const users = ref();
const deleteUser = async (user) => {
  await deleteUserById(user.id);
  users.value = await getUsers();
};
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
    .main {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .device_main {
        width: 100%;
        padding: 0 50px;
        display: flex;

        .device_info {
          flex: 1;
        }
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
