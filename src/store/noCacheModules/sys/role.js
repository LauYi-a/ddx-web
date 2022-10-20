import { selectPageRoleListApi,selectRoleKyeAndValAllApi,roleAddApi,deleteRoleInfoByIdApi,batchDeleteRoleInfoByIdsApi,roleEditApi } from '@/api/sys/role'
import toolUtils from '@/utils/system/toolUtils'

  /**
   * 分页获取角色
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  function selectPageRoleList(params) {
    return new Promise((resolve, reject) => {
      selectPageRoleListApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  };

  /**
   * 查询所有角色键值
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  function selectRoleKyeAndValAll() {
    return new Promise((resolve, reject) => {
      selectRoleKyeAndValAllApi().then(res => {
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
      })
    })
  };
  /**
   * 新增角色
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  function roleAdd(params) {
    return new Promise((resolve, reject) => {
      roleAddApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  };
  /**
   * 修改角色
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  function roleEdit(params) {
    return new Promise((resolve, reject) => {
      roleEditApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  };
  /**
   * 根据用户 id 删除用户信息
   * @param commit
   * @param dispatch
   * @param params
   * @returns {Promise<any>} resolve 正常返回数据 reject 返回异常数据
   * 如果调用者需要 finally 则需要返回  reject(error) 不然 finally 将会失效
   */
  function deleteRoleInfoById(params) {
    return new Promise((resolve, reject) => {
      deleteRoleInfoByIdApi(params).then(res => {
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
  function batchDeleteRoleInfoByIds(params) {
    return new Promise((resolve, reject) => {
      batchDeleteRoleInfoByIdsApi(params).then(res => {
        resolve(res)
      }).catch(error =>{
        toolUtils.sendNotification(error.msg,error.type,3000);
        reject(error)
      })
    })
  };

const role = {
  selectPageRoleList,
  selectRoleKyeAndValAll,
  roleAdd,
  roleEdit,
  deleteRoleInfoById,
  batchDeleteRoleInfoByIds
}
export default role