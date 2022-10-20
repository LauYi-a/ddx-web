
/**
 * 字典键值格式化 返回字典 value
 * @param dictKeyVal 字典键值
 * @param value 格式化值
 */
function formatterDictVal(dictKeyVal,value){
    let fmtValue = value;
    if(dictKeyVal){
        for (let index = 0; index < dictKeyVal.length; index++) {
            let dict =  dictKeyVal[index]
            if (value === dict.key) {
                fmtValue = dict.value;
                break;
            }
        }
    }
    return fmtValue
}

/**
 * 字典键值格式化 返回字典 desc
 * @param dictKeyVal 字典键值
 * @param value 格式化值
 */
function formatterDictDesc(dictKeyVal,value){
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
    return fmtValue
}

const dictUtils = {
  formatterDictVal,
  formatterDictDesc
};

export default dictUtils