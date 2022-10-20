import {selectMenuTreeApi,selectUserResourceIdsApi,selectMenuTreeListApi,resourceEditApi} from '@/api/sys/resource'
import toolUtils from '@/utils/system/toolUtils'

/**
 * 查询资源菜单树
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectMenuTree() {
    return new Promise((resolve, reject) => {
        selectMenuTreeApi().then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
        })
    })
};
/**
 * 根据用户ID查询菜单资源ID集合
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectUserResourceIds(params) {
    return new Promise((resolve, reject) => {
        selectUserResourceIdsApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
        })
    })
};
/**
 * 查询系统资源树列表
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectMenuTreeList(params) {
    return new Promise((resolve, reject) => {
        selectMenuTreeListApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};
/**
 * 编辑资源菜单
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function resourceEdit(params) {
    return new Promise((resolve, reject) => {
        resourceEditApi(params).then(res => {
            resolve(res)
        }).catch(error =>{
            toolUtils.sendNotification(error.msg,error.type,3000);
            reject(error)
        })
    })
};

const resource = {
    selectMenuTree,
    selectUserResourceIds,
    selectMenuTreeList,
    resourceEdit
};

export default resource