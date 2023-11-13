import useMapStore from '@/components/MapboxMap/useMapStore'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FC } from 'react'

interface WidgetProps {
  children?: React.ReactNode
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Widget: FC<WidgetProps> = (props) => {
  const { map } = useMapStore()

  return (
    <div className="absolute top-[10px] left-[10px] rounded-[4px] shadow-ctrl">
      <Spin spinning={!map} indicator={antIcon}>
        <div className="p-[10px] bg-white">{props.children}</div>
      </Spin>
    </div>
  )
}

export default Widget
