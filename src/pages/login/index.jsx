import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom"
import './index.less'

// const { TabPane } = Tabs

const LoginForm = () => {
  
  const history = useHistory()

  const onFinish = (values) => {
    history.push('/admin/biz/therList')
  }
  const onFinishFailed = () => {

  }
  return (
    <Form
      name="loginForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        // rules={[
        //   {
        //     required: true,
        //     message: '请输入用户名',
        //   }
        // ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        // rules={[
        //   {
        //     required: true,
        //     message: '请输入密码'
        //   }
        // ]}
      >
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}
          type="password" placeholder="请输入密码"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

const Login = () => {
  return (
    <div className="login">
      <div className="login-main">
        <div className="login-title">
          <h1>温度计系统</h1>
        </div>
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login