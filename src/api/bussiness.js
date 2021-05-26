import { service } from '../utils/request'

let API = ''

export function fetchTherList (params) {
  return service(API + '/api/at/ther/list', {
    method: 'POST',
    data: params
  })
}
