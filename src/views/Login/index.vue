<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.js'
const userStore = useUserStore()
const phone = ref('19802615260')
const password = ref('wsblsy99')
const doLogin = () => {
  userStore.getUser(phone.value, password.value)
}
</script>

<template>
  <div class="login">
    <van-cell-group inset>
      <van-field v-model="phone" required label="手机号" placeholder="请输入手机号" />
      <van-field v-model="password" type="password" required label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <van-button class="loginBtn" round color="red" @click="doLogin">登录</van-button>

  </div>
</template>

<style scoped lang="scss">
.login {
  height: 5rem;
  background-image: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url('@/assets/images/imgError.jpeg');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loginBtn {
    margin-top: .5rem;
    width: 2rem;
    font-weight: 900;
  }
}
</style>