<template>
  <div class="left-sider">
    <ul class="items">
      <li v-for="item in leftData" :key="item.id" class="item">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  leftData: Array,
});
</script>
<style scoped lang="less">
.items {
  width: 100%;
  height: 100%;
  padding: 20px;

  .item {
    height: 100%;
    background-color: #00fff7;
    border-radius: 25px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    list-style: none;
  }
}
</style>
