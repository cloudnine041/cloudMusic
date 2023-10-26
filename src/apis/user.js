import instance from "../utils/http";
// 获取用户信息，返回object
export function getUserAPI(ph, pa) {
  return instance({
    url: '/login/cellphone',
    params: {
      phone: ph,
      password: pa
    }
  })
}