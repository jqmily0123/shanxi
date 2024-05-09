<template>
  <div class="container" v-show="updateData.showUpdate">
    <div class="title">设备状态信息修改</div>
    <a-form :model="deviceData">
      <a-form-item label="设备ID" name="deviceId">
        <a-input v-model:value="deviceData.id" disabled />
      </a-form-item>
      <a-form-item label="设备名称" name="deviceName">
        <a-input v-model:value="deviceData.deviceName" />
      </a-form-item>
      <a-form-item label="设备状态" name="deviceStatus">
        <a-select
          v-model:value="deviceData.deviceStatus"
          :options="deviceData.deviceStatusOptions"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="设备检修状态" name="deviceMaintenanceStatus">
        <a-select
          v-model:value="deviceData.deviceMaintenanceStatus"
          :options="deviceData.deviceMaintenanceStatusOptions"
        >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onUpdate">修改</a-button>
        <a-button type="primary" @click="onCancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive, defineEmits } from "vue";

const props = defineProps({
  updateData: Object,
});
// console.log(props.updateData);
const emit = defineEmits(["updateDeviceInfo", "cancel"]);

const { id, deviceName, deviceStatus, deviceMaintenanceStatus } =
  props.updateData;

const deviceData = reactive({
  id: id,
  deviceName: deviceName,
  deviceStatus: deviceStatus,
  deviceStatusOptions: [
    { label: "设备正常", value: "设备正常" },
    { label: "设备异常", value: "设备异常" },
  ],
  deviceMaintenanceStatus: deviceMaintenanceStatus,
  deviceMaintenanceStatusOptions: [
    { label: "设备未检修", value: "设备未检修" },
    { label: "设备正在检修", value: "设备正在检修" },
    { label: "设备检修完毕", value: "设备检修完毕" },
  ],
});
const onUpdate = () => {
  emit("updateDeviceInfo", [deviceData, props.updateData]);
};

const onCancel = () => {
  emit("cancel");
};
</script>
<style lang="less" scoped>
.container {
  background-color: #32ed93;
  width: 400px;
  height: 300px;
  padding: 15px 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    color: #fff;
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  ::v-deep(.ant-form-item) {
    .ant-form-item-label {
      width: 100px;
      label {
        color: #fff;
      }
    }
    //display: flex;
    .ant-form-item-control-input-content {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 40%;
      .ant-btn {
        width: 30%;
        background-color: orange;
      }
    }
  }
}
</style>
