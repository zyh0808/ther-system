import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Space, Button, Modal } from 'antd'
import {  onChangePagination } from '../../store/calibrate'
// import './tableList.less'


const TableList = () => {

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
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showCaliDetail(record)}> 校准详情 </Button>
        </Space>
      )
    }
  ]
  const subColumns = [{
    title: '温度计编号',
    dataIndex: 'tid',
    key: 'tid'
  },
  {
    title: '温度值',
    dataIndex: 'tvl',
    key: 'tvl',
    width: 150
  },
  {
    title: '校准温度',
    dataIndex: 'caltvl',
    key: 'caltvl'
  },
  {
    title: '误差',
    dataIndex: 'err',
    key: 'err'
  }]

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [subList, setSubList] = useState([])
  const pagination = useSelector(state => state['caliReducer'].pagination)
  const caliList = useSelector(state => state['caliReducer'].caliList)
  const isFecthCaliList = useSelector(state => state['caliReducer'].isFecthCaliList)
  
  const dispatch = useDispatch()


  const handlePageChange = (page) => {
    dispatch(onChangePagination(page))
  }
  
  const showCaliDetail = (record) => {
    setShowDetailModal(true)
    setSubList(record.sub_list)
  }
  return (
    <div>
      <Table columns={columns} dataSource={caliList} pagination={pagination} rowKey={record => record.tid} onChange={handlePageChange} sticky className="table-list" loading={isFecthCaliList} />
      <Modal title="校准详情" visible={showDetailModal} footer={null} onCancel={() => setShowDetailModal(false)}>
        <Table columns={subColumns} dataSource={subList} rowKey={record => record.tvl} pagination={false}/>
      </Modal>
    </div>
  )
}

export default TableList