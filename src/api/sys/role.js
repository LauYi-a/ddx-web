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
