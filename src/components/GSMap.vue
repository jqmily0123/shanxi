<template xmlns="http://www.w3.org/1999/html">
  <div class="map">
    <div class="map_title">
      <h1>各市统计概况</h1>
      <img src="@/assets/center_header.svg" />
    </div>
    <div ref="GSMap" style="width: 1650px; height: 1000px" class="gs_map"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import GS from "@/assets/620000.json";
import { onMounted, ref } from "vue";
const GSMap = ref(null);
const initMap = () => {
  const myChart = echarts.init(GSMap.value);
  echarts.registerMap("GS", GS);
  const option = {
    series: [
      {
        type: "map",
        map: "GS",
        itemStyle: {
          areaColor: "#FFD700",
          borderColor: "#404a59",
          borderWidth: 1,
        },
        label: {
          show: true,
          color: "#fff",
          fontSize: 25,
        },
      },
    ],
  };
  myChart.setOption(option);
};
onMounted(() => {
  initMap();
});
</script>
<style scoped lang="less">
.map {
  height: 100%;
  width: 1650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //position: relative;
  //border: 1px solid red;
  .map_title {
    height: 100px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: red;
    margin-top: 30px;
    h1,
    img {
      position: absolute;
    }
  }
  .gs_map {
    width: 100%;
    background: url("@/assets/center_map.svg") no-repeat center;
    //border: 1px solid red;
  }
}
</style>
