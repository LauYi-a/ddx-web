import {selectMenuTreeApi,selectUserResourceIdsApi} from '@/api/sys/resource'
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
     * 查询资源菜单树
     * @param commit
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    selectMenuTree({ commit }) {
        return new Promise((resolve, reject) => {
            selectMenuTreeApi().then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
            })
        })
    },
    /**
     * 根据用户ID查询菜单资源ID集合
     * @param commit
     * @param dispatch
     * @param params
     * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
     * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
     */
    selectUserResourceIds({ commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
            selectUserResourceIdsApi(params).then(res => {
                resolve(res)
            }).catch(error =>{
                sendNotification(error.msg,error.type,3000);
            })
        })
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}