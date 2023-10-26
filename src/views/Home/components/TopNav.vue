<script setup>
</script>

<template>
  <div class="container">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topCenter">
      <span @click="$router.push('/userinfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight" @click="$router.push('/search')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: .8rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topCenter {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .active {
      font-weight: 900;
    }
  }
}
</style>
