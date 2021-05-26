import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import './index.less'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import TherList from '../bussiness/therList'
import IconFont from '../../utils/IconFont'

const { Header, Sider, Content } = Layout

const Home = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="home-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<IconFont type = "ther-wenduji" />}>
            温度计管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () =>setCollapsed(!collapsed)
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path={'/'}><TherList /></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home
