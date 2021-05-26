import React, { useState, useContext, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Form, Row, Col, Input, Button, DatePicker, Select } from 'antd'
import { fetchTherList } from '../../api/bussiness'
import { onChangeTherList } from '../../action/thermometer'
import { TherContext } from '../../pages/bussiness/therList'

const { RangePicker } = DatePicker
const { Option } = Select

let SearchForm = ({ cRef, pagination }) => {

  const [searchForm] = Form.useForm()
  const therContext = useContext(TherContext)
  const [status, setStatus] = useState('0')

  useImperativeHandle(cRef, () => ({
    handleSearch: (status) => {
      console.log(2222)
      setStatus(status)
      getTherList()
    }
  }))

  async function getTherList () {
    const fieldsValues = searchForm.getFieldsValue()
    const params = {
      page_num: pagination.current,
      page_size: pagination.pageSize,
      param: {
        status: status,
        typ: fieldsValues['typ'],
        s_time: fieldsValues['createTime'] ? fieldsValues['createTime'][0].valueOf() / 1000 : 0,
        e_time: fieldsValues['createTime'] ? fieldsValues['createTime'][1].valueOf() / 1000 : 0,
        tid: fieldsValues['tid']
      }
    }
    const response = await fetchTherList(params)
    therContext.dispatch(onChangeTherList(response.rows))
  }
  useEffect(() => {
    getTherList()
  }, [therContext.state.TableList])// eslint-disable-line react-hooks/exhaustive-deps

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }

  const onFinish = (values) => {
    getTherList()
  }

  return (
    <Form
      {...formItemLayout}
      form={searchForm}
      name="search"
      className="search-form"
      onFinish={onFinish}
    >
      <Row>
        <Col span={5}>
          <Form.Item
            name="tid"
            label="温度计编号"
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="typ" label="批号">
            <Select placeholder="请选择" allowClear>
              <Option value="CE-01">CE-01</Option>
              <Option value="CE-01L">CE-01L</Option>
              <Option value="CE-02L">CE-02L</Option>
              <Option value="CE-03:L">CE-03:L</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="createTime" label="创建时间">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              searchForm.resetFields()
            }}
          >
            重置
          </Button>
          <Button
            style={{ margin: '0 8px' }}
          >
            导入
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default SearchForm = forwardRef(SearchForm)
