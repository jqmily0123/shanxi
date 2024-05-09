<template>
  <div class="dial">
    <img src="@/assets/homeLeft3.svg" />
    <canvas ref="dial" width="130" height="130" class="canvas"></canvas>
    <div class="text" :style="{ color: color }">
      {{ pressure }}
      <br />
      Mpa
    </div>
  </div>
</template>
<script setup>
// const canvas = ref(null);
import { onMounted, ref } from "vue";
const dial = ref(null);
const props = defineProps({
  item: Object,
});
const { color, bgColor, pressure, maxPressure } = props.item;

const drawCircleLine = () => {
  const canvas = dial.value;
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 58;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 绘制圆形
  ctx.beginPath();
  // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  ctx.strokeStyle = bgColor;
  ctx.lineCap = "round";
  ctx.stroke();
  const proportion = 1 - pressure / maxPressure;
  // console.log(proportion);
  // 绘制刻度
  for (let i = 0; i < 40; i++) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = bgColor;
    ctx.lineCap = "round";
    const angle = ((i - 20) * (Math.PI * 2)) / 40; // 将刻度平分到圆上
    const lineLength = 10; // 刻度线的长度
    const lineStartX = centerX + (radius - lineLength) * Math.cos(angle);
    const lineStartY = centerY + (radius - lineLength) * Math.sin(angle);
    const lineEndX = centerX + radius * Math.cos(angle);
    const lineEndY = centerY + radius * Math.sin(angle);
    setTimeout(() => {
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(lineEndX, lineEndY);
      if (i > proportion * 40) {
        ctx.strokeStyle = color;
      }
      ctx.stroke();
      if (i === 39) {
        setTimeout(drawCircleLine, 100); // 延迟1秒后开始下一轮
      }
    }, i * 100);
  }
};
onMounted(() => {
  drawCircleLine();
});
</script>
<style scoped lang="less">
.dial {
  width: 175px;
  height: 175px;
  position: relative;
  //border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    position: absolute;
  }
  .canvas {
    position: absolute;
    z-index: 10;
  }
  .text {
    font-size: 25px;
    z-index: 11;
    text-align: center;
    //color: #fff;
  }
}
</style>
