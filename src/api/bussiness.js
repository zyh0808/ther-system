import { service } from '../utils/request'

let API = ''

export function fetchTherList (params) {
  return service(API + '/api/at/ther/list', {
    method: 'POST',
    data: params
  })
}

export function fetchCaliList (params) {
  return service(API + '/api/at/calibration/list', {
    method: 'POST',
    data: params
  })
}
