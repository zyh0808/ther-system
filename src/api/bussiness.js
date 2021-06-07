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

export function therListImport (params) {
  return service(API + '/api/at/ther/import', {
    method: 'POST',
    data: params
  })
}

export function caliListImport (params) {
  return service(API + '/api/at/cali/import', {
    method: 'POST',
    data: params
  })
}

