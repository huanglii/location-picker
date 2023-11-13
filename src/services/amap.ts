// https://restapi.amap.com/v3/place/text

import { message } from 'antd'
import axios from 'axios'

const AMapService = axios.create({
  baseURL: 'https://restapi.amap.com',
  timeout: 3000, // 设置统一的超时时长
})

// 添加响应拦截器
AMapService.interceptors.response.use(
  ({ data }) => {
    // 对响应数据做点什么
    if (data.status === '1') {
      return data
    } else {
      message.error(`[${data.infocode}] ${data.info}`)
    }
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

/**
 * 关键字搜索
 * https://lbs.amap.com/api/webservice/guide/api/search#text
 */
export const poiSearch = (params: { key?: string; keywords: string; page: number; city?: string }) => {
  if (!params.key) {
    params.key = 'ff7c1f3e9db95099f603f145142ae48d'
  }
  return AMapService.get('/v3/place/text', {
    params: {
      ...params,
      citylimit: true,
      offset: 5,
    },
  })
}
