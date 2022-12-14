import { getUserMenuApi, loginOutApi,loginApi,getUserInfoByIdApi,passwordChangeApi,updateByUserIdApi,selectUserListApi,
  deleteUserInfoByIdApi,batchDeleteUserInfoByIdsApi,userAddApi,userEditApi } from '@/api/sys/user'
import toolUtils from '@/utils/system/toolUtils'
import store from '@/store'

const state = () => ({
  token: '',  // 登录token
  menus: [],  // 用户菜单
  menuEl: [], // 用户菜单元素
  services:[] // 用户所有服务
});

// getters
const getters = {
  token(state) {
    return state.token
  },
  menus(state) {
    return state.menus
  },
  menuEl(state) {
    return state.menuEl
  },
  services(state){
    return state.services
  }
};

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  },
  menusChange(state, menus) {
    state.menus = menus
  },
  menuElChange(state, menuEl) {
    state.menuEl = menuEl
  },
  servicesChange(state,services){
    state.services = services
  }
};

// actions
const actions = {

  /**
   * 登入方法
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  login({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      loginApi(params).then(res => {
        commit('tokenChange', res.data);
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },

  /**
   * 获取用户菜单
   * @param commit
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  getUserMenu({ commit }, params) {
    return new Promise((resolve, reject) => {
      getUserMenuApi(params).then(res => {
        commit('menusChange', res.data.treeMenu)
        commit('menuElChange', res.data.menuEl)
        commit('servicesChange',res.data.serviceList)
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
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