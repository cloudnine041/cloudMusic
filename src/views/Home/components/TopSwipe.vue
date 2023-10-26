<script setup>
import { ref, onMounted } from 'vue'
import { getBannerListAPI } from '@/apis/home.js'
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerListAPI()
  bannerList.value = res.banners
}
onMounted(() => getBannerList())

</script>

<template>
  <van-swipe v-if="bannerList" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in bannerList" :key="item">
      <img :src="item.pic">
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped lang="scss">
.my-swipe {
  height: 3rem;
  width: 100%;
  border-radius: .2rem;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
