import { selectPageRoleListApi,selectRoleKyeAndValAllApi } from '@/api/sys/role'
import { sendNotification } from '@/utils/system/toolUtils'
import store from '@/store'

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
   */
  selectPageRoleList({ commit }, params) {
    return new Promise((resolve, reject) => {
      selectPageRoleListApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
      })
    })
  },

  /**
   * 查询所有角色键值
   * @param commit
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   */
  selectRoleKyeAndValAll({ commit }) {
    return new Promise((resolve, reject) => {
      selectRoleKyeAndValAllApi().then(res => {
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