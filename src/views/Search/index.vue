<script setup>
import { ref, onMounted } from 'vue'
import { getsearchListAPI } from '@/apis/search.js'
import { usePlaylistStore } from '@/stores/usePlaylistStore.js'
const historySinger = ref([])
const curSinger = ref('')
const addSinger = () => {
  if (curSinger.value !== '') {
    getSearchList(curSinger.value)
    if (historySinger.value.indexOf(curSinger.value) === -1) {
      historySinger.value.unshift(curSinger.value)
    }
    if (historySinger.value.length === 11) {
      historySinger.value.splice(10, 1)
    }
    localStorage.setItem('historySinger', JSON.stringify(historySinger.value))
    curSinger.value = ''
  }
}
onMounted(() => {
  if (JSON.parse(localStorage.getItem('historySinger') === null))
    historySinger.value = []
  else
    historySinger.value = JSON.parse(localStorage.getItem('historySinger'))
})
// 删除键点击处理
const delSinger = () => {
  localStorage.removeItem('historySinger')
  historySinger.value = []
}

// 获取搜索歌手的歌曲列表
const searchList = ref([])
const getSearchList = async (k) => {
  const res = await getsearchListAPI(k)
  searchList.value = res.result.songs
}

// 添加点击的搜索歌曲到store的playList列表
const playListStore = usePlaylistStore()
const addToPlayList = (item) => {
  let searchSong = {
    al: item.album,
    ar: item.artists,
    name: item.name,
    id: item.id
  }
  searchSong.al.picUrl = item.album.artist.img1v1Url
  if (item !== playListStore.playList[playListStore.playList.length - 1]) {
    playListStore.changePlaystate(true)
    playListStore.addSong(searchSong)
    playListStore.changeIndex(playListStore.playList.length - 1)
    playListStore.resetLyricTime()
    playListStore.getLyrics()
  }


}

</script>

<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.replace('/')">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input type="text" class="searchInput" v-model="curSinger" @keydown.enter="addSinger">
    </div>
    <div class="searchMid">
      <div class="midHead">
        <h2>历史</h2>
        <svg class="icon" aria-hidden="true" @click="delSinger">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>

      <i v-for="item in historySinger" :key="item" @click="getSearchList(item)">{{ item }}</i>
    </div>
    <div class="searchBtm">
      <div class="songitem" v-for="(item, i) in searchList" :key="item.id" @click="addToPlayList(item)">
        <span>{{ i + 1 }}</span>
        <span class="songinfo">
          <i>{{ item.name }}</i>
          <span class="singer">
            <i v-for="secItem in item.artists" :key="secItem.id">{{ secItem.name }}&nbsp;</i>
          </span>
        </span>
        <span class="ricon">
          <span class="mvicon" v-if="item.mvid">
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
.search {
  .searchTop {
    padding: 0 .2rem;
    height: 1.5rem;
    display: flex;
    align-items: center;

    .searchInput {
      margin-left: .3rem;
      padding: .1rem;
      width: 6rem;
      border: none;
      border-bottom: 1px #5e5e5e solid;
    }
  }

  .searchMid {
    padding: 0 .3rem;
    overflow: hidden;

    .midHead {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    i {
      float: left;
      height: .5rem;
      padding: 0 .2rem;
      margin-top: .1rem;
      margin-right: .1rem;
      background-color: rgb(245, 197, 109);
      border-radius: .5rem;
      line-height: .5rem;
    }
  }

  .searchBtm {
    margin-top: .5rem;
    padding: 0 .2rem 1.5rem;

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