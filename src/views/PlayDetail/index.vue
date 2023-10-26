<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import { usePlaylistStore } from '@/stores/usePlaylistStore.js'
import { ref, watch } from 'vue'
const playListStore = usePlaylistStore()


const props = defineProps({
  playCtrl: Function
})

const lyricShow = ref(false)

const lyricRef = ref(null)
watch(() => playListStore.lyricTime, () => {
  if (document.querySelector('.activeLyric')?.offsetTop > 300) {
    lyricRef.value.scrollTop = document.querySelector('.activeLyric')?.offsetTop - 300
  }
})

const goPlay = (num) => {
  if (playListStore.curIndex === 0 && num === -1) {
    playListStore.changeIndex(playListStore.playList.length - 1)
  } else if (playListStore.curIndex === playListStore.playList.length - 1 && num === 1) {
    playListStore.changeIndex(0)
  } else {
    playListStore.changeIndex(num + playListStore.curIndex)
  }
}

</script>

<template>
  <div class="playdetail">
    <img class="bgImg" :src="playListStore.playList[playListStore.curIndex].al.picUrl">
    <div class="detailTop">
      <span @click="playListStore.changePopup">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>

      </span>

      <span class="detailTopmid">
        <p class="detailName">
          <Vue3Marquee>
            {{ playListStore.playList[playListStore.curIndex].name }}
          </Vue3Marquee>
        </p>
        <p>
          <i v-for="item in playListStore.playList[playListStore.curIndex].ar" :key="item.id">
            {{ item.name }}&nbsp;
          </i>
          <i>
            <svg class="icon" aria-hidden="true" style="height: .25rem; marginLeft: -.1rem">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </i>
        </p>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang2"></use>
        </svg>
      </span>
    </div>
    <div class="detailMid" @click="lyricShow = !lyricShow">
      <div class="midLyric" ref="lyricRef" v-if="lyricShow">
        <p class="eachLyric"
          :class="{ 'activeLyric': playListStore.lyricTime >= item.curTime && playListStore.lyricTime < item.nextTime }"
          v-for="item in playListStore.lyricInfo" :key="item">
          {{ item.lyric }}
        </p>
      </div>
      <div class="midPic" v-else>
        <img class="cd" src="@/assets/images/cd.png">
        <img class="needle" :class="[playListStore.curPlaystate ? 'needlePlay' : 'needlePause']"
          src="@/assets/images/needle.png">
        <img class="album" :class="[playListStore.curPlaystate ? 'albumRotate' : 'albumPause']"
          :src="playListStore.playList[playListStore.curIndex].al.picUrl">
        <div class="midIcons">
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin-copy"></use>
            </svg>
          </i>
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai"></use>
            </svg>
          </i>
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
          </i>
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-message"></use>
            </svg>
          </i>
          <i>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao--copy"></use>
            </svg>
          </i>
        </div>
      </div>

    </div>
    <div class="detailBtm">
      <div class="playBlock">
        <input class="playInput" type="range" min="0" :max="playListStore.duration" v-model="playListStore.lyricTime"
          step="0.05">
      </div>
      <div class="btmPlay">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-repeat2-copy"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <div @click="playCtrl">
          <svg class="icon bofang" aria-hidden="true" v-if="playListStore.curPlaystate">
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon bofang" aria-hidden="true" v-else>
            <use xlink:href="#icon-bofang-copy"></use>
          </svg>
        </div>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">
.playdetail {

  .detailTop {
    padding: .2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .detailTopmid {
      width: 70%;

      .detailName {
        width: 70%;
      }
    }

  }

  .detailMid {
    height: 10rem;

    .midLyric {
      height: 100%;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      scroll-behavior: smooth;

      .eachLyric {
        padding: .1rem .2rem;
        text-align: center;

        &.activeLyric {
          font-size: .5rem;
        }
      }
    }

    .midPic {
      position: relative;
      height: 100%;

      .midIcons {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: .3rem;
        display: flex;
        justify-content: space-between;

        .icon {
          height: .6rem;
          width: .6rem;
          fill: #e6e6e6;
        }
      }

      .cd {
        width: 5rem;
        position: absolute;
        left: 1.25rem;
        top: 50%;
        margin-top: -3.25rem;

        z-index: 3;
      }

      .needle {
        position: absolute;
        transition: all 1s;
        top: 0;
        left: 3.6rem;
        z-index: 4;
        height: 3rem;
        transform-origin: 0 0;


        &.needlePlay {
          transform: rotate(1deg);
        }

        &.needlePause {
          transform: rotate(-25deg);
        }
      }

      .album {
        width: 3.5rem;
        border-radius: 3rem;
        position: absolute;
        left: 2rem;
        top: 50%;
        margin-top: -2.5rem;
        z-index: 2;
        animation: infRotate 10s infinite linear;
      }

      .albumRotate {
        animation-play-state: running;
      }

      .albumPause {
        animation-play-state: paused;
      }

      @keyframes infRotate {
        0% {
          transform: rotateZ(0);
        }

        100% {
          transform: rotateZ(360deg);
        }
      }
    }


  }

  .detailBtm {
    .playBlock {
      .playInput {
        width: 100%;
      }
    }

    .btmPlay {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .3rem;

      .icon {
        height: .5rem;
        width: .5rem;
        fill: #e6e6e6;
      }

      .bofang {
        height: 1rem;
        width: 1rem;
      }
    }

  }

  .bgImg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(70px);
  }
}
</style>
