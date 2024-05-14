<template>
  <div class="detail">
    <a-layout :style="layout">
      <a-layout-sider :style="siderStyle" width="15%">
        <left-sider :leftData="leftData" :left-click="leftChange"></left-sider>
      </a-layout-sider>
      <a-layout-content :style="contentStyle" class="content">
        <div class="main" v-if="showCom">
          <component
            :is="mainCom[curComIndex].component"
            v-bind="mainCom[curComIndex].props"
            @updateDevice="updateDevice"
            @deleteDevice="deleteDevice"
            @dateChange="changeDate"
            @onDeleteUser="deleteUser"
            @onUpdateUser="openUpdateUserBox"
            :key="comKey"
          ></component>
        </div>
      </a-layout-content>
      <UserInfo
        :showUpdateBox="showUpdateUser"
        :userInfo="user"
        @onUpdateUser="updateUsers"
      ></UserInfo>
    </a-layout>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import LeftSider from "@/components/LeftSider.vue";
import InfoAdmin from "@/view/InfoAdmin.vue";
import UserAdmin from "@/view/UserAdmin.vue";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { message } from "ant-design-vue";
import UserInfo from "@/components/UserInfo.vue";
import {
  getDeviceCount,
  updateDeviceInfo,
  deleteDeviceInfoById,
  getUsers,
  deleteUserById,
  updateUser,
  getUserByUsername,
  getDeviceInfoByCityAndByDate,
  getCityWaterAvgTemperature,
  getCityWaterAvgPressure,
  getCityAvgEnergyConsumption,
  getCityWaterAvgConsume,
} from "@/apis/index.js";
import { useStore } from "vuex";
import moment from "moment/moment.js";
import DevicePage from "@/view/DevicePage.vue";
const route = useRoute();
const router = useRouter();
const store = useStore();
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
    name: "设备信息管理",
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

const deviceInfos = ref({});
deviceInfos.value.th = [
  "设备编号",
  "设备名称",
  "设备状态",
  "设备检修状态",
  "时间",
];

const showDeletion = ref(false);
const deleteId = ref();
const showDelete = (item) => {
  deleteId.value = item.id;
  showDeletion.value = !showDeletion.value;
};

const methedMap = {
  用户数据管理: getUsers,
  水量控制信息管理: getCityWaterAvgConsume,
  温度控制信息管理: getCityWaterAvgTemperature,
  压力控制信息管理: getCityWaterAvgPressure,
  设备能耗信息管理: getCityAvgEnergyConsumption,
};

const deviceCount = ref();
const comKey = ref(0);
const updateDevice = async (data) => {
  const [changeData, preData] = data;
  if (
    changeData.deviceName === preData.deviceName &&
    changeData.deviceStatus === preData.deviceStatus &&
    changeData.deviceMaintenanceStatus === preData.deviceMaintenanceStatus
  ) {
    message.warn("您没有改变任何设备信息哦");
    return;
  }
  console.log(changeData);
  await updateDeviceInfo(changeData);
  message.success("设备信息修改成功");
  deviceInfos.value.list = await getDeviceInfoByCityAndByDate(
    param.value,
    CDate.value[0],
    CDate.value[1],
  );
  comKey.value++;
};

//处理删除逻辑
const deleteDevice = async (item) => {
  console.log(CDate.value, param.value);
  await deleteDeviceInfoById(item.id);
  deviceInfos.value.list = await getDeviceInfoByCityAndByDate(
    param.value,
    CDate.value[0],
    CDate.value[1],
  );
  comKey.value++;
};
const param = ref();
const defaultDate = ["2024-05-13", "2024-05-14"];
const mainCom = ref();
const showCom = ref(false);
onMounted(async () => {
  //获取用户信息
  users.value = await getUsers();
  param.value = route.params.param;
  //初始化CDate
  CDate.value = defaultDate;
  historyData.value.list = await methedMap["用户数据管理"](param.value);
  deviceCount.value = await getDeviceCount(param.value);
  deviceInfos.value.list = await getDeviceInfoByCityAndByDate(
    param.value,
    defaultDate[0],
    defaultDate[1],
  );
  mainCom.value = [
    {
      id: uuidv4(),
      name: "用户信息管理",
      component: UserAdmin,
      props: {
        users: users.value,
      },
    },
    {
      id: uuidv4(),
      name: "设备信息管理",
      component: DevicePage,
      props: {
        devices: deviceCount.value,
        deviceInfos: deviceInfos.value,
      },
    },
    {
      id: uuidv4(),
      name: "设备消耗管理",
      component: InfoAdmin,
      props: {
        waterInfoData: historyData.value,
      },
    },
  ];
  showCom.value = true;
});

//用户逻辑操作
const users = ref();
const deleteUser = async (user) => {
  await deleteUserById(user.id);
  users.value = await getUsers();
  message.warn("删除用户成功");
  comKey.value++;
};
const user = ref({});
const showUpdateUser = ref(false);
const openUpdateUserBox = async (u) => {
  showUpdateUser.value = !showUpdateUser.value;
  user.value.id = u.id;
  user.value.username = u.username;
  user.value.avatar = u.avatar;
};
const updateUsers = async (user) => {
  await updateUser(user);
  message.success("用户信息修改成功");
  showUpdateUser.value = false;
  const u = await getUserByUsername(user.username);
  //如果修改的是当前用户直接修改掉store里的user
  if (store.getters.user.username === u.username) {
    store.commit("addUser", u);
  }
};
const CDate = ref([]);
const changeDate = async (date) => {
  CDate.value = [];
  date.forEach((item) => {
    CDate.value.push(moment(item.toLocaleString()).format("YYYY-MM-DD"));
  });
  deviceInfos.value.list = await getDeviceInfoByCityAndByDate(
    param.value,
    CDate.value[0],
    CDate.value[1],
  );
  comKey.value++;
};
const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

const curComIndex = ref(0);
const historyData = ref({});

const leftChange = async (item) => {
  if (item.name === "返回首页") {
    await router.push("/home");
  } else if (item.name === "设备信息管理") {
    curComIndex.value = 1;
  } else if (item.name === "用户数据管理") {
    curComIndex.value = 0;
  } else {
    curComIndex.value = 2;
    const param = route.params.param;
    historyData.value.title = item.name;
    historyData.value.list = await methedMap[item.name](param);
    comKey.value++;
  }
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
      margin-top: 80px;
      .device_main {
        padding: 0 50px;
        display: flex;
        //flex-direction: column;
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
