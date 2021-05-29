import React from 'react'
import SearchForm from '../../components/thermometer/SearchForm.jsx'
import TableList from '../../components/thermometer/TableList.jsx'

const TherList = () => {
  return (
      <div className="ther-list">
        <SearchForm/>
        <TableList/>
      </div>
  )
}
export default TherList
