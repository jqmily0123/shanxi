<template>
  <div
    class="device_chart"
    ref="chartDom"
    :style="{ width: '800px', height: '500px' }"
  ></div>
</template>
<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const props = defineProps({
  deviceData: Object,
});

const { title, list } = props.deviceData;

const series = [];
const hotData = [];
const coldData = [];
for (let item of list) {
  hotData.push(
    item.coldWaterConsume ||
      item.coldWaterPressure ||
      item.coldWaterEnergyConsumption ||
      item.coldWaterTemperature,
  );
  coldData.push(
    item.hotWaterConsume ||
      item.hotWaterPressure ||
      item.hotWaterEnergyConsumption ||
      item.hotWaterTemperature,
  );
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
const chartDom = ref(null);
const initOption = () => {
  const deviceChart = echarts.init(chartDom.value);
  const option = {
    title: {
      text: `${list[0].cityName} ${title}`,
      textStyle: {
        color: "white",
      },
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
      data: list.map((item) => item.month),
      axisLabel: {
        color: "white", // 设置文字颜色
        fontSize: 14, // 设置文字大小
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "white", // 设置文字颜色
        fontSize: 14, // 设置文字大小
      },
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
  width: 800px;
  //height: 500px;
  //background-color: red;
  border: 1px solid red;
  color: white;
}
</style>
