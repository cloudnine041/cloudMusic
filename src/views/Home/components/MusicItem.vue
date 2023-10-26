<script setup>
import { computed } from 'vue'
const props = defineProps({
  pic: String,
  playlistInfo: String,
  playcount: Number
})
const newCount = computed(() => {
  if (props.playcount >= 10000)
    return (props.playcount / 10000).toFixed(1) + '万'
})
</script>

<template>
  <div id="musicItem">
    <div id="mainInfo">
      <img :src="props.pic">
      <p id="playlistInfo">{{ props.playlistInfo }}</p>
    </div>
    <div id="playcount">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-playcount"></use>
      </svg>
      <i>{{ newCount }}</i>
    </div>

  </div>
</template>

<style scoped lang="scss">
#musicItem {
  position: relative;

  #mainInfo {
    img {
      height: 2.5rem;
      border-radius: 0.2rem;
      margin-bottom: 0.2rem;
    }

    #playlistInfo {
      color: #555;
      font-size: 0.25rem;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }

  #playcount {
    position: absolute;
    right: .2rem;
    top: .1rem;
    color: white;
    display: flex;
    align-items: center;

    .icon {
      height: .35rem;
    }


  }
}
</style>
