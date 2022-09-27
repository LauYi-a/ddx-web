import request from '@/utils/system/request'


// 分页获取角色
export function selectPageRoleListApi(data) {
  return request({
    url: '/sys-role/list',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 查询所有角色键值
export function selectRoleKyeAndValAllApi() {
  return request({
    url: '/sys-role/select-role-key-val-all',
    method: 'post',
    baseURL: '/ddx/sys'
  })
}
// 新增角色信息
export function roleAddApi(data) {
  return request({
    url: '/sys-role/add',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 修改角色信息
export function roleEditApi(data) {
  return request({
    url: '/sys-role/edit',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 删除用户
export function deleteRoleInfoByIdApi(data) {
  return request({
    url: '/sys-role/delete',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 批量删除用户
export function batchDeleteRoleInfoByIdsApi(data) {
  return request({
    url: '/sys-role/batch-delete',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}
