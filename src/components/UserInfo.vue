<template>
  <div class="user-info" v-if="showUpdateBox">
    <canvas ref="canvas" width="50" height="50" class="canvas"></canvas>
    <h1>修改用户信息</h1>
    <a-form class="form">
      <a-form-item label="用户ID">
        <a-input v-model:value="userInfo.id"></a-input>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="userInfo.username"></a-input>
      </a-form-item>
      <a-form-item label="用户密码">
        <a-input v-model:value="userInfo.password"></a-input>
      </a-form-item>
      <a-form-item label="修改头像" class="change_av">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          :headers="headers"
          @change="handleChange"
          :before-upload="beforeUpload"
        >
          <a-button type="primary">上传头像</a-button>
        </a-upload>
      </a-form-item>
    </a-form>
    <div class="btn"><a-button @click="handleClick">确认修改</a-button></div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watchEffect, defineEmits } from "vue";

const props = defineProps({
  showUpdateBox: { type: Boolean, default: true },
  userInfo: Object,
});
const emit = defineEmits(["onUpdateUser"]);
const fileList = ref([]);
const headers = {
  authorization: "authorization-text",
};
const imageSrc = ref("");
const canvas = ref(null);
const handleChange = (info) => {
  const file = info.file.originFileObj;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    imageSrc.value = reader.result;
    console.log(reader.result);
    const canvasRef = canvas.value;
    const context = canvasRef.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // 开始绘制圆形裁剪区
    context.beginPath();
    context.arc(
      context.canvas.width / 2,
      context.canvas.height / 2,
      Math.min(context.canvas.width, context.canvas.height) / 2,
      0,
      Math.PI * 2,
      true,
    );
    context.closePath();
    context.clip();
    context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
  };
};
onMounted(() => {});
const userInfo = reactive({
  id: "",
  username: "",
  password: "",
  avatar: "",
});

const onCrop = (event) => {
  console.log(event.detail);
};
const beforeUpload = (file) => {};
watchEffect(() => {
  console.log(props.userInfo);
  const { id, username, password } = props.userInfo;
  userInfo.id = id;
  userInfo.username = username;
  userInfo.password = password;
  userInfo.avatar = imageSrc.value;
});

const handleClick = () => {
  emit("onUpdateUser", userInfo);
};
</script>
<style lang="less" scoped>
.user-info {
  margin-top: 80px;
  width: 400px;
  height: 370px;
  background-color: #32ed93;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 20px;
  border-radius: 10px;
  .canvas {
    position: absolute;
    bottom: 70px;
    left: 50%;
    z-index: 2;
  }
  .form {
    margin-top: 30px;
    .change_av {
      display: flex;
      align-items: center;
      border: 1px solid red;
      padding: 10px 0;
    }
  }
  h1 {
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
  .ant-form {
    :deep(.ant-form-item-label) {
      width: 80px;
    }
    :deep(.ant-upload-list-item) {
      display: none;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    .ant-btn {
      height: 40px;
      width: 200px;
      background-color: orange;
      :hover {
        color: white;
      }
    }
  }
}
</style>
