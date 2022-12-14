import { getSysParamConfigApi,updateParamConfigApi } from '@/api/sys/paramConfig'
import toolUtils from '@/utils/system/toolUtils'

/**
 * 获取系统参数配置
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function getSysParamConfig() {
  return new Promise((resolve, reject) => {
    getSysParamConfigApi().then(res => {
      resolve(res)
    }).catch(error =>{
      console.log(error)
    })
  })
};

/**
 * 修改系统参数配置
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function updateParamConfig(params) {
  return new Promise((resolve, reject) => {
    updateParamConfigApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(res.msg,res.type,3000);
      reject(error)
    })
  })
};

const paramConfig = {
  getSysParamConfig,
  updateParamConfig
}
export default paramConfig