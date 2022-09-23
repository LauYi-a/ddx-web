import {selectPermissionAllApi } from '@/api/sys/permission'
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
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    selectPermissionAll({ commit }) {
        return new Promise((resolve, reject) => {
            selectPermissionAllApi().then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
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