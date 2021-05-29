export const therState = {
  therList: [],
  status: '0',
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total, range) => `第 ${range[0]} - ${range[1]} 条/总共${total}条`,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    size: 'small'
  }
}

export const SET_THER_LIST = 'setTherList'
export const SET_STATUS = 'setStatus'
export const SET_PAGINATION = 'setPagination'

export const onChangeTherList = list => ({
  type: SET_THER_LIST,
  therList: list
})

export const onChangeStatus = status => ({
  type: SET_STATUS,
  status: status
})

export const onChangePagination = pagination => ({
  type: SET_PAGINATION,
  pagination: pagination
})

const therReducer = (state = therState, action) => {
  switch (action.type) {
    case SET_THER_LIST:
      const { therList } = action
      return {
        ...state,
        therList
      }
    case SET_STATUS:
      const { status } = action
      return {
        ...state,
        status
      }
    case SET_PAGINATION:
      const { pagination } = action
      return {
        ...state,
        pagination
      }
    default: {
      return { ...state }
    }
  }
}
export { therReducer }