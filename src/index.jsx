import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/lib/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

