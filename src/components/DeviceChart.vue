<template>
  <div
    class="device_chart"
    ref="chartDom"
    :style="{ width: '1100px', height: '650px' }"
  ></div>
</template>
<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const props = defineProps({
  deviceData: Object,
});
const deviceData = props.deviceData;
const series = [];
const hotData = [];
const coldData = [];
for (let item in deviceData.data) {
  hotData.push(deviceData.data[item].hotData);
  coldData.push(deviceData.data[item].coldData);
}
series.push({
  name: "热水量",
  type: "bar",
  stack: "a",
  data: hotData,
});
series.push({
  name: "冷水量",
  type: "bar",
  stack: "a",
  data: coldData,
});
// console.log(series);
const chartDom = ref(null);
const initOption = () => {
  const deviceChart = echarts.init(chartDom.value);
  const option = {
    title: {
      text: deviceData.name,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["热水量", "冷水量"],
      itemStyle: {
        // color: "white",
      },
      textStyle: {
        color: "white",
        fontSize: 16,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: deviceData.data.map((item) => item.month),
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };
  deviceChart.setOption(option);
};
onMounted(() => {
  initOption();
});
</script>
<style scoped lang="less">
.device-chart {
  //width: 970px;
  //height: 500px;
  //background-color: red;
  border: 1px solid red;
  color: white;
}
</style>
