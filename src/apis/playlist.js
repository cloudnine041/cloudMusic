import instance from "../utils/http";
// 获取歌单详情页标题等主要内容
export function getPlayDetailAPI(id) {
  return instance({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取所有歌曲列表
export function getSongListAPI(params) {
  return instance({
    url: '/playlist/track/all',
    params
  })
}

// 获取歌词 id
export function getLyricsAPI(id) {
  return instance({
    url: '/lyric',
    params: {
      id: id
    }
  })
}