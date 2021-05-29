export const caliState = {
  caliList: [],
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

export const SET_CALI_LIST = 'setCaliList'
export const SET_PAGINATION = 'setPagination'

export const onChangeCaliList = list => ({
  type: SET_CALI_LIST,
  caliList: list
})

export const onChangePagination = pagination => ({
  type: SET_PAGINATION,
  pagination: pagination
})

const caliReducer = (state = caliState, action) => {
  switch (action.type) {
    case SET_CALI_LIST:
      const { caliList } = action
      return {
        ...state,
        caliList
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
export { caliReducer }