
/**
 * 字典键值格式化
 * @param value 格式化值
 * @param dict 字典键值
 */
export function formatterDict(dictKeyVal,value){
    let fmtValue = value;
    if(dictKeyVal){
        for (let index = 0; index < dictKeyVal.length; index++) {
            let dict =  dictKeyVal[index]
            if (value == dict.key) {
                fmtValue = dict.value;
                break;
            }
        }
    }
    if(fmtValue){
        return fmtValue
    }else{
        return value
    }
}