<template>
  <div class="container">
    <div class="top">
      <device v-for="item in deviceslist" :device="item"></device>
    </div>
    <a-range-picker v-model:value="date" @change="dateChange" />
    <device-info
      :device-infos="deviceInfos"
      @handle-delete="deleteDeviceInfo"
      @handle-update="OpenUpdateDeviceBox"
    ></device-info>
    <update-box
      v-if="updateData.showUpdate"
      @onCancelUpdateDevice="cancelUpdateDevice"
      @onUpdateDevice="updateDevice"
      :updateData="updateData"
    ></update-box>
  </div>
</template>
<script setup>
import DeviceInfo from "@/components/DeviceInfo.vue";
import Device from "@/components/Device.vue";
import { onMounted, reactive, ref } from "vue";
import UpdateBox from "@/components/UpdateBox.vue";
import moment from "moment";

const emit = defineEmits(["updateDevice", "deleteDevice"]);
const props = defineProps({
  devices: Object,
  deviceInfos: Object,
});
const mapResultToShow = (devices, deviceCount) => {
  devices[0].count = deviceCount.totalDevicesCount;
  devices[1].count = deviceCount.offlineDevicesCount;
  devices[2].count = deviceCount.onlineDevicesCount;
  devices[3].count = deviceCount.defaultDevicesCount;
  devices[4].count = deviceCount.warningDevicesCount;
};
const deviceslist = reactive([
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
    name: "故障设备数",
  },
  {
    bgIndex: 5,
    name: "预警设备数",
  },
]);
const { devices, deviceInfos } = props;
mapResultToShow(deviceslist, devices);
onMounted(() => {});

const updateData = ref({
  showUpdate: false,
  id: "",
  deviceName: "",
  deviceStatus: "",
  deviceMaintenanceStatus: "",
});
const OpenUpdateDeviceBox = (item) => {
  updateData.value.id = item.id;
  updateData.value.deviceName = item.deviceName;
  updateData.value.deviceStatus = item.deviceStatus;
  updateData.value.deviceMaintenanceStatus = item.deviceMaintenanceStatus;
  updateData.value.showUpdate = !updateData.value.showUpdate;
};
const cancelUpdateDevice = () => {
  updateData.value.showUpdate = !updateData.value.showUpdate;
};
const deleteDeviceInfo = async (item) => {
  emit("deleteDevice", item);
};
const updateDevice = (item) => {
  emit("updateDevice", item);
  updateData.value.showUpdate = false;
};
const date = ref();
const dateChange = async (value) => {
  emit("dateChange", value);
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .top {
    display: flex;
    //border: 1px solid red;
  }
  .ant-picker {
    width: 850px;
    height: 32px;
    background-color: coral;
    border: none;
  }
}
</style>
