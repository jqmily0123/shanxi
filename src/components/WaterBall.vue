<template>
  <div class="water-ball">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { onMounted, reactive, ref, watch } from "vue";
const props = defineProps({
  item: Object,
});
const { waterVolume, color } = props.item;

const chartRef = ref(null);
const initEchart = () => {
  const chartInstance = echarts.init(chartRef.value);
  const option = {
    series: [
      {
        type: "liquidFill",
        data: [
          {
            // 水球图数据
            name: "score", // 水球图数据名称
            direction: "right", // 水球图数据方向
            value: waterVolume, // 水球图数据值
            itemStyle: {
              // 水球图数据样式
              opacity: 1, // 水球图数据透明度
              normal: {
                // 水球图数据正常样式
                color: color, // 水球图数据正常样式颜色
              },
            },
          },
        ],
        radius: "95%",
        outline: {
          show: true, // 显示外边框
          borderDistance: 2, // 外边框与水球图的距离
          itemStyle: {
            borderWidth: 5, // 外边框宽度
            borderColor: "#f0f0f0", // 外边框颜色
          },
        },
        backgroundStyle: {
          color: "#87CEEB",
        },
        label: {
          normal: {
            formatter: (param) => {
              return (param.value * 100).toFixed(0) + "%";
            },
            textStyle: {
              fontSize: 20,
              color: "#fff",
            },
          },
        },
      },
    ],
  };
  chartInstance.setOption(option);
};
onMounted(() => {
  initEchart();
});
</script>
<style scoped lang="less">
.water-ball {
  width: 155px;
  height: 155px;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  //border: 1px solid red;
  margin-top: 20px;
  margin-bottom: 20px;
  .chart {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 13px;
    //background-color: red;
  }
}
</style>
