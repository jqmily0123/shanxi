<template>
  <div class="water-temperature">
    <div class="gaugeChart" ref="gauge" :style="{ width, height }"></div>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
import * as echarts from "echarts";
const gauge = ref(null);
const props = defineProps({
  item: Object,
});
const { color, bgColor, height, width, min, max, temperature } = props.item;
// console.log(props);
const initOption = () => {
  // console.log(gauge.value);
  const gaugeInstance = echarts.init(gauge.value);
  const option = {
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: min,
        max: max,
        splitNumber: 10,
        itemStyle: {
          color: color,
        },
        progress: {
          show: true,
          width: 10,
        },
        pointer: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, bgColor]],
          },
        },
        axisTick: {
          show: true,
          distance: -27,
          splitNumber: 2,
          length: 14,
          lineStyle: {
            width: 3,
            color,
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          distance: -7,
          color: color,
          fontSize: 9,
        },
        anchor: {
          show: false,
        },
        title: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "40%"],
          fontSize: 15,
          fontWeight: "bolder",
          formatter: "{value} °C",
          color: color,
        },
        data: [
          {
            value: temperature,
          },
        ],
      },
    ],
  };
  gaugeInstance.setOption(option);
};
onMounted(() => {
  initOption();
});
</script>
<style scoped lang="less">
.gaugeChart {
  margin-bottom: -25px;
}
</style>
