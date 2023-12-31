import axios from 'axios'

const Service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 设置统一的请求前缀
  timeout: 3000, // 设置统一的超时时长
})

// 添加请求拦截器
Service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 添加响应拦截器
Service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default Service
