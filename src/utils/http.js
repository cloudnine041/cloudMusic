import axios from "axios"
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
});

instance.interceptors.request.use(config => config,
  error => Promise.reject(error)
);

// 添加响应拦截器
instance.interceptors.response.use(res => res.data,
  error => Promise.reject(error)
);

export default instance
