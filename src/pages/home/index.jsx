import React, { useState } from 'react'
import {  useHistory  } from 'react-router-dom'
import { Layout, Menu, PageHeader } from 'antd'
import './index.less'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { authRoutes } from '../../router'

const { Header, Sider, Content } = Layout

const Home = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectKey, setSelectKey] = useState(['1'])
  const [title, setTitle] = useState(['温度计'])
  const [subTitle, setSubTitle] = useState(['温度计管理列表'])
  const history = useHistory()

  const handleMenu = (menu) => {
    const {id, path, title, subTitle} = menu
    setSelectKey([id])
    setTitle(title)
    setSubTitle(subTitle)
    history.push(path)
  }

  return (
    <Layout className="home-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={selectKey}>
          {
            authRoutes.map(menu => {
              return (
                <Menu.Item key={menu.id} icon={menu.icon} onClick={() => handleMenu(menu)}>
                  {menu.title}
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () =>setCollapsed(!collapsed)
          })}
          <PageHeader title={title} backIcon={false} subTitle={subTitle}/>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            overflow:'auto',
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home
