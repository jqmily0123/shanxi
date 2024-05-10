<template>
  <div class="container" v-show="updateData.showUpdate">
    <div class="title">设备状态信息修改</div>
    <a-form :model="data" v-if="data">
      <component
        v-for="item in data"
        :is="item.component"
        :key="item.id"
        :name="item.name"
        :label="item.label"
      >
        <component
          v-for="child in item.children"
          :key="child.id"
          :is="child.component"
          v-bind="child.props"
          v-model:value="child.data"
        ></component>
      </component>
      <a-form-item>
        <a-button type="primary" @click="onUpdate">修改</a-button>
        <a-button type="primary" @click="onCancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { getDeviceUpdate } from "@/config/config.js";

const emit = defineEmits(["onUpdateDevice", "onCancelUpdateDevice"]);

const props = defineProps({
  updateData: Object,
});

const onUpdate = () => {
  emit("onUpdateDevice", [changeData, props.updateData]);
};

const onCancel = () => {
  emit("onCancelUpdateDevice", [changeData, props.updateData]);
};
// const { id, deviceName, deviceStatus, deviceMaintenanceStatus } = props;
const changeData = ref({
  id: "",
  deviceName: "",
  deviceStatus: "",
  deviceMaintenanceStatus: "",
});

const data = ref({});
onMounted(() => {
  changeData.value.id = props.updateData.id || "";
  changeData.value.deviceName = props.updateData.deviceName || "";
  changeData.value.deviceStatus = props.updateData.deviceStatus || "";
  changeData.value.deviceMaintenanceStatus =
    props.updateData.deviceMaintenanceStatus || "";
});
watchEffect(() => {
  data.value = getDeviceUpdate(changeData);
});
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
