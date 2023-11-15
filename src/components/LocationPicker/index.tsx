import { Input, List, Radio, Space, Typography } from 'antd'
import { FC, useState } from 'react'
import { poiSearch } from '@/services/amap'
import { SearchProps } from 'antd/es/input/Search'
import { useRequest } from 'ahooks'
import useMapStore from '@/components/MapboxMap/useMapStore'
import { gcj02towgs84 } from '@/utils'

interface POI {
  id: string
  name: string
  lon: number
  lat: number
  location: string
  address: string
  pname?: string
  cityname?: string
  type?: string
  typecode?: string
  adname?: string
}

interface PoiData {
  count: number
  pois: POI[]
}

const LocationPicker: FC = () => {
  const { map } = useMapStore()
  const [result, seResult] = useState<PoiData>({ count: 0, pois: [] })
  // 类型
  const [pickType, setPickType] = useState<'1' | '2' | '3'>('1')
  // lbs key
  const [lbsKey, setLbsKey] = useState('')
  const [keywords, setKeywords] = useState('重庆')

  const { loading, run } = useRequest(poiSearch, {
    manual: true,
    onSuccess(data: any) {
      const pois: POI[] = data.pois.map((item: any) => {
        const gcj02 = item.location.split(',')
        const wgs84 = gcj02towgs84(gcj02[0], gcj02[1])
        return {
          id: item.id,
          name: item.name,
          lon: wgs84[0],
          lat: wgs84[1],
          location: item.location,
          address: item.address,
        }
      })
      seResult({
        count: +data.count,
        pois,
      })
      addPoisLayer(pois)
    },
  })

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    run({ key: lbsKey, keywords: value, city: '023', page: 1 })
  }

  const onPageChange = (page: number) => {
    run({ key: lbsKey, keywords: keywords, city: '023', page: page })
  }

  const addPoisLayer = (pois: POI[]) => {
    if (map) {
      map.removeGroupLayer('poi')

      let fs: GeoJSON.FeatureCollection<GeoJSON.Point> = {
        type: 'FeatureCollection',
        features: [],
      }
      for (let i = 0; i < pois.length; i++) {
        const poi = pois[i]
        const feature: GeoJSON.Feature<GeoJSON.Point> = {
          type: 'Feature',
          properties: {
            no: i + 1,
            ...poi,
          },
          geometry: {
            type: 'Point',
            coordinates: [poi.lon, poi.lat],
          },
        }
        fs.features.push(feature)
      }

      map.addGroupLayer('poi', {
        sources: {
          poi: {
            type: 'geojson',
            data: fs,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          },
        },
        layers: [
          {
            id: 'clusters',
            type: 'circle',
            source: 'poi',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
              'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
            },
          },
          {
            id: 'cluster-count',
            type: 'symbol',
            source: 'poi',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': ['get', 'point_count_abbreviated'],
              // 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
            },
          },
          {
            id: 'unclustered-point',
            type: 'circle',
            source: 'poi',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#11b4da',
              'circle-radius': 5,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff',
            },
            metadata: {
              cursor: 'pointer',
            },
          },
        ],
      })
    }
  }

  const onItemClick = (item: POI) => {
    console.log(item)
    map?.flyTo({
      center: [item.lon, item.lat],
      zoom: 12,
    })
  }

  return (
    <div className="w-[282px] p-[10px]">
      <Space direction="vertical">
        <Space direction="vertical">
          <Radio.Group
            defaultValue="1"
            value={pickType}
            buttonStyle="solid"
            onChange={(e) => setPickType(e.target.value)}
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
              defaultValue={'气象局'}
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
          loading={loading}
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
                    {/* {item.location} */}
                    {`${item.lon.toFixed(6)},${item.lat.toFixed(6)}`}
                  </Typography.Text>
                </p>
              </div>
            </List.Item>
          )}
        />
      </Space>
    </div>
  )
}

export default LocationPicker
