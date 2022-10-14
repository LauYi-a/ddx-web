import {selectPermissionAllApi,selectPermissionListApi,editPermissionApi,refreshCachePermissionApi } from '@/api/sys/permission'
import { sendNotification } from '@/utils/system/toolUtils'

const state = () => ({

});

// getters
const getters = {
};

// mutations
const mutations = {
};

// actions
const actions = {

    /**
     * 查询所权限
     * @param commit
     * @param dispatch
     * @param params
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    selectPermissionAll({ commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
            selectPermissionAllApi(params).then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
            })
        })
    },

    /**
     * 刷新权限缓存
     * @param commit
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    refreshCachePermission({ commit }) {
        return new Promise((resolve, reject) => {
            refreshCachePermissionApi().then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
                reject(error)
            })
        })
    },

    /**
     * 获取权限列表数据
     * @param commit
     * @param dispatch
     * @param params
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    selectPermissionList({ commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
            selectPermissionListApi(params).then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
                reject(error)
            })
        })
    },
    /**
     * 编辑权限列表数据
     * @param commit
     * @param dispatch
     * @param params
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    editPermission({ commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
            editPermissionApi(params).then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
                reject(error)
            })
        })
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}