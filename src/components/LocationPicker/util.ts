import { gcj02towgs84 } from '@/utils'
import { GroupLayer } from '@naivemap/mapbox-gl-naive-map'
import bbox from '@turf/bbox'

export function transformPoiList(pois: any[]): POI[] {
  return pois.map((item: any) => {
    const gcj02 = item.location.split(',')
    const wgs84 = gcj02towgs84(+gcj02[0], +gcj02[1])
    return {
      id: item.id,
      name: item.name,
      lon: wgs84[0],
      lat: wgs84[1],
      location: item.location,
      address: item.address,
    }
  })
}

export function getPoiGroupLayer(data: POI[], fitBounds = true): GroupLayer {
  let fs: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: [],
  }
  for (let i = 0; i < data.length; i++) {
    const poi = data[i]
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

  const layer: GroupLayer = {
    sources: {
      poi: {
        type: 'geojson',
        data: fs,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
        // generateId: true,
        promoteId: 'id',
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
          'circle-stroke-width': [
            'case',
            ['boolean', ['feature-state', 'highlight'], false],
            2, // 要素状态的 highlight 属性为 true 时
            1.5, // 默认
          ],
          'circle-stroke-color': [
            'case',
            ['boolean', ['feature-state', 'highlight'], false],
            '#FF7F27', // 要素状态的 highlight 属性为 true 时
            '#fff', // 默认
          ],
        },
        metadata: {
          cursor: 'pointer',
        },
      },
      // {
      //   id: 'unclustered-point-name',
      //   type: 'symbol',
      //   source: 'poi',
      //   filter: ['!', ['has', 'point_count']],
      //   layout: {
      //     'text-field': '{name}',
      //   },
      //   metadata: {
      //     cursor: 'pointer',
      //   },
      // },
    ],
  }

  if (fitBounds) {
    const box = bbox(fs) as [number, number, number, number]
    layer.bounds = box
    layer.fitBoundsOptions = {
      padding: { top: 100, right: 100, bottom: 100, left: 100 },
    }
  }

  return layer
}
