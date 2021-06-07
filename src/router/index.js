import React, { lazy } from "react"
import IconFont from '../utils/IconFont'

const Login = lazy(() => import('../pages/Login'))
const TherList = lazy(() => import('../pages/TherList'))
const Calibrate = lazy(() => import('../pages/Calibrate'))

const Page404 = lazy(() => import('../pages/404'))

export const authRoutes = [
  {
    id: '1-0',
    path: '/admin/biz',
    title: '业务管理',
    icon: <IconFont type="ther-wenduji" />,
    routes: [
      {
        id: '1',
        path: '/admin/biz/therList',
        exact: true,
        title: '温度计',
        subTitle: '温度计管理列表',
        // icon: <IconFont type="ther-wenduji" />,
        component: <TherList />
      },
      {
        id: '2',
        path: '/admin/biz/calibrate',
        exact: true,
        title: '校准信息',
        subTitle: '校准信息管理列表',
        // icon: <IconFont type="ther-adjusting" />,
        component: <Calibrate />
      }
    ]
  }
]

export const unAuthRoutes = [
  {
    id: '0',
    exact: true,
    path: '/login',
    title: '登录',
    component: <Login />
  },
  {
    id: '404',
    path: '*',
    title: '404 not found',
    component: <Page404 />
  }
]