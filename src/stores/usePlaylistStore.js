import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLyricsAPI } from '@/apis/playlist.js'


export const usePlaylistStore = defineStore('playListStore', () => {
  const playList = ref([{
    al: {
      id: 173194329,
      name: "从未",
      picUrl: "https://p2.music.126.net/TgCQEFCdE1-78kW7z3xlCw==/109951168864426626.jpg",
    },
    ar: [{
      id: 12448205,
      name: "永彬Ryan.B"
    }],
    name: "从未",
    id: 2076104785
  }])
  const curIndex = ref(0)
  const curPlaystate = ref(false)
  const showPopup = ref(false)
  const lyricInfo = ref([])
  const lyricTime = ref(0)
  const duration = ref(0)

  const changePlaystate = (state) => {
    curPlaystate.value = state
  }

  const changePlaylist = (curlist) => {
    playList.value = curlist.map((item) => {
      return {
        al: item.al,
        ar: item.ar,
        name: item.name,
        id: item.id
      }
    })
  }
  const changeIndex = (i) => curIndex.value = i

  const changePopup = () => showPopup.value = !showPopup.value

  const getLyrics = async () => {
    const res = await getLyricsAPI(playList.value[curIndex.value].id)
    // 分割时间和歌词
    lyricInfo.value = res.lrc.lyric.split(/[(\n\r)\n\r]+/).map((item) => {
      let tempMs = item.slice(7, 10)
      let tempLyric = item.slice(11, item.length)
      if (isNaN(Number(tempMs))) {
        tempMs = item.slice(7, 9)
        tempLyric = item.slice(10, item.length)
      }
      return {
        minu: item.slice(1, 3),
        sec: item.slice(4, 6),
        ms: tempMs,
        curTime: parseInt(item.slice(1, 3)) * 60000 + parseInt(item.slice(4, 6)) * 1000 + parseInt(tempMs),
        lyric: tempLyric
      }
    })
    lyricInfo.value.forEach((item, i) => {
      if (i < lyricInfo.value.length - 1) {
        if (isNaN(lyricInfo.value[i + 1].curTime))
          lyricInfo.value[i].nextTime = Number.MAX_SAFE_INTEGER
        else
          lyricInfo.value[i].nextTime = lyricInfo.value[i + 1].curTime
      }
    })
  }


  const changeLyricTime = (curLyricTime) => {
    lyricTime.value = curLyricTime * 1000
  }

  const resetLyricTime = () => lyricTime.value = 0

  const changeDuration = (curDur) => duration.value = curDur * 1000

  const addSong = (item) => playList.value.push(item)

  return {
    playList,
    curIndex,
    curPlaystate,
    showPopup,
    lyricInfo,
    lyricTime,
    duration,
    changePlaystate,
    changePlaylist,
    changeIndex,
    changePopup,
    getLyrics,
    changeLyricTime,
    resetLyricTime,
    changeDuration,
    addSong
  }
})
