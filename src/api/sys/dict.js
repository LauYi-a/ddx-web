import request from '@/utils/system/request'


// 获取系统模块分组字典键值
export function getModulesAllGroupDictKeyValueApi() {
  return request({
    url: '/sys-dict/get-modules-all-group-dict-key-value',
    method: 'post',
    baseURL: '/ddx/sys'
  })
}
