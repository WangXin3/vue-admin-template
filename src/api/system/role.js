import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/system/role',
    method: 'get'
  })
}

export function getRoleListPage(pageNum, pageSize) {
  return request({
    url: '/system/role/roleListPage',
    method: 'get',
    params: { pageNum: pageNum, pageSize: pageSize }
  })
}
