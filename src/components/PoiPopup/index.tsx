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
      <div>
        <Text strong>地址: </Text>
        <Text copyable>{data.address}</Text>
      </div>
      <div>
        <Text strong>坐标: </Text>
        <Text copyable>{`${data.lon},${data.lat}`}</Text>
      </div>
    </ConfigProvider>
  )
}

export default PoiPopup
