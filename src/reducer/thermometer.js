import * as Types from '../types/types'

export const therState = {
  therList: [],
  status: '0'
}

const therReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_THER_LIST:
      const { therList } = action
      return {
        ...state,
        therList
      }
    case Types.SET_STATUS:
      const { status } = action
      return {
        ...state,
        status
      }
    default: {
      return { ...state }
    }
  }
}
export default therReducer