import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row } from 'antd'
import { onChangeStatus, onChangePagination } from '../../store/thermometer'
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
    render: status => {
      const statusName = status === '0' ? '未使用' : status === '1' ? '释冷' : status === '2' ? '释冷结束' : status === '3' ? '开始运输' : '签收'
      return (
        <span>{ statusName }</span>
      )
    }
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
    render: is_enable => {
      const enable_desc = is_enable === 0 ? '未授权' : is_enable === 1 ? '已授权' : ''
      return (
        <span>{ enable_desc }</span>
      )
    }
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
    render: is_disabled => {
      const enable_desc = is_disabled === 0 ? '未停用' : is_disabled === 1 ? '已停用' : ''
      return (
        <span>{ enable_desc }</span>
      )
    }
  }
]
const statusList = [{ value: '0', name: '未使用' }, { value: '1', name: '释冷' }, { value: '2', name: '释冷结束' }, { value: '3', name: '开始运输' }, { value: '4', name: '签收' }]

const TableList = () => {

  const pagination = useSelector(state => state['therReducer'].pagination)
  const status = useSelector(state => state['therReducer'].status)
  const therList = useSelector(state => state['therReducer'].therList)
  const isFetchTherList = useSelector(state => state['therReducer'].isFetchTherList)
  
  const dispatch = useDispatch()

  const handleStatusClick = (item) => {
    dispatch(onChangeStatus(item.value))
  }

  const handlePageChange = (page) => {
    dispatch(onChangePagination(page))
  }

  const StatusEl = () => {
    return (
      <Row type="flex" className="status-select-area">
        {statusList.map(item => {
          return (
            <div className={status === item.value ? 'status-btn active-btn' : 'status-btn'} onClick={() => handleStatusClick(item)} key={ item.value}>
              <span>{item.name}</span>
              <div className="bg-line"></div>
            </div>
          )
        })}
      </Row>
    )
  }
  return (
    <div>
      {/* <Button onClick={changeSearchStatus}>点击</Button> */}
      <StatusEl />
      <Table columns={columns} dataSource={therList} pagination={pagination} rowKey={record => record.tid} onChange={handlePageChange} sticky className="table-list" loading={ isFetchTherList }/>
    </div>
  )
}

export default TableList

// export default connect(mapStateToProps, mapDispatchToProps)(TableList)