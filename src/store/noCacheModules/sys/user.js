import { loginOutApi,getUserInfoByIdApi,passwordChangeApi,updateByUserIdApi,selectUserListApi,
  deleteUserInfoByIdApi,batchDeleteUserInfoByIdsApi,userAddApi,userEditApi } from '@/api/sys/user'
import toolUtils from '@/utils/system/toolUtils'
import store from '@/store'

/**
 * 根据用户id查询用户详细信息
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function getUserInfoById() {
  let params = {
    id: store.state.user.token.user_id
  };
  return new Promise((resolve, reject) => {
    getUserInfoByIdApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
    })
  })
};
/**
 * 获取用户列表数据
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function selectUserList(params) {
  return new Promise((resolve, reject) => {
    selectUserListApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
      reject(error)
    })
  })
};
/**
 * 修改用户密码
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function passwordChange(params) {
  return new Promise((resolve, reject) => {
    passwordChangeApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
    })
  })
};
/**
 * 根据用户 userId 修改用户基本信息
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function updateByUserId( params) {
  return new Promise((resolve, reject) => {
    updateByUserIdApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
    })
  })
};

/**
 * 根据用户 id 删除用户信息
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function deleteUserInfoById( params) {
  return new Promise((resolve, reject) => {
    deleteUserInfoByIdApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
    })
  })
};

/**
 * 根据用户 id 删除用户信息
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function batchDeleteUserInfoByIds(params) {
  return new Promise((resolve, reject) => {
    batchDeleteUserInfoByIdsApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
      reject(error)
    })
  })
};

/**
 * 新增用户
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function userAdd(params) {
  return new Promise((resolve, reject) => {
    userAddApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
      reject(error)
    })
  })
};
/**
 * 编辑用户
 * @param params
 * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
 * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
 */
function userEdit(params) {
  return new Promise((resolve, reject) => {
    userEditApi(params).then(res => {
      resolve(res)
    }).catch(error =>{
      toolUtils.sendNotification(error.msg,error.type,3000);
      reject(error)
    })
  })
};

/**
 * 退出登入
 */
function loginOut() {
  loginOutApi().then(res => {})
      .catch(error =>{})
      .finally(() => {
        localStorage.clear();
        location.reload()
      })
};

const user = {
  getUserInfoById,
  selectUserList,
  passwordChange,
  updateByUserId,
  deleteUserInfoById,
  batchDeleteUserInfoByIds,
  userAdd,
  userEdit,
  loginOut
}
export default user