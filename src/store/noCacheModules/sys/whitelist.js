import {selectWhitelistRequestListApi,deleteWhitelistByIdApi,batchDeleteWhitelistByIdsApi,whitelistAddApi} from '@/api/sys/whitelist'
import toolUtils from '@/utils/system/toolUtils'

/**
 * 获取权限列表数据
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectWhitelistRequestList(params) {
    return new Promise((resolve, reject) => {
        selectWhitelistRequestListApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};

/**
 * 根据用户 id 删除用户信息
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function deleteWhitelistById( params) {
    return new Promise((resolve, reject) => {
        deleteWhitelistByIdApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
        })
    })
};

/**
 * 根据用户 id 删除用户信息
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function batchDeleteWhitelistByIds(params) {
    return new Promise((resolve, reject) => {
        batchDeleteWhitelistByIdsApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};
/**
 * 新增白名单
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function whitelistAdd( params) {
    return new Promise((resolve, reject) => {
        whitelistAddApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};

const whitelist = {
    selectWhitelistRequestList,
    deleteWhitelistById,
    batchDeleteWhitelistByIds,
    whitelistAdd
}
export default whitelist