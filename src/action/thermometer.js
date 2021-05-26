import * as Types from '../types/types'

export const onChangeTherList = list => ({
  type: Types.SET_THER_LIST,
  therList: list
})

export const onChangeStatus = status => ({
  type: Types.SET_STATUS,
  status: status
})