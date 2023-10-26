<script setup>

</script>

<template>
  <div class="iconList">
    <div class="iconItem">
      <span class="bigIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuijian"></use>
        </svg>
      </span>
      <span class="iconInfo">每日推荐</span>
    </div>
    <div class="iconItem">
      <span class="bigIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhibo"></use>
        </svg>
      </span>
      <span class="iconInfo">私人FM</span>
    </div>
    <div class="iconItem">
      <span class="bigIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
      </span>
      <span class="iconInfo">歌单</span>
    </div>
    <div class="iconItem">
      <span class="bigIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-paihangbang1"></use>
        </svg>
      </span>
      <span class="iconInfo">排行榜</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iconList {
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;

  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      height: 0.75rem;
      width: 0.75rem;
    }

    .iconInfo {
      font-size: .2rem;
    }
  }
}
</style>
