import CryptoJS from "crypto-js";
let aseKey = "surf7771995"; //秘钥必须为：8/16/32位
//加密
export function encrypt(payload) {
  return CryptoJS.AES.encrypt(payload, aseKey).toString();
}

//解密
export function decrypt(payload) {
  return CryptoJS.AES.decrypt(payload, aseKey).toString(CryptoJS.enc.Utf8);
}
