import request from '@/utils/system/request'

// 查询资源菜单树
export function selectMenuTreeApi() {
    return request({
        url: '/sys-resource/select-menu-tree',
        method: 'post',
        baseURL: '/ddx/sys'
    })
}
// 根据用户ID查询菜单资源ID集合
export function selectUserResourceIdsApi(data) {
    return request({
        url: '/sys-resource/select-user-resource-ids',
        method: 'post',
        baseURL: '/ddx/sys',
        data:data
    })
}