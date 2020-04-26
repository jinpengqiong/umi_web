import CryptoJS from 'crypto-js';

export default {
  AES_CBC_PKCS5PaddingEncrypt(message) {
    const aesKey = '3sdZO19fHwEH3e9K0gFKnJAUUmR*WJae';
    const aesIV = 'jZufio8AV7ztf*Pg';

    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesIV);
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  AES_CBC_PKCS5PaddingDecrypt(message) {
    const aesKey = '3sdZO19fHwEH3e9K0gFKnJAUUmR*WJae';
    const aesIV = 'jZufio8AV7ztf*Pg';

    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesIV);
    const decrypted = CryptoJS.AES.decrypt(message, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8).toString();
    return result;
  },
  AESDecrypt(string, key) {
    const bytes = CryptoJS.AES.decrypt(string, key);
    const value = bytes.toString(CryptoJS.enc.Utf8);
    return value;
  },
  AESEncrypt(value, key) {
    const securityValue = CryptoJS.AES.encrypt(value, key).toString();
    return securityValue;
  },
};
