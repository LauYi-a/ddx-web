import request from '@/utils/system/request'
import qs from 'qs'

// 登录api
export function loginApi(data) {
  return request({
    url: '/oauth/token?'+qs.stringify(data),
    method: 'post',
    baseURL: '/ddx/auth'
  })
}

// 退出登录Api
export function loginOutApi() {
  return request({
    url: '/oauth/logout',
    method: 'post',
    baseURL: '/ddx/auth'
  })
}
//获取用户菜单Api
export function getUserMenuApi(data) {
  return request({
    url: '/sys-user/get-user-tree-menu',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 修改用户密码Api
export function passwordChangeApi(data) {
  return request({
    url: '/sys-user/password-change',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 根据用户id查询用户详细信息
export function getUserInfoByIdApi(data) {
  return request({
    url: '/sys-user/get-user-info-byId',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 根据用户 userId 修改用户基本属性
export function updateByUserIdApi(data) {
  return request({
    url: '/sys-user/update-by-userId',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 查询用户列表 集合
export function selectUserListApi(data) {
  return request({
    url: '/sys-user/list',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 删除用户
export function deleteUserInfoByIdApi(data) {
  return request({
    url: '/sys-user/delete',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 批量删除用户
export function batchDeleteUserInfoByIdsApi(data) {
  return request({
    url: '/sys-user/batch-delete',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 新增用户
export function userAddApi(data) {
  return request({
    url: '/sys-user/add',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}

// 编辑用户
export function userEditApi(data) {
  return request({
    url: '/sys-user/edit',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}
