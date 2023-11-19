import { ConfigProvider, Typography } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { FC } from 'react'

interface PoiPopupProps {
  data: POI
}

const { Title, Text } = Typography

const PoiPopup: FC<PoiPopupProps> = ({ data }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Title level={5}>{data.name}</Title>
      <div className="flex">
        <Text strong className="mr-2">
          地址:{' '}
        </Text>
        <Text copyable className="flex-1">
          {data.address}
        </Text>
      </div>
      <div className="flex">
        <Text strong className="mr-2">
          坐标:{' '}
        </Text>
        <Text copyable className="flex-1">{`${data.lon},${data.lat}`}</Text>
      </div>
    </ConfigProvider>
  )
}

export default PoiPopup
