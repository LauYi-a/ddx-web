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
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  getSysParamConfig({ commit, dispatch}) {
    return new Promise((resolve, reject) => {
      getSysParamConfigApi().then(res => {
        resolve(res)
      }).catch(error =>{
        console.log(error)
      })
    })
  },

  /**
   * 修改系统参数配置
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  updateParamConfig({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      updateParamConfigApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(res.msg,res.type,3000);
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