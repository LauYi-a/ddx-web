
/**
 * 字典键值格式化 返回字典 value
 * @param dictKeyVal 字典键值
 * @param value 格式化值
 */
export function formatterDictVal(dictKeyVal,value){
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

/**
 * 字典键值格式化 返回字典 desc
 * @param dictKeyVal 字典键值
 * @param value 格式化值
 */
export function formatterDictDesc(dictKeyVal,value){
    let fmtValue = value;
    if(dictKeyVal){
        for (let index = 0; index < dictKeyVal.length; index++) {
            let dict =  dictKeyVal[index]
            if (value == dict.key) {
                fmtValue = dict.desc;
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