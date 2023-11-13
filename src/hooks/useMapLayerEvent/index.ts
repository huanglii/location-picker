import NaiveMap from '@naivemap/mapbox-gl-naive-map'
import { useEffect } from 'react'

/**
 * 自动注册/移除地图图层事件
 * @param map 地图
 * @param type 事件类型
 * @param listener 监听器
 * @param options 配置项
 */
export default function useMapLayerEvent<T extends keyof mapboxgl.MapLayerEventType>(
  map: NaiveMap | null | undefined,
  type: T,
  listener: (ev: mapboxgl.MapLayerEventType[T] & mapboxgl.EventData) => void,
  options?: {
    layerIds?: string | ReadonlyArray<string>
  }
) {
  const layer = options?.layerIds

  const regMapFunc = (funcType: 'on' | 'off') => {
    if (map) {
      if (layer) {
        map[funcType](type, layer, listener)
      } else {
        map[funcType](type, listener)
      }
    }
  }

  useEffect(() => {
    return () => {
      regMapFunc('off')
    }
  }, [])

  useEffect(() => {
    regMapFunc('on')

    return () => {
      regMapFunc('off')
    }
  }, [map])
}
