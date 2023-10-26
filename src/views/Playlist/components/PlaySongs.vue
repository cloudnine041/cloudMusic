<script setup>
import { getSongListAPI } from '@/apis/playlist.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlaylistStore } from '@/stores/usePlaylistStore.js'
const route = useRoute()
const songList = ref([])
const reqData = {
  id: route.params.id
}
const getSongList = async () => {
  const res = await getSongListAPI(reqData)
  songList.value = res.songs
}
onMounted(() => getSongList())

const props = defineProps({
  subscribe: Number
})

const playListStore = usePlaylistStore()
const switchSong = (i) => {
  if (songList.value != playListStore.playList || i !== playListStore.curIndex)
    playListStore.changePlaystate(true)
  playListStore.changePlaylist(songList.value)
  playListStore.changeIndex(i)
  playListStore.resetLyricTime()
  playListStore.getLyrics()
}


</script>

<template>
  <div class="container">
    <div class="head">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <div class="playall">
        <span class="bofang">播放全部</span>
        <span class="allcount">(共{{ songList.length }}首)</span>
      </div>
      <div class="collect">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao1"></use>
        </svg>
        <span class="shou">
          收藏({{ props.subscribe }})
        </span>
      </div>

    </div>
    <div class="songlist">
      <div class="songitem" v-for="(item, i) in songList" :key="item.id" @click="switchSong(i)">
        <span>{{ i + 1 }}</span>
        <span class="songinfo">
          <i>{{ item.name }}</i>
          <span class="singer">
            <i v-for="secItem in item.ar" :key="secItem.id">{{ secItem.name }}&nbsp;</i>
          </span>
        </span>
        <span class="ricon">
          <span class="mvicon" v-if="item.mv">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shipinbofang"></use>
            </svg>
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-31liebiao"></use>
            </svg>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: white;
  padding: .2rem;
  border-top-left-radius: .2rem;
  border-top-right-radius: .2rem;

  .head {
    display: flex;
    height: 0.7rem;
    align-items: center;
    justify-content: space-between;

    .playall {
      width: 60%;
      display: flex;
      align-items: baseline;

      .allcount {
        font-size: .25rem;
        color: #999;
      }
    }

    .collect {
      background-color: red;
      height: 0.7rem;
      border-radius: 0.35rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      color: white;
      font-size: .25rem;

      .icon {
        height: .3rem;
      }

    }
  }

  .songlist {
    .songitem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .2rem 0;

      .songinfo {
        display: flex;
        flex-direction: column;
        width: 70%;
      }

      .singer {
        color: #999;
        font-size: .25rem;
      }
    }

    .ricon {
      width: 15%;
      display: flex;
      justify-content: flex-end;

      .mvicon {
        margin-right: .2rem;
      }
    }
  }
}
</style>
