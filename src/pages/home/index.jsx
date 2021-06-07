import React, { useState } from 'react'
import {  useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu, PageHeader, Avatar, Button, Row, Col } from 'antd'
import './index.less'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import { authRoutes } from '../../router'

import { onChangeMenuSelectKey, onChangePageTitle, onChangePageSubTitle } from '../../store/home'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const HearderRight = () => {
  return (
    <div className="header-right">
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <span>用户名称</span>
        <Button icon={<LogoutOutlined />}  style={{ margin: '0 10px'}}>注销</Button>
    </div>
  )
}

const Home = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const selectKey = useSelector(state => state['homeReducer'].menuSelectKey)
  const title = useSelector(state => state['homeReducer'].pageTitle)
  const subTitle = useSelector(state => state['homeReducer'].pageSubTitle)
  
  const dispatch = useDispatch()
  const history = useHistory()

  const handleMenu = (menu) => {
    const {id, path, title, subTitle} = menu
    dispatch(onChangeMenuSelectKey(id))
    dispatch(onChangePageTitle(title))
    dispatch(onChangePageSubTitle(subTitle))
    document.title = title
    history.push(path)
  }

  const renderMemu = (routes) => {
    return routes.map((route) => {
      if (route.routes) {
        return (
          <SubMenu key={route.id} icon={route.icon} title={route.title}>
            {
              renderMemu(route.routes)
            }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={route.id} icon={route.icon} onClick={() => handleMenu(route)}>
          {route.title}
        </Menu.Item>
      )
    })
  }
  const openKey = authRoutes[0].id

  return (
    <Layout className="home-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={selectKey} defaultOpenKeys={[openKey]}>
          {
            renderMemu(authRoutes)
            // authRoutes.map(menu => {
            //   return (
            //     <Menu.Item key={menu.id} icon={menu.icon} onClick={() => handleMenu(menu)}>
            //       {menu.title}
            //     </Menu.Item>
            //   )
            // })
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col span={12}>{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () =>setCollapsed(!collapsed)
              })}</Col>
             <Col span={12}><HearderRight /></Col>
          </Row>
          
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
