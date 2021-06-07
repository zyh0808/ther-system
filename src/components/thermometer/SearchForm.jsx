import  React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Row, Col, Input, Button, DatePicker, Select, message, Upload } from 'antd'
import { fetchTherList, therListImport } from '../../api/bussiness'
import { onChangeTherList, onChangePagination, onChangeIsFetchTherList, therState } from '../../store/thermometer'
import { importsExcel } from '../../utils/excel'

const { RangePicker } = DatePicker
const { Option } = Select

const SearchForm = () => {

  const [searchForm] = Form.useForm()
  // const [fileList] = useState()
  const [isUpload, setIsUpload] = useState(false)
  const pagination = useSelector(state => state['therReducer'].pagination)
  const status = useSelector(state => state['therReducer'].status)
  const dispatch = useDispatch()

  async function getTherList () {
    dispatch(onChangeIsFetchTherList(true))
    const fieldsValues = searchForm.getFieldsValue()
    const params = {
      page_num: pagination.current,
      page_size: pagination.pageSize,
      param: {
        status: status,
        typ: fieldsValues['typ'],
        s_time: fieldsValues['createTime'] ? fieldsValues['createTime'][0].valueOf() / 1000 : undefined,
        e_time: fieldsValues['createTime'] ? fieldsValues['createTime'][1].valueOf() / 1000 : undefined,
        tid: fieldsValues['tid']
      }
    }
    console.log(JSON.stringify(params))
    try {
      const response = await fetchTherList(params)
      dispatch(onChangeIsFetchTherList(false))
      const page = Object.assign({...pagination}, {total: response.total})
      dispatch(onChangeTherList(response.rows))
      dispatch(onChangePagination(page))
    } catch(err) {
      message.error(err.msg)
      dispatch(onChangeIsFetchTherList(false))
      dispatch(onChangeTherList([]))
      dispatch(onChangePagination(therState.pagination))
    }
  }
  useEffect(() => {
    getTherList()
  }, [pagination.current, status, pagination.pageSize])// eslint-disable-line react-hooks/exhaustive-deps

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
  const props = {
    showUploadList: false,
    accept: ".xls,.xlsx",
    // fileList: fileList,
    customRequest: (res) => {
      setIsUpload(true)
      const { file } = res
      importsExcel(file)
        .then((data) => {
          // console.log(JSON.stringify(data))
          therListImport(data).then(res => {
            message.success('上传成功')
          }).catch(err => {
            message.error(err.msg)
          }).finally(() => {
            setIsUpload(false)
          })
        }).catch(err => [
          message.error(err)
        ])
      }
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
          <Upload {...props}>
            <Button style={{ margin: '0 8px' }} loading={isUpload}>导入</Button>
          </Upload>
        </Col>
      </Row>
    </Form>
  )
}
export default SearchForm
// export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
