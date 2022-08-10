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
   */
  getModulesAllGroupDictKeyValue({ commit }) {
    getModulesAllGroupDictKeyValueApi().then(res => {
      commit('sysDictChange', res.data)
    }).catch(error =>{
      console.log(error)
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