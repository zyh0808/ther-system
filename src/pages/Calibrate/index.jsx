import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Row, Col, Input, Button, Upload, message } from 'antd'
import { fetchCaliList, caliListImport } from '../../api/bussiness'
import { onChangeCaliList, onChangePagination, onChangeIsFetchCaliList, caliState } from '../../store/calibrate'

import TableList from '../../components/calibrate/TableList'
import { importsExcel } from '../../utils/excel'

const SearchForm = () => {

  const [isUpload, setIsUpload] = useState(false)
  const [searchForm] = Form.useForm()
  const pagination = useSelector(state => state['caliReducer'].pagination)
  const dispatch = useDispatch()
  const { current, pageSize } = pagination

  async function getCaliList () {
    dispatch(onChangeIsFetchCaliList(true))
    const fieldsValues = searchForm.getFieldsValue()
    const params = {
      page_num: current,
      page_size: pageSize,
      param: {
        tid: fieldsValues['tid']
      }
    }
    
    try {
      const response = await fetchCaliList(params)
      dispatch(onChangeIsFetchCaliList(false))
      const page = Object.assign({...pagination}, {total: response.total})
      dispatch(onChangeCaliList(response.rows))
      dispatch(onChangePagination(page))
    } catch(err) {
      message.error(err.msg)
      dispatch(onChangeIsFetchCaliList(false))
      dispatch(onChangeCaliList([]))
      dispatch(onChangePagination(caliState.pagination))
    }
  }
  useEffect(() => {
    getCaliList()
  }, [current, pageSize])// eslint-disable-line react-hooks/exhaustive-deps

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
          const { calibrationinfo, calibrationdetailsinfo } = data
          const sortData = calibrationinfo.map(item => {
            const detailList = calibrationdetailsinfo.filter(info => info.tid === item.tid)
            return {
              ...item,
              sub_list: detailList
            }
          })
          console.log(JSON.stringify(sortData))
          caliListImport(sortData).then(res => {
            message.success('????????????')
          }).catch(err => {
            message.error(err.msg)
          }).finally(() => {
            setIsUpload(false)
          })
        }).catch(err => {
          message.error(err)
        })
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
            label="???????????????"
          >
            <Input placeholder="?????????" />
          </Form.Item>
        </Col>
        
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            ??????
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              searchForm.resetFields()
            }}
          >
            ??????
          </Button>
          
          <Upload {...props}>
            <Button style={{ margin: '0 8px' }} loading={isUpload}>??????</Button>
          </Upload>
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
