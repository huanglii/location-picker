import useMapStore from '@/components/MapboxMap/useMapStore'
import useMapLayerEvent from '@/hooks/useMapLayerEvent'
import { poiSearch, reGeo } from '@/services/amap'
import { useRequest } from 'ahooks'
import { Input, List, Segmented, Space, Typography, message } from 'antd'
import { SearchProps } from 'antd/es/input/Search'
import mapboxgl from 'mapbox-gl'
import { FC, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import PoiPopup from '../PoiPopup'
import { getPoiGroupLayer, transformPoiList } from './util'

interface PoiData {
  count: number
  pois: POI[]
}

type PickType = '1' | '2' | '3'

const pickTypeList: { label: string; value: PickType }[] = [
  { label: '地点搜索', value: '1' },
  { label: '坐标定位', value: '2' },
  { label: '地图选点', value: '3' },
]

let highlightStateId: string | undefined

const LocationPicker: FC = () => {
  const { map } = useMapStore()
  const markerRef = useRef(new mapboxgl.Marker())
  const popupRef = useRef(
    new mapboxgl.Popup({
      maxWidth: '400px',
      closeOnClick: false,
    })
  )

  const [result, seResult] = useState<PoiData>({ count: 0, pois: [] })
  // 类型
  const [pickType, setPickType] = useState<PickType>('1')
  // LBS key
  const [lbsKey, setLbsKey] = useState('')
  const [keywords, setKeywords] = useState('')

  useEffect(() => {
    if (map) {
      popupRef.current.on('close', onPopupClose)
    }
  }, [map])

  const { loading: loading1, run: runPoiSearch } = useRequest(poiSearch, {
    manual: true,
    onSuccess(data: any) {
      markerRef.current.remove()
      const poiList: POI[] = transformPoiList(data.pois)
      seResult({
        count: +data.count,
        pois: poiList,
      })
      addPoiLayer(poiList)
    },
  })

  const { loading: loading2, run: runReGeo } = useRequest(reGeo, {
    manual: true,
    onSuccess(data: any, params) {
      const poiList: POI[] = transformPoiList(data.regeocode.pois)
      seResult({
        count: data.regeocode.pois.length,
        pois: poiList,
      })
      if (map) {
        addPoiLayer(poiList, false)
        const center: mapboxgl.LngLatLike = [params[0], params[1]]
        const popupNode = document.createElement('div')
        createRoot(popupNode).render(
          <PoiPopup
            data={{
              id: '',
              name: center.join(','),
              location: center.join(','),
              lon: center[0],
              lat: center[1],
              address: data.regeocode.formatted_address,
            }}
          />
        )
        const popup = new mapboxgl.Popup()
        popup.setDOMContent(popupNode)
        markerRef.current.setLngLat(center).setPopup(popup).addTo(map)
        markerRef.current.togglePopup()
        map.flyTo({
          center,
          zoom: 15,
        })
      }
    },
  })

  const onPopupClose = () => {
    if (map && highlightStateId) {
      // 清除要素状态
      map.setFeatureState({ source: 'poi', id: highlightStateId }, { highlight: false })
    }
    highlightStateId = undefined
  }

  /**
   * 地图选点
   * @param e
   */
  const onMapClick = (e: mapboxgl.MapLayerEventType['click'] & mapboxgl.EventData) => {
    const features = map?.queryRenderedFeatures(e.point, {
      layers: ['clusters', 'cluster-count', 'unclustered-point'],
    })
    if (!features || features.length === 0) {
      runReGeo(+e.lngLat.lng.toFixed(6), +e.lngLat.lat.toFixed(6))
    }
  }

  useEffect(() => {
    setKeywords('')
    if (map) {
      if (pickType === '3') {
        map.on('click', onMapClick)
        map.getCanvas().style.cursor = 'pointer'
      } else {
        map.getCanvas().style.cursor = ''
      }
    }

    return () => {
      map?.off('click', onMapClick)
    }
  }, [map, pickType])

  useMapLayerEvent(
    map,
    'click',
    (e) => {
      if (map && e.features && e.features[0].properties) {
        const properties = e.features[0].properties as POI
        const coordinates: [number, number] = [properties.lon, properties.lat]
        // 弹窗
        const popupNode = document.createElement('div')
        createRoot(popupNode).render(<PoiPopup data={properties} />)
        popupRef.current.setDOMContent(popupNode).setLngLat(coordinates).addTo(map)
        // 设置选中要素状态
        setHighlightFeatureState(e.features[0].id as string)
      }
    },
    {
      layerIds: ['unclustered-point'],
    }
  )

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (!!value) {
      seResult({
        count: 0,
        pois: [],
      })
      if (pickType === '1') {
        runPoiSearch({ key: lbsKey, keywords: value, page: 1 })
      } else {
        const location = value.split(',')
        if (location.length === 2) {
          runReGeo(+location[0], +location[1])
        } else {
          message.error('请正确输入坐标, 如: 107.74,30.18')
        }
      }
    } else {
      message.error('请输入关键字或坐标')
    }
  }

  const onPageChange = (page: number) => {
    if (pickType === '1') {
      runPoiSearch({ key: lbsKey, keywords: keywords, page: page })
    }
  }

  const addPoiLayer = (data: POI[], fitBounds = true) => {
    if (map) {
      map.removeGroupLayer('poi')
      popupRef.current.remove()

      const groupLayer = getPoiGroupLayer(data, fitBounds)
      map.addGroupLayer('poi', groupLayer)
    }
  }

  const onItemClick = (item: POI) => {
    if (map) {
      // 弹窗
      const popupNode = document.createElement('div')
      createRoot(popupNode).render(<PoiPopup data={item} />)
      popupRef.current.setDOMContent(popupNode).setLngLat([item.lon, item.lat]).addTo(map)
      // 设置选择要素状态
      setHighlightFeatureState(item.id)
      map.flyTo({
        center: [item.lon, item.lat],
        zoom: 15,
      })
    }
  }

  const setHighlightFeatureState = (id: string) => {
    if (map) {
      // 设置选中要素状态
      if (highlightStateId) {
        // 清除上次的要素状态
        map.setFeatureState({ source: 'poi', id: highlightStateId }, { highlight: false })
      }
      // 设置当前要素状态
      highlightStateId = id
      map.setFeatureState({ source: 'poi', id: highlightStateId }, { highlight: true })
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center p-[10px] bg-gradient-to-r from-cyan-500 to-blue-500">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 4.04145C22.8564 2.96966 25.1436 2.96966 27 4.04145L39.7846 11.4226C41.641 12.4944 42.7846 14.4752 42.7846 16.6188V31.3812C42.7846 33.5248 41.641 35.5056 39.7846 36.5774L27 43.9585C25.1436 45.0303 22.8564 45.0303 21 43.9585L8.21539 36.5774C6.35898 35.5056 5.21539 33.5248 5.21539 31.3812V16.6188C5.21539 14.4752 6.35898 12.4944 8.21539 11.4226L21 4.04145Z"
            stroke="white"
            stroke-width="4"
          />
          <rect x="14" y="17" width="4" height="15" rx="2" fill="white" />
          <rect x="22" y="24" width="4" height="4" rx="2" fill="white" />
          <rect x="30" y="17" width="4" height="15" rx="2" fill="white" />
        </svg>
        <span className="ml-2 text-lg text-white font-bold">坐标拾取器 - NaiveMap</span>
      </div>
      <div className="h-[calc(100%-68px)] p-[10px] border-r-[1px]">
        <Space direction="vertical">
          <Segmented
            size="large"
            options={pickTypeList}
            defaultValue={pickType}
            onChange={(value) => setPickType(value as PickType)}
          />
          {/* <Radio.Group defaultValue="amap" value={lbsType} onChange={(e) => setLbsType(e.target.value)}>
            <Radio value="amap">高德</Radio>
            <Radio value="bmap">百度</Radio>
          </Radio.Group> */}
          <Input.Password value={lbsKey} onChange={(e) => setLbsKey(e.target.value)} placeholder="请输入高德地图 Key" />
          {pickType !== '3' && (
            <Input.Search
              enterButton
              value={keywords}
              placeholder={pickType === '1' ? '请输入关键字' : '请输入坐标, 如: 107.74,30.18'}
              onChange={(e) => setKeywords(e.target.value)}
              onSearch={onSearch}
            />
          )}
        </Space>
        <List
          bordered
          size="small"
          className="poi-list"
          style={{ marginTop: 8, height: `calc(100% - ${(pickType === '3' ? 85 : 125) + 8}px)` }}
          loading={loading1 || loading2}
          dataSource={result.pois}
          pagination={{
            size: 'small',
            total: result.count > 30 ? 30 : result.count,
            pageSize: 5,
            hideOnSinglePage: true,
            showSizeChanger: false,
            showLessItems: true,
            onChange: onPageChange,
          }}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div className="w-[225px] hover:cursor-pointer" onClick={() => onItemClick(item)}>
                <p>
                  <Typography.Text ellipsis strong>
                    {item.name}
                  </Typography.Text>
                </p>
                <p>
                  <Typography.Text ellipsis type="secondary">
                    {item.address}
                  </Typography.Text>
                </p>
                <p>
                  <Typography.Text ellipsis copyable>
                    {`${item.lon},${item.lat}`}
                  </Typography.Text>
                </p>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default LocationPicker
