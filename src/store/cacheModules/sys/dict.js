import { getModulesAllGroupDictKeyValueApi } from '@/api/sys/dict'
const state = () => ({
  sysDict: '' // 系统字典
});

// getters
const getters = {
  sysDict(state) {
    return state.sysDict
  }
};

// mutations
const mutations = {
  sysDictChange(state, sysDict) {
    state.sysDict = sysDict
  }
};

// actions
const actions = {

  /**
   * 获取系统模块组全部字典键值
   * @param commit
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  getModulesAllGroupDictKeyValue({ commit }) {
    return new Promise((resolve, reject) => {
      getModulesAllGroupDictKeyValueApi().then(res => {
        commit('sysDictChange', res.data);
        resolve(res)
      }).catch(error =>{
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