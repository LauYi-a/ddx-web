import request from '@/utils/system/request'

// 查询资源菜单树
export function selectPermissionAllApi() {
    return request({
        url: '/sys-permission/select-permission-all',
        method: 'post',
        baseURL: '/ddx/sys'
    })
}