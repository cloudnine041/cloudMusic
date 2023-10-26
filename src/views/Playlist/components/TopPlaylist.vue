<script setup>
import { computed } from 'vue'

const props = defineProps({
  playlistInfo: Object
})
const newCount = computed(() => {
  if (props.playlistInfo.playCount >= 10000)
    return (props.playlistInfo.playCount / 10000).toFixed(1) + '万'
})
</script>

<template>
  <div class="container">
    <img id="bgImg" :src="props.playlistInfo.coverImgUrl">
    <div id="menu">
      <div id="back" @click="$router.replace('/')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <div id="gedan">歌单</div>
      <div id="search">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
      <div id="list">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-whiteliebiao-copy"></use>
        </svg>
      </div>
    </div>
    <div id="middle">
      <div id="coverImg">
        <div id="playcount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-playcount"></use>
          </svg>
          <i>{{ newCount }}</i>
        </div>
        <img :src="props.playlistInfo.coverImgUrl">
      </div>
      <div id="maininfo">
        <div id="playname">{{ props.playlistInfo.name }}</div>
        <div id="creator">
          <img :src="playlistInfo.creator?.avatarUrl">
          <div>{{ props.playlistInfo.creator?.nickname }}</div>
        </div>
        <div id="desc">{{ props.playlistInfo.description }}</div>
      </div>
    </div>
    <div id="bottom">
      <div class="iconitem">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-message"></use>
          </svg>
        </div>
        <div class="icondesc">{{ props.playlistInfo.commentCount }}</div>
      </div>
      <div class="iconitem">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang2"></use>
          </svg>
        </div>
        <div class="icondesc">{{ props.playlistInfo.shareCount }}</div>
      </div>
      <div class="iconitem">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>
        <div class="icondesc">下载</div>
      </div>
      <div class="iconitem">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-show_duoxuan"></use>
          </svg>
        </div>
        <div class="icondesc">多选</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  #bgImg {
    height: 6rem;
    width: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(50px);
  }

  #menu {
    color: white;
    display: flex;
    height: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: .2rem;

    svg {
      fill: white;
    }

    #gedan {
      width: 50%;
    }
  }

  #middle {
    height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .2rem;

    #coverImg {
      height: 100%;
      position: relative;

      #playcount {
        position: absolute;
        right: .2rem;
        top: .1rem;
        color: white;
        display: flex;
        align-items: center;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: .2rem;

      }
    }

    #maininfo {
      height: 100%;
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      #playname {
        color: white;
        font-weight: 900;
      }

      #creator {
        display: flex;
        align-items: center;
        font-size: .25rem;

        img {
          height: .6rem;
          width: .6rem;
          border-radius: .3rem;
          margin-right: .2rem;
        }
      }

      #desc {
        font-size: .2rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }
  }

  #bottom {
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 .4rem;
    margin-top: .5rem;

    .iconitem {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icondesc {
        margin-top: .1rem;
      }
    }

  }
}
</style>
