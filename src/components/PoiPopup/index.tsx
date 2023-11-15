import { Typography } from 'antd'
import { FC } from 'react'

interface PoiPopupProps {
  data: POI
}

const { Title, Paragraph } = Typography

const PoiPopup: FC<PoiPopupProps> = ({ data }) => {
  return (
    <div>
      <Title level={5}>{data.name}</Title>
      <Paragraph copyable>{data.address}</Paragraph>
      <Typography.Text copyable>
        {`${data.lon.toFixed(6)},${data.lat.toFixed(6)}`}
      </Typography.Text>
    </div>
  )
}

export default PoiPopup
