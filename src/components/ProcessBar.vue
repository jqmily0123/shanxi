<template>
  <div class="process_bar">
    <canvas class="canvas" ref="progressBar" width="250" height="14"></canvas>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const progressBar = ref(null);

const { progress } = defineProps({
  progress: Object,
});
const { power } = progress;

const calculateColor = (power) => {
  return power > 25 ? "#FF0000" : power > 20 ? "#00FFF7" : "#32ED93";
};

let canvas;
let ctx;
function drawProgressBar(
  progress,
  progressWidth,
  parallelogramWidth,
  canvas,
  ctx,
  x = 0,
  y = 0,
  offset = 10,
  //height是平行四边形的height
  height = 12,
  boundary = 3,
) {
  const divisions = Math.ceil(progressWidth / parallelogramWidth); // 包括间隔
  // 清除之前的绘制
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 绘制进度条背景
  ctx.fillStyle = "#0B2F36";
  ctx.fillRect(x, y, progressWidth, height);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + boundary, y + boundary);
  ctx.lineTo(x + progressWidth - boundary, y + boundary);
  ctx.lineTo(x + progressWidth + offset - boundary, y + height - boundary);
  ctx.lineTo(x + boundary, y + height - boundary);
  ctx.closePath();

  // console.log(height - boundary);
  ctx.clip();
  // ctx.strokeStyle = "red";
  // ctx.stroke();
  x -= 10;
  for (let i = 0; i <= divisions; i++) {
    // 根据进度填充平行四边形
    ctx.fillStyle = i / divisions < progress ? calculateColor(power) : "#eee"; // 动态设置填充颜色

    // 计算平行四边形的起始位置，考虑到前面添加的三角形
    let parallelogramStart = x + i * parallelogramWidth;
    // 绘制平行四边形
    ctx.beginPath();
    ctx.moveTo(parallelogramStart, y);
    ctx.lineTo(parallelogramStart + offset * 0.8, y); // 上边
    ctx.lineTo(
      parallelogramStart + parallelogramWidth + offset * 0.8,
      y + height,
    ); // 右边
    ctx.lineTo(parallelogramStart + parallelogramWidth, y + height); // 下边
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  x += 10;
  drawOuterLine(ctx, progressWidth, parallelogramWidth, x, y);
}
const drawOuterLine = (
  ctx,
  processWidth,
  parallelogramWidth,
  x = 0,
  y = 0,
  offset = 0.5,
  height = 12,
) => {
  ctx.beginPath();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#979797";
  ctx.moveTo(x + 1, y + 1);
  ctx.lineTo(x + processWidth + 1, y + 1);
  ctx.lineTo(x + processWidth + parallelogramWidth + 1, y + height);
  ctx.lineTo(x + 1, y + height);
  ctx.closePath();
  ctx.stroke();
};
//

onMounted(() => {
  canvas = progressBar.value;
  ctx = canvas.getContext("2d");
  if (!canvas.getContext) return; // 检查canvas支持
  // drawProcessLines(canvas, 6);
  drawProgressBar(power / 35, 220, 12, canvas, ctx);
});
</script>
<style scoped lang="less">
.process_bar {
  width: 225px;
  height: 14px;
  .canvas {
    position: relative;
  }
}
</style>
