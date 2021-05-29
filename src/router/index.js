import React, { lazy } from "react"
import IconFont from '../utils/IconFont'

const Login = lazy(() => import('../pages/Login'))
const TherList = lazy(() => import('../pages/TherList'))
const Calibrate = lazy(() => import('../pages/Calibrate'))

export const authRoutes = [
  {
    id: '1',
    path: '/ther/index',
    title: '温度计',
    subTitle: '温度计管理列表',
    // isMenu: 1,
    icon: < IconFont type="ther-wenduji" />,
    component: <TherList />
  },
  {
    id: '2',
    path: '/ther/calibrate',
    title: '校准信息',
    subTitle: '校准信息管理列表',
    // isMenu: 1,
    icon: < IconFont type="ther-adjusting" />,
    component: <Calibrate />
  }
]

export const unAuthRoutes = [
  {
    id: '0',
    exact: true,
    path: '/login',
    title: '登录',
    isMenu: 1,
    component: <Login />
  }
]