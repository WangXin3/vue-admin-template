import request from '@/utils/request'

export function getList() {
  return request({
    url: '/system/user',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/system/user/info',
    method: 'get'
    // params: { token }
  })
}
