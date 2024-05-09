<template>
  <div :style="bgStyle" class="device">
    <h1>{{ name }}</h1>
    <p>{{ count }}</p>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  device: Object,
});
const { bgIndex, name, count } = props.device;
const bgStyle = computed(() => ({
  background: `url(/src/assets/device/device${bgIndex}.svg) no-repeat`,
}));
</script>
<style scoped lang="less">
.device {
  width: 300px;
  height: 200px;
  list-style: none;
  position: relative;

  h1 {
    position: absolute;
    top: 8px;
    left: 40px;
  }

  p {
    font-size: 64px;
    font-weight: bold;
    position: absolute;
    top: 48px;
    left: 120px;
  }
}
</style>
