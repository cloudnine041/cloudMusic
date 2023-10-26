<script setup>
import { getRecPlaylistAPI } from '@/apis/home.js'
import { ref, onMounted } from 'vue'

import MusicItem from './MusicItem.vue'


const recPlaylist = ref([])
const getRecPlaylist = async () => {
  const res = await getRecPlaylistAPI()
  recPlaylist.value = res.result
}
onMounted(() => getRecPlaylist())


import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
</script>

<template>
  <div id="musiclist" v-if="recPlaylist">
    <div id="headlist">
      <div id="find">发现好歌单</div>
      <div id="more">查看更多</div>
    </div>
    <van-swipe :loop="false" :width="width / 2.9" :show-indicators="false">
      <van-swipe-item class="listitem" v-for="item in recPlaylist" :key="item.id">
        <RouterLink :to="{ path: `/playlist/${item.id}` }">
          <MusicItem :pic="item.picUrl" :playlist-info="item.name" :playcount="item.playCount" />
        </RouterLink>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="scss">
#musiclist {
  margin-top: 0.2rem;
  height: 4.5rem;

  #headlist {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .2rem;

    #find {
      font-weight: 900;
    }

    #more {
      font-size: 0.2rem;
      text-align: center;
      width: 1.4rem;
      color: #333;
      border: .02rem solid #888;
      border-radius: 0.3rem;
      padding: 0.1rem;
    }
  }

  .listitem {
    padding: 0 .1rem;

  }
}
</style>
