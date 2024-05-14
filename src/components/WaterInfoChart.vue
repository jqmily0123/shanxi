<template>
  <div class="container">
    <div
      class="line_chart"
      ref="lineDom"
      :style="{ width: '1500px', height: '700px' }"
    ></div>
    <div class="pie_charts">
      <h1 class="title">热水占比</h1>
      <div
        class="pie_chart"
        ref="pieDom1"
        :style="{ width: '400px', height: '300px' }"
      ></div>
      <h1 class="title">冷水占比</h1>
      <div
        class="pie_chart"
        ref="pieDom2"
        :style="{ width: '400px', height: '300px' }"
      ></div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { mapUtil, getChineseByPinyin } from "@/utils/index.js";
import { useRoute } from "vue-router";

const props = defineProps({
  waterInfoData: Object,
});
const route = useRoute();
const { title, list } = props.waterInfoData;
// console.log(title, list);
const series = [];
const hotData = [];
const coldData = [];
for (let item of list) {
  hotData.push(item["avgHotWaterConsume"]);
  coldData.push(item["avgColdConsume"]);
}
const getPieList = (list) => {
  return list.map((item, index) => {
    index = index + 1;
    if (index < 10) {
      index = `0${index}`;
    }
    return {
      name: `${index}月`,
      value: item,
    };
  });
};
series.push({
  name: "热水",
  type: "bar",
  stack: "a",
  data: hotData,
});
series.push({
  name: "冷水",
  type: "bar",
  stack: "a",
  data: coldData,
});
const lineDom = ref(null);
const pieDom1 = ref(null);
const pieDom2 = ref(null);
const initLineOption = () => {
  const lineChart = echarts.init(lineDom.value);
  const option = {
    title: {
      text: `${getChineseByPinyin(route.params.param)} ${title} ${mapUtil(title)}`,
      textStyle: {
        color: "white",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        var result = params[0].name + "<br>";
        params.forEach(function (item) {
          result +=
            item.marker +
            " " +
            item.seriesName +
            ": " +
            item.value +
            mapUtil(title) +
            "<br>";
        });
        return result;
      },
    },
    legend: {
      data: ["热水", "冷水"],
      itemStyle: {},
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
      data: list.map((item) => {
        return `${item.month}月`;
      }),
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
  lineChart.setOption(option);
};
const initPieOption = (ref, data, str) => {
  // console.log(data);
  const pieChart = echarts.init(ref.value);
  const option = {
    legend: {
      top: "bottom",
      itemStyle: {},
      textStyle: { color: "white" },
    },
    tooltip: {
      formatter: function (params) {
        console.log(params);
        let result = str + "<br>";
        result += `${params.marker}${params.value}`;
        return result;
      },
    },
    series: [
      {
        name: "pieChart",
        type: "pie",
        radius: [20, 80],
        center: ["50%", "40%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: getPieList(data),
      },
    ],
  };
  pieChart.setOption(option);
};
onMounted(() => {
  initLineOption();
  initPieOption(pieDom1, hotData, "热水");
  initPieOption(pieDom2, coldData, "冷水");
});
</script>
<style scoped lang="less">
.container {
  width: 100%;
  //border: 2px solid red;
  display: flex;
  .pie_charts {
    display: flex;
    flex-direction: column;
    h1 {
      //background-color: pink;
      text-align: center;
    }
  }
}
</style>
