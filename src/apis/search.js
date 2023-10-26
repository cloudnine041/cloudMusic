import instance from "../utils/http";
// 获取搜索歌手的歌曲列表信息
export function getsearchListAPI(k) {
  return instance({
    url: '/search',
    params: {
      keywords: k
    }
  })
}