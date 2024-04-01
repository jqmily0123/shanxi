<template>
  <div class="login_register">
    <div class="login">
      <a-form class="form">
        <a-form-item :rules="[{ required: true, message: '请输入用户名' }]">
          <span>用户名</span>
          <a-input></a-input>
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: '请输入用户名' }]">
          <span>密码</span>
          <a-input></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">登录</a-button>
          <a-checkbox value="1" name="type">同意协议</a-checkbox>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="less">
.login_register {
  width: 100%;
  height: 100%;
  position: relative;
  .login {
    width: 450px;
    height: 400px;
    border: 1px solid red;
    background: url("@/assets/login.svg") no-repeat;
    position: absolute;
    top: 50%;
    left: 70%;
  }
  span {
    display: inline-block;
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    padding: 0 4px;
    color: #127070;
    font-size: 25px;
    border-radius: 5px 5px 0 0;
    border: 1px solid #127070;
  }
  .ant-form-item {
    width: 373px;
    height: 100px;
    //border: 1px solid pink;
    margin-left: 40px;
    margin-top: 40px;
    .ant-input {
      height: 56px;
      border-color: #127070;
      font-size: 25px;
      color: #fff;
      border-radius: 0;
      background-color: rgba(255, 255, 255, 0.12);
    }
    .ant-btn {
      width: 188px;
      height: 50px;
      background-color: rgba(18, 122, 122, 0.3);
      border: 1px solid rgba(8, 255, 255, 0.3);
      font-size: 18px;
    }
    :deep(.ant-checkbox) {
      width: 24px;
      height: 24px;
      margin-left: 50px;
      .ant-checkbox-input {
        width: 100%;
        height: 100%;
        opacity: 1;
      }
    }
    :deep(span) {
      color: #fff !important;
    }
  }
}
</style>
