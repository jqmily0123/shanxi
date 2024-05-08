<template>
  <div class="left-sider">
    <ul class="items">
      <li
        v-for="item in leftData"
        :key="item.id"
        class="item"
        @click="leftClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  leftData: Array,
  leftClick: Function,
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
    font-size: 20px;
    font-weight: bold;
    color: black;
    list-style: none;
    &:hover {
      background-color: orange;
      box-shadow: 5px 5px 10px #fff;
      color: white;
    }
  }
}
</style>
