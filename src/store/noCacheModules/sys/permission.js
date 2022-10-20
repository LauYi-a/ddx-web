import {selectPermissionAllApi,selectPermissionListApi,editPermissionApi,refreshCachePermissionApi } from '@/api/sys/permission'
import toolUtils from '@/utils/system/toolUtils'

/**
 * 获取权限列表数据
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectPermissionList(params) {
    return new Promise((resolve, reject) => {
        selectPermissionListApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};
/**
 * 查询所权限
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectPermissionAll(params) {
    return new Promise((resolve, reject) => {
        selectPermissionAllApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
        })
    })
};

/**
 * 刷新权限缓存
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function refreshCachePermission() {
    return new Promise((resolve, reject) => {
        refreshCachePermissionApi().then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};
/**
 * 编辑权限列表数据
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function editPermission(params) {
    return new Promise((resolve, reject) => {
        editPermissionApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
}

const permission = {
    selectPermissionList,
    selectPermissionAll,
    refreshCachePermission,
    editPermission
};

export default permission