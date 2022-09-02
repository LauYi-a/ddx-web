import { getUserMenuApi, loginOutApi,loginApi,getUserInfoByIdApi,passwordChangeApi,updateByUserIdApi,selectUserListApi,
  deleteUserInfoByIdApi,batchDeleteUserInfoByIdsApi,userAddApi,userEditApi } from '@/api/sys/user'
import { sendNotification } from '@/utils/system/toolUtils'
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
        sendNotification(error.msg,error.type,3000);
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
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },

  /**
   * 根据用户id查询用户详细信息
   * @param commit
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  getUserInfoById({ commit }) {
    let params = {
      id: store.state.user.token.user_id
    };
    return new Promise((resolve, reject) => {
      getUserInfoByIdApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
      })
    })
  },
  /**
   * 获取用户列表数据
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  selectUserList({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      selectUserListApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },
  /**
   * 修改用户密码
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  passwordChange({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      passwordChangeApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
      })
    })
  },
  /**
   * 根据用户 userId 修改用户基本信息
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  updateByUserId({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      updateByUserIdApi(params).then(res => {
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
  deleteUserInfoById({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      deleteUserInfoByIdApi(params).then(res => {
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
  batchDeleteUserInfoByIds({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      batchDeleteUserInfoByIdsApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },

  /**
   * 新增用户
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  userAdd({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      userAddApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },
/**
   * 编辑用户
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  userEdit({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      userEditApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  },

  /**
   * 退出登入
   * @param commit
   */
  loginOut({ commit }) {
    loginOutApi().then(res => {})
    .catch(error =>{})
    .finally(() => {
      localStorage.clear()
      location.reload()
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