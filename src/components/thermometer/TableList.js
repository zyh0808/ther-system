import React, { useContext, useState } from 'react'
import { Table, Space, Row } from 'antd'
import { TherContext } from '../../pages/bussiness/therList'
import './tableList.less'

const columns = [
  {
    title: '温度计编号',
    dataIndex: 'tid',
    key: 'tid'
  },
  {
    title: 'MAC地址',
    dataIndex: 'mac',
    key: 'mac',
  },
  {
    title: '固件版本号',
    dataIndex: 'fw_ver',
    key: 'fw_ver',
  },
  {
    title: '硬件版本号',
    dataIndex: 'hw_ver',
    key: 'hw_ver',
  },
  {
    title: '温度计类型',
    dataIndex: 'typ',
    key: 'typ',
  },
  {
    title: '温度计状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '包装箱号',
    dataIndex: 'box_no',
    key: 'box_no',
  },
  {
    title: '生产日期',
    dataIndex: 'dom',
    key: 'dom',
  },
  {
    title: '是否授权使用',
    dataIndex: 'is_enable',
    key: 'is_enable',
  },
  {
    title: '版本号',
    dataIndex: 'ver',
    key: 'ver',
  },
  {
    title: '是否停用',
    dataIndex: 'is_disabled',
    key: 'is_disabled',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
      </Space>
    )
  }
]
const statusList = [{ value: '0', name: '未使用' }, { value: '1', name: '释冷' }, { value: '2', name: '释冷结束' }, { value: '3', name: '开始运输' }, { value: '4', name: '签收' }]

const TableList = (props) => {
  const { pagination } = props
  const therContext = useContext(TherContext)
  const [status, setStatus] = useState('0')

  const handleStatusClick = (item) => {
    setStatus(item.value)
    props.changeSearchStatus(item.value)
  }

  const StatusEl = () => {
    return (
      <Row type="flex" className="status-select-area">
        {statusList.map(item => {
          return (
            <div className={status === item.value ? 'status-btn active-btn' : 'status-btn'} onClick={() => handleStatusClick(item)}>
              <span>{item.name}</span>
              <div class="bg-line"></div>
            </div>
          )
        })}
      </Row>
    )
  }
  return (
    <div>
      {/* <Button onClick={props.changeSearchStatus}>点击</Button> */}
      <StatusEl />
      <Table columns={columns} dataSource={therContext.state.TableList} pagination={pagination} />
    </div>
  )
}

export default TableList