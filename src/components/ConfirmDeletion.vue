<template>
  <div class="container" v-show="showDeletion">
    <div class="title">您确认删除该条记录吗</div>
    <div class="btns">
      <a-button @click="handelDeletion">删除</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  showDeletion: Boolean,
  handleCancel: Function,
});
const handelDeletion = () => {
  props.handleCancel();
};
</script>
<style lang="less" scoped>
.container {
  background-color: #32ed93;
  width: 250px;
  height: 100px;
  padding: 15px 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    color: #fff;
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .btns {
    //border: 1px solid red;
    display: flex;
    justify-content: space-evenly;
    .ant-btn {
      background-color: orange;
    }
  }
}
</style>
