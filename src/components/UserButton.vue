<template>
  <div class="user">
    <span class="avatar">
      <img src="@/assets/avatar.jpg" />
    </span>
    <span class="username">{{ user.username }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  user: Object,
});
console.log(props);
</script>
<style lang="less" scoped>
.user {
  width: 150px;
  height: 40px;
  background-color: orange;
  color: white;
  font-size: 20px;
  line-height: 40px;
  position: absolute;
  border-radius: 20px;
  right: 350px;
  top: 63px;
  display: flex;
  .avatar {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    //border: 1px solid red;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .username {
  }
}
</style>
