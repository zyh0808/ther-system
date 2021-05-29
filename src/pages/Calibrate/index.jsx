import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Row, Col, Input, Button, message } from 'antd'
import { fetchCaliList } from '../../api/bussiness'
import { onChangeCaliList, onChangePagination, caliState } from '../../store/calibrate'

import TableList from '../../components/calibrate/TableList'

const SearchForm = () => {

  const [searchForm] = Form.useForm()
  const pagination = useSelector(state => state['therReducer'].pagination)
  const dispatch = useDispatch()

  async function getCaliList () {
    const fieldsValues = searchForm.getFieldsValue()
    const params = {
      page_num: pagination.current,
      page_size: pagination.pageSize,
      param: {
        tid: fieldsValues['tid']
      }
    }
    
    try {
      const response = await fetchCaliList(params)
      const page = Object.assign({...pagination}, {total: response.total})
      dispatch(onChangeCaliList(response.rows))
      dispatch(onChangePagination(page))
    } catch(err) {
      message.error(err.msg)
      dispatch(onChangeCaliList([]))
      dispatch(onChangePagination(caliState.pagination))
    }
  }
  useEffect(() => {
    getCaliList()
  }, [pagination.current, pagination.pageSize])// eslint-disable-line react-hooks/exhaustive-deps

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
    getCaliList()
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

const TherList = () => {

  return (
    <div className="cali-list">
      <SearchForm />
      <TableList/>
    </div>
  )
}

export default TherList
