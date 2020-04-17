import request from '@/utils/request'

export function getUserList(pageNum, pageSize) {
  return request({
    url: '/system/user',
    method: 'get',
    params: { pageNum: pageNum, pageSize: pageSize }
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

export function addUser(user) {
  return request({
    url: '/system/user',
    method: 'post',
    data: user
  })
}

export function delUser(users) {
  return request({
    url: '/system/user',
    method: 'delete',
    data: users
  })
}
