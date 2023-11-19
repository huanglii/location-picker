import { ConfigProvider, Watermark } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import ReactDOM from 'react-dom/client'
import App from './App'

import '@/styles/index.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      components: {
        Segmented: {
          itemSelectedBg: '#1677ff',
          itemSelectedColor: '#fff',
        },
      },
    }}
  >
    <Watermark content="naivemap.com">
      <App />
    </Watermark>
  </ConfigProvider>
)
