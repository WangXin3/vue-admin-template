import request from '@/utils/request'

export function getMenusTree() {
  return request({
    url: 'system/menu/tree',
    method: 'get'
  })
}

export function buildMenus() {
  return request({
    url: 'system/menu/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/menu',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'system/menu',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'system/menu',
    method: 'put',
    data
  })
}

export function getMenusTreeByRoleId(roleId) {
  return request({
    url: 'system/menu/tree/' + roleId,
    method: 'get'
  })
}
