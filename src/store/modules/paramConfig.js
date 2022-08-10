import { getSysParamConfigApi,updateParamConfigApi } from '@/api/sys/paramConfig'
import { sendNotification } from '@/utils/system/toolUtils'
const state = () => ({
})

// getters
const getters = {
};

// mutations
const mutations = {
};

// actions
const actions = {

  /**
   * 获取系统参数配置
   * @param commit
   * @param dispatch
   * @returns {Promise<any>}
   */
  getSysParamConfig({ commit, dispatch}) {
    return new Promise((resolve, reject) => {
      getSysParamConfigApi().then(res => {
        resolve(res)
      }).catch(error =>{
        reject(error)
      })
    })
  },

  /**
   * 修改系统参数配置
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>}
   */
  updateParamConfig({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      updateParamConfigApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(res.msg,res.type,3000);
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