import React, { useReducer, useRef } from 'react'
import SearchForm from '../../../components/thermometer/SearchForm'
import TableList from '../../../components/thermometer/TableList'
import therReducer, { therState } from '../../../reducer/thermometer'

const pagination = {
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total, range) => `第 ${range[0]} - ${range[1]} 条/总共${total}条`,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  size: 'small'
}
export const TherContext = React.createContext(null)
const TherList = () => {

  const [state, dispatch] = useReducer(therReducer, therState)
  const listRef = useRef()

  let changeSearchStatus =  (status) =>  {
    console.log(1111)
    listRef.current.handleSearch(status)
  }
  return (
    <TherContext.Provider value={{state, dispatch}}>
      <div className="ther-list">
        <SearchForm ref={listRef} cRef={listRef} pagination={ pagination }/>
        <TableList changeSearchStatus={ changeSearchStatus }  pagination={ pagination }/>
      </div>
		</TherContext.Provider>
  )
}

export default TherList
