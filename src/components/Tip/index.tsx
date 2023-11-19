import { Typography, notification } from 'antd'
import { FC, useEffect } from 'react'

const { Paragraph, Link, Text } = Typography

const Tip: FC = () => {
  useEffect(() => {
    openNotification(3)
  }, [])

  const openNotification = (duration = 5) => {
    notification.info({
      message: `温馨提示`,
      description: (
        <div className="text-justify">
          <Paragraph>
            该拾取器使用高德 Web 服务 API，如提示 <Text type="danger">[10003] DAILY_QUERY_OVER_LIMIT</Text>
            ，请前往高德开放平台
            <Link href="https://lbs.amap.com/dev/key" target="_blank">
              申请Key
            </Link>{' '}
            并输入。
          </Paragraph>
          <Paragraph italic>
            <Text type="warning">请放心使用，不会保存你的 Key 信息！！</Text>
          </Paragraph>
        </div>
      ),
      placement: 'top',
      duration,
      style: {
        width: 345,
      },
    })
  }

  return (
    <div
      className="absolute top-[10px] left-[10px] w-[28px] h-[28px] leading-[29px] rounded-[4px] font-bold text-center text-[16px] bg-white cursor-pointer"
      style={{ boxShadow: '0 0 0 2px rgba(0,0,0,.1)' }}
      onClick={() => openNotification()}
    >
      <span>i</span>
    </div>
  )
}

export default Tip
