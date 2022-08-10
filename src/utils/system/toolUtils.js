import {ElNotification} from 'element-plus'

/**
 * 获取表格 id 集合
 * @param data
 * @param id
 */
export function arrayIdList(data,id) {
    let arry = [];
    data.forEach(res => {
        arry.push(res[id])
    });
    return arry
}

/**
 * 校验表格多选框是否多选
 * @param multipleSelection
 */
export function validationMultipleSelection(multipleSelection) {
    if (multipleSelection.length>=1) {
        return true
    }
    sendNotification('批量操作必须选择一项进行操作','warning',3000);
    return false
}

/**
 * 弹出通知消息
 * @param msg
 * @param type
 * @param time
 */
export function sendNotification(msg,type,time){
    ElNotification({
        message: msg,
        type: type,
        offset: 25,
        duration: time
    });
}