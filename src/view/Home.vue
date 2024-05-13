<template>
  <div class="home">
    <div class="main" v-if="rdata">
      <div class="left" :key="leftKey">
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
import HomeCardBox from "@/components/HomeCardBox.vue";
import GSMap from "@/components/GSMap.vue";
import { v4 as uuidv4 } from "uuid";
import { onMounted, ref } from "vue";
import { getHomeData } from "@/apis/index.js";

const deviceData = [];

const getFaultData = (deviceInfos) => {
  return deviceInfos.filter((item) => {
    if (item.deviceStatus === "故障") {
      return item;
    }
  });
};

// 哪个子组件 绑定的哪个值没更新

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
        pressure: 0,
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
        childData: [],
      },
    ],
  },
].map((item) => {
  return {
    ...item,
    component: "HomeCardBox",
  };
});
// const leftKey = ref(0);
const homeData = ref(data);
const updateHomeData = (deviceInfos, homePageS, powerConsumes) => {
  homeData.value[0].children[0].waterVolume = homePageS.coldWaterVolume;
  homeData.value[0].children[1].waterVolume = homePageS.hotWaterVolume;
  homeData.value[1].children[0].temperature = homePageS.coldWaterTemperature;
  homeData.value[1].children[1].temperature = homePageS.hotWaterTemperature;
  homeData.value[2].children[0].pressure = homePageS.coldWaterPressure;
  homeData.value[2].children[1].pressure = homePageS.hotWaterPressure;
  homeData.value[3].children[0].childData = powerConsumes;
  homeData.value[4].children[0].childData = deviceInfos;
  homeData.value[5].children[0].childData = getFaultData(deviceInfos);
};

let rdata = ref();
let leftData = ref();
let rightData = ref();
const leftKey = ref(0);
//核心跟新代码在这里 leftData.value这个甩给了
async function fetchData() {
  try {
    rdata.value = await getHomeData();
    const { deviceInfos, homePageS, powerConsumes } = rdata.value;
    updateHomeData(deviceInfos, homePageS, powerConsumes);
    leftData.value = homeData.value.slice(0, 3);
    rightData.value = homeData.value.slice(3, homeData.value.length);
    leftKey.value++;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }
}

onMounted(async () => {
  await fetchData();
  setInterval(fetchData, 5000);
});
</script>
<style scoped lang="less">
.home {
  //display: flex;
  //flex-direction: column;
  position: relative;
  top: 20px;
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
    }
  }
}
</style>
