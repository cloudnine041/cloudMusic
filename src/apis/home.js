import instance from "../utils/http";
// 获取用户信息，返回object
export function getBannerListAPI() {
  return instance({
    url: '/banner',
    params: {
      type: 1
    }
  })
}

export function getRecPlaylistAPI() {
  return instance({
    url: '/personalized',
    params: {
      limit: 10
    }
  })
}