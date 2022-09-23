import { selectPageRoleListApi,selectRoleKyeAndValAllApi,roleAddApi,deleteRoleInfoByIdApi,batchDeleteRoleInfoByIdsApi } from '@/api/sys/role'
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
   * 分页获取角色
   * @param commit
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  selectPageRoleList({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      selectPageRoleListApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },

  /**
   * 查询所有角色键值
   * @param commit
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  selectRoleKyeAndValAll({ commit }) {
    return new Promise((resolve, reject) => {
      selectRoleKyeAndValAllApi().then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
      })
    })
  },
  /**
   * 新增角色
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  roleAdd({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      roleAddApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },
  /**
   * 根据用户 id 删除用户信息
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  deleteRoleInfoById({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      deleteRoleInfoByIdApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
      })
    })
  },
  /**
   * 根据用户 id 删除用户信息
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  batchDeleteRoleInfoByIds({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      batchDeleteRoleInfoByIdsApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
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