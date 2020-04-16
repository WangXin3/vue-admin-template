import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/system/role',
    method: 'get'
  })
}
