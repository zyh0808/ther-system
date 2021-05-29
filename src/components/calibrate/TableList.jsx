import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import {  onChangePagination } from '../../store/calibrate'
// import './tableList.less'

const columns = [
  {
    title: '温度计编号',
    dataIndex: 'tid',
    key: 'tid'
  },
  {
    title: '证书编号',
    dataIndex: 'certno',
    key: 'certno',
    width: 150
  },
  {
    title: '溯源证书编号',
    dataIndex: 'scertno',
    key: 'scertno'
  },
  {
    title: '校准日期',
    dataIndex: 'caldate',
    key: 'caldate'
  },
  {
    title: '到期时间',
    dataIndex: 'expire',
    key: 'expire'
  },
  {
    title: '设备名',
    dataIndex: 'caleqptname',
    key: 'caleqptname'
  },
  {
    title: '规格型号 ',
    dataIndex: 'caleqptspec',
    key: 'caleqptspec'
  },
  {
    title: '设备编号',
    dataIndex: 'caleqptcode',
    key: 'caleqptcode'
  },
  {
    title: '空气温度',
    dataIndex: 'atemp',
    key: 'atemp'
  },
  {
    title: '空气湿度',
    dataIndex: 'ahum',
    key: 'ahum'
  },
  {
    title: '产品型号',
    dataIndex: 'eqpttyp',
    key: 'eqpttyp'
  },
  {
    title: '不确定度',
    dataIndex: 'unct',
    key: 'unct'
  },
  {
    title: 'u_k',
    dataIndex: 'u_k',
    key: 'u_k'
  }
]

const TableList = () => {

  const pagination = useSelector(state => state['caliReducer'].pagination)
  const caliList = useSelector(state => state['caliReducer'].caliList)
  
  const dispatch = useDispatch()


  const handlePageChange = (page) => {
    dispatch(onChangePagination(page))
  }
  return (
    <div>
      <Table columns={columns} dataSource={caliList} pagination={pagination} rowKey={record => record.tid} onChange={ handlePageChange } sticky className="table-list"/>
    </div>
  )
}

export default TableList