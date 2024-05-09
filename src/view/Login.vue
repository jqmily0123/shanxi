<template>
  <div class="login_register">
    <div class="login" v-if="isLogin">
      <a-form class="form" :model="formState" autocomplete="off" ref="loginRef">
        <a-form-item name="username">
          <span>用户名</span>
          <a-input v-model:value="formState.username"></a-input>
        </a-form-item>
        <a-form-item name="password">
          <span>密码</span>
          <a-input-password
            v-model:value="formState.password"
          ></a-input-password>
        </a-form-item>
        <a-form-item class="btns">
          <a-button type="primary" html-type="submit" @click="handleLogin"
            >登录</a-button
          >
          <a-checkbox name="type" :checked="checked2" @change="change2"
            >同意协议</a-checkbox
          >
          <div class="text" @click="toggle">没有账号，立即注册</div>
        </a-form-item>
      </a-form>
    </div>
    <div class="register" v-else>
      <a-form class="form" :model="formState" :rules="rules" ref="registerRef">
        <a-form-item name="username">
          <span>用户名</span>
          <a-input v-model:value="formState.username"></a-input>
        </a-form-item>
        <a-form-item name="password">
          <span>密码</span>
          <a-input-password
            v-model:value="formState.password"
          ></a-input-password>
        </a-form-item>
        <a-form-item name="rePassword">
          <span>再次输入密码</span>
          <a-input-password
            v-model:value="formState.rePassword"
          ></a-input-password>
        </a-form-item>
        <a-form-item class="btns">
          <a-button type="primary" html-type="submit" @click="handleRegister"
            >注册</a-button
          >
          <a-checkbox name="type" :checked="checked" @change="change"
            >同意协议</a-checkbox
          >
          <div class="text" @click="toggle">已有账号，立即登录</div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";

const isLogin = ref(true);
import { message } from "ant-design-vue";
import request from "@/apis/request.js";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const formState = reactive({
  username: "",
  password: "",
  rePassword: "",
});
//定义校验规则
const validateUsername = async (_rule, value) => {
  const pattern = /^[\u4e00-\u9fa5A-Za-z0-9_]+$/;
  if (!value) {
    return Promise.reject("用户名不能为空");
  } else if (!pattern.test(value)) {
    return Promise.reject("用户名必须是字母，中文，下划线，数字");
  } else if (value.length < 2 || value.length > 10) {
    return Promise.reject("用户名必须为2-10位");
  } else {
    return Promise.resolve();
  }
};
const validatePassword = async (_rule, value) => {
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
  if (!value) {
    return Promise.reject("密码不能为空");
  } else if (!pattern.test(value)) {
    return Promise.reject("密码必须是小写字母或大写字母加数字组合");
  } else if (value.length < 6 || value.length > 20) {
    return Promise.reject("用户名必须为6-20位");
  } else {
    return Promise.resolve();
  }
};
const validateRePassword = (_rule, value) => {
  if (value !== formState.password) {
    return Promise.reject("两次密码不一致");
  } else return Promise.resolve();
};
const rules = {
  username: [
    {
      required: true,
      trigger: "change",
      validator: validateUsername,
    },
  ],
  password: [
    {
      required: true,
      trigger: "change",
      validator: validatePassword,
    },
  ],
  rePassword: [
    {
      required: true,
      trigger: "blur",
      validator: validateRePassword,
    },
  ],
};
const toggle = () => {
  isLogin.value = !isLogin.value;
};
const registerRef = ref(null);

//注册表单校验之同意协议校验
const checked = ref(false);
const change = () => {
  checked.value = !checked.value;
};
const handleRegister = async () => {
  if (checked.value === false) {
    message.warn("请同意协议");
    return;
  }
  try {
    await registerRef.value.validate();
    //给用户生成一个ID
    formState.id = uuidv4();
    const user = await request.post("/register", formState);
    console.log(user);
    message.success("注册成功");
    await router.push("/home");
  } catch (error) {
    message.warn("表单验证失败");
  }
};

//登陆表单校验之同意协议校验
const loginRef = ref(null);
const checked2 = ref(false);
const change2 = () => {
  checked2.value = !checked2.value;
};
const handleLogin = async () => {
  if (checked2.value === false) {
    message.warn("请同意协议");
    return;
  }
  try {
    await loginRef.value.validate();
    const res = await request.post("/login", formState);
    if (res.code === 200) {
      message.success("登陆成功");
      await router.push("/home");
      store.commit("addUser", res.data);
      console.log(store.getters.user);
    } else {
      message.warn("用户名或者密码不正确");
    }
  } catch (error) {
    console.log(error);
    message.warn("表单验证失败");
  }
};
</script>
<style scoped lang="less">
.login_register {
  width: 100%;
  height: 100%;
  position: relative;
  .login {
    width: 450px;
    height: 400px;
    background: url("@/assets/login.svg") no-repeat;
    position: absolute;
    top: 30%;
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
    height: 80px;
    //border: 1px solid pink;
    margin-left: 40px;
    margin-top: 40px;
    .ant-input,
    .ant-input-password {
      height: 56px;
      border-color: #127070;
      font-size: 25px;
      color: #fff;
      border-radius: 0;
      background-color: rgba(255, 255, 255, 0.12);
      position: relative;
      display: flex;
      align-items: center;
      :deep(.ant-input) {
        width: 90%;
        position: absolute;
        background: none;
        color: white;
      }
      :deep(.ant-input-suffix) {
        position: absolute;
        right: 3px;
      }
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

  .text {
    border-bottom: 2px solid white;
    text-align: center;
    color: #fff;
    margin-top: 20px;
  }
  .register {
    width: 450px;
    height: 500px;
    background: url("@/assets/register.svg") no-repeat;
    position: absolute;
    top: 30%;
    left: 70%;
  }
}
</style>
