import request from '@/utils/system/request'

// 查询权限列表
export function selectWhitelistRequestListApi(data) {
    return request({
        url: '/sys-whitelist-request/list',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}

// 删除用户
export function deleteWhitelistByIdApi(data) {
    return request({
        url: '/sys-whitelist-request/delete',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}

// 批量删除用户
export function batchDeleteWhitelistByIdsApi(data) {
    return request({
        url: '/sys-whitelist-request/batch-delete',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}

// 新增用户
export function whitelistAddApi(data) {
    return request({
        url: '/sys-whitelist-request/add',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}