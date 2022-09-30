import request from '@/utils/system/request'

// 查询所以权限
export function selectPermissionAllApi(data) {
    return request({
        url: '/sys-permission/select-permission-all',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}

// 查询权限列表
export function selectPermissionListApi(data) {
    return request({
        url: '/sys-permission/list',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}

// 编辑权限
export function editPermissionApi(data) {
    return request({
        url: '/sys-permission/edit',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}

// 刷新权限缓存
export function refreshCachePermissionApi() {
    return request({
        url: '/sys-permission/refresh-cache',
        method: 'post',
        baseURL: '/ddx/sys'
    })
}