<script setup>
import { usePlaylistStore } from '@/stores/usePlaylistStore.js'
import { ref, watch } from 'vue'
import PlayDetail from '@/views/PlayDetail/index.vue'
const playListStore = usePlaylistStore()

const audioRef = ref(null)
const playPause = () => {
  if (playListStore.curPlaystate === false) {
    audioRef.value.play()
    playListStore.changePlaystate(true)
  } else {
    audioRef.value.pause()
    playListStore.changePlaystate(false)
  }
}

watch([() => playListStore.playList, () => playListStore.curIndex], () => {
  audioRef.value.autoplay = true
  playListStore.changeDuration(audioRef.value.duration)
})

let timer;
const runTime = () => {
  timer = setInterval(() => {
    playListStore.changeLyricTime(audioRef.value.currentTime)
  }, 500)
}
watch(() => playListStore.curPlaystate, (newVal) => {
  if (newVal === true) {
    runTime()
  }
  else {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="container">
    <div class="leftmid" @click="playListStore.changePopup">
      <div class="footerleft">
        <img :src="playListStore.playList[playListStore.curIndex].al.picUrl">
      </div>
      <div class="footermid">
        <p class="songname">{{ playListStore.playList[playListStore.curIndex].name }}</p>
        <p>横滑切换上下首哦</p>
      </div>
    </div>

    <div class="footerright">
      <i class="licon" @click="playPause">
        <svg class="icon" aria-hidden="true" v-if="playListStore.curPlaystate">
          <use xlink:href="#icon-zanting1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else>
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <audio ref="audioRef"
          :src="`https://music.163.com/song/media/outer/url?id=${playListStore.playList[playListStore.curIndex].id}.mp3`"></audio>
      </i>
      <i>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </i>
    </div>
    <van-popup v-model:show="playListStore.showPopup" position="right" :style="{ width: '100%', height: '100%' }">
      <PlayDetail :play-ctrl="playPause" />
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem;
  border-top: #555 .01rem solid;

  .leftmid {
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;

    .footerleft {
      img {
        height: 1rem;
        width: 1rem;
        border-radius: 1rem;
      }
    }

    .footermid {
      width: 75%;
      display: flex;
      flex-direction: column;
      color: #555;

      .songname {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }
  }


  .licon {
    margin-right: .2rem;
  }


}
</style>
