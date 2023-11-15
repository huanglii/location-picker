import { useRequest } from 'ahooks'
import { Input, List, Radio, Space, Typography, message } from 'antd'
import { SearchProps } from 'antd/es/input/Search'
import mapboxgl from 'mapbox-gl'
import { FC, useRef, useState } from 'react'
import { poiSearch, reGeo } from '@/services/amap'
import useMapStore from '@/components/MapboxMap/useMapStore'
import { gcj02towgs84 } from '@/utils'
import { getPoiGroupLayer, transformPoiList } from './util'
import useMapLayerEvent from '@/hooks/useMapLayerEvent'
import { createRoot } from 'react-dom/client'
import PoiPopup from '../PoiPopup'

interface PoiData {
  count: number
  pois: POI[]
}

const LocationPicker: FC = () => {
  const { map } = useMapStore()
  const markerRef = useRef(new mapboxgl.Marker())
  const popupRef = useRef(new mapboxgl.Popup())

  const [result, seResult] = useState<PoiData>({ count: 0, pois: [] })
  // 类型
  const [pickType, setPickType] = useState<'1' | '2' | '3'>('1')
  // LBS key
  const [lbsKey, setLbsKey] = useState('')
  const [keywords, setKeywords] = useState('')

  const { loading: loading1, run: runPoiSearch } = useRequest(poiSearch, {
    manual: true,
    onSuccess(data: any) {
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
              id: '1',
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

  useMapLayerEvent(
    map,
    'click',
    (e) => {
      if (map && e.features && e.features[0].properties) {
        const properties = e.features[0].properties as POI
        const coordinates: [number, number] = [properties.lon, properties.lat]

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        const popupNode = document.createElement('div')
        createRoot(popupNode).render(<PoiPopup data={properties} />)

        popupRef.current.setDOMContent(popupNode).setLngLat(coordinates).addTo(map)
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
        runPoiSearch({ key: lbsKey, keywords: value, city: '023', page: 1 })
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
      runPoiSearch({ key: lbsKey, keywords: keywords, city: '023', page: page })
    }
  }

  const addPoiLayer = (data: POI[], fitBounds = true) => {
    if (map) {
      map.removeGroupLayer('poi')
      const groupLayer = getPoiGroupLayer(data, fitBounds)
      map.addGroupLayer('poi', groupLayer)
    }
  }

  const onItemClick = (item: POI) => {
    map?.flyTo({
      center: [item.lon, item.lat],
      zoom: 12,
    })
  }

  return (
    <div className="w-[282px] p-[10px] border-r-[1px]">
      <Space direction="vertical">
        <Space direction="vertical">
          <Radio.Group
            defaultValue="1"
            value={pickType}
            buttonStyle="solid"
            onChange={(e) => {
              setKeywords('')
              setPickType(e.target.value)
            }}
          >
            <Radio.Button value={'1'}>地点搜索</Radio.Button>
            <Radio.Button value={'2'}>坐标定位</Radio.Button>
            <Radio.Button value={'3'}>地图选点</Radio.Button>
          </Radio.Group>
          {/* <Radio.Group defaultValue="amap" value={lbsType} onChange={(e) => setLbsType(e.target.value)}>
            <Radio value="amap">高德</Radio>
            <Radio value="bmap">百度</Radio>
          </Radio.Group> */}
          <Input.Password value={lbsKey} onChange={(e) => setLbsKey(e.target.value)} placeholder="请输入密钥（key）" />
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
        {pickType !== '3' && (
          <List
            bordered
            size="small"
            loading={loading1 || loading2}
            dataSource={result.pois}
            pagination={{
              size: 'small',
              total: result.count,
              pageSize: 5,
              hideOnSinglePage: true,
              showSizeChanger: false,
              showLessItems: true,
              onChange: onPageChange,
            }}
            renderItem={(item) => (
              <List.Item>
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
                      {`${item.lon.toFixed(6)},${item.lat.toFixed(6)}`}
                    </Typography.Text>
                  </p>
                </div>
              </List.Item>
            )}
          />
        )}
      </Space>
    </div>
  )
}

export default LocationPicker
