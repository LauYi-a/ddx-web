import CryptoJs from 'crypto-js'
import { systemKey } from '@/config'
const isProd = process.env.NODE_ENV === 'production'
/**
 * 加密
 */
export  function  encrypt(word) {
    if (isProd){
        let key = CryptoJs.enc.Utf8.parse(systemKey);
        let srcs = CryptoJs.enc.Utf8.parse(word);
        let encrypted = CryptoJs.AES.encrypt(srcs, key, {
            mode: CryptoJs.mode.ECB,
            padding: CryptoJs.pad.Pkcs7
        });
        return encrypted.toString();
    }
   return word
}

/**
 * 解密
 */
export  function  decrypt(word) {
    if (isProd){
        let key = CryptoJs.enc.Utf8.parse(systemKey);
        let decrypt = CryptoJs.AES.decrypt(word, key, {
            mode: CryptoJs.mode.ECB,
            padding: CryptoJs.pad.Pkcs7
        });
        return CryptoJs.enc.Utf8.stringify(decrypt).toString();
    }
   return word
}