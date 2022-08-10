import request from '@/utils/system/request'


// 获取系统参数配置
export function getSysParamConfigApi() {
  return request({
    url: '/sys-param-config/get-sys-param-config',
    method: 'post',
    baseURL: '/ddx/sys'
  })
}

// 修改系统参数配置
export function updateParamConfigApi(data) {
  return request({
    url: '/sys-param-config/update-param-config',
    method: 'post',
    baseURL: '/ddx/sys',
    data:data
  })
}
