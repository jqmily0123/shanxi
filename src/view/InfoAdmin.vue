<template>
  <div class="container">
    <water-info-chart :waterInfoData="waterInfoData"></water-info-chart>
  </div>
</template>
<script setup>
import WaterInfoChart from "@/components/WaterInfoChart.vue";
const props = defineProps({
  waterInfoData: Object,
});
</script>
<style lang="less">
.container {
  width: 1500px;
}
</style>
