// https://restapi.amap.com/v3/place/text

import { wgs84togcj02 } from '@/utils'
import { message } from 'antd'
import axios from 'axios'

const AMapService = axios.create({
  baseURL: 'https://restapi.amap.com',
  timeout: 3000, // 设置统一的超时时长
})

// 添加请求拦截器
AMapService.interceptors.request.use(
  (config) => {
    if (!config.params.key) {
      config.params.key = 'ff7c1f3e9db95099f603f145142ae48d'
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

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
    message.error(error.message)
    return Promise.reject(error)
  }
)

/**
 * 关键字搜索
 * https://lbs.amap.com/api/webservice/guide/api/search#text
 */
export const poiSearch = (params: { key?: string; keywords: string; page: number; city?: string }) => {
  return AMapService.get('/v3/place/text', {
    params: {
      ...params,
      citylimit: true,
      offset: 5,
    },
  })
}

/**
 * 逆地理编码
 * https://lbs.amap.com/api/webservice/guide/api/georegeo#regeo
 */
export const reGeo = (lon: number, lat: number, params?: { key?: string }) => {
  const location = wgs84togcj02(lon, lat).join(',')
  return AMapService.get('/v3/geocode/regeo', {
    params: {
      ...params,
      location,
      extensions: 'all',
    },
  })
}
