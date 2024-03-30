<template>
  <div class="home">
    <Header></Header>
    <div class="main">
      <div class="left">
        <div v-for="item in leftData" :key="item.id" class="item">
          <HomeCardBox :item="item"></HomeCardBox>
        </div>
      </div>
      <div class="center">
        <GSMap></GSMap>
      </div>
      <div class="right">
        <div v-for="item in rightData" :key="item.id" class="item">
          <HomeCardBox :item="item"></HomeCardBox>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import HomeCardBox from "@/components/HomeCardBox.vue";
import GSMap from "@/components/GSMap.vue";
import { v4 as uuidv4 } from "uuid";

const getDeviceNumber = () => {
  return Math.floor(Math.random() * 100);
};
const getRandom = () => {
  return Math.random() - 0.5;
};
const deviceData = [];
const faultData = [];
//获取设备信息
const getDeviceData = () => {
  const deviceName = ["净水器", "增压器", "加热器", "过滤器", "电子阀门"];
  for (let i = 0; i < 50; i++) {
    const random = getRandom();
    deviceData.push({
      id: `00${i + 1}`,
      deviceName: `${
        deviceName[Math.floor(Math.random() * 5)]
      }#${getDeviceNumber()}`,
      equipmentStatus: random < -0.2 ? "故障" : "正常",
      equipmentMaintenanceStatus: random < -0.2 ? "维修中" : "正常",
    });
  }
};
// 获取设备故障信息
const getFaultData = () => {
  deviceData.filter((item) => {
    if (item.equipmentStatus === "故障") {
      faultData.push(item);
    }
  });
};
getDeviceData();
getFaultData();
const data = [
  {
    id: uuidv4(),
    title: "热冷水水量",
    children: [
      {
        id: uuidv4(),
        component: "WaterBall",
        waterVolume: 0.65,
        color: "#0EFF09",
        subTitle: "冷水水量",
      },
      {
        id: uuidv4(),
        component: "WaterBall",
        waterVolume: 0.85,
        color: "#9409FF",
        subTitle: "热水水量",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "冷热水温度",
    children: [
      {
        id: uuidv4(),
        component: "WaterTemperature",
        waterVolume: 0.65,
        subTitle: "冷水温度",
        width: "175px",
        height: "175px",
        min: "0",
        max: "100",
        color: "#51F617",
        bgColor: "#024B1F",
        temperature: "25",
      },
      {
        id: uuidv4(),
        component: "WaterTemperature",
        waterVolume: 0.85,
        subTitle: "热水温度",
        width: "175px",
        height: "175px",
        min: "0",
        max: "100",
        color: "#9517F6",
        bgColor: "#1C024B",
        temperature: "85",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "冷热水压力",
    children: [
      {
        id: uuidv4(),
        component: "CircleProcess",
        subTitle: "冷水压力",
        pressure: "3",
        maxPressure: "6",
        color: "#0EFF09",
        bgColor: "#979797",
      },
      {
        id: uuidv4(),
        component: "CircleProcess",
        subTitle: "热水压力",
        pressure: "2",
        maxPressure: "6",
        color: "#9409FF",
        bgColor: "#979797",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "供电设备能耗",
    children: [
      {
        id: uuidv4(),
        component: "EnergyConsumption",
        color: "#0EFF09",
        bgColor: "#979797",
        childData: [
          {
            id: uuidv4(),
            equipment: "净水器",
            consumption: 30,
          },
          {
            id: uuidv4(),
            equipment: "增压器",
            consumption: 28,
          },
          {
            id: uuidv4(),
            equipment: "加热器",
            consumption: 24,
          },
          {
            id: uuidv4(),
            equipment: "过滤器",
            consumption: 22,
          },
          {
            id: uuidv4(),
            equipment: "电子阀门",
            consumption: 20,
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    title: "设备状态数据",
    children: [
      {
        id: uuidv4(),
        component: "DeviceFault",
        childData: deviceData,
      },
    ],
  },
  {
    id: uuidv4(),
    title: "故障报警数据",
    children: [
      {
        id: uuidv4(),
        component: "DeviceFault",
        childData: faultData,
      },
    ],
  },
].map((item) => {
  return {
    ...item,
    component: "HomeCardBox",
  };
});
// console.log(data);

const leftData = data.slice(0, 3);
const rightData = data.slice(3, data.length);
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background: url("@/assets/背景.png") no-repeat;
  background-size: 100% 100%;
  //display: flex;
  //flex-direction: column;
  .main {
    display: flex;
    .left {
      width: 473px;
      height: 100%;
      //background-color: green;
    }
    .right {
      width: 473px;
      height: 100%;
      //background-color: yellow;
    }
    .center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid red;
    }
  }
}
</style>
