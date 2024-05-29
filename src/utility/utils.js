export const encodeId = (id) => {
    return btoa(id);
};

export const decodeId = (encodedId) => {
    return atob(encodedId);
};
// import CryptoJS from 'crypto-js';

// // Khóa bí mật (cần được bảo mật)
// const secretKey = 'JAHS-AKSMD-SKDVM';

// // Hàm mã hóa id
// export const encodeId = (id) => {
//     const encryptedId = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
//     return encryptedId;
// };

// // Hàm giải mã id
// export const decodeId = (encodedId) => {
//     const decryptedBytes = CryptoJS.AES.decrypt(encodedId, secretKey);
//     const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);
//     return decryptedId;
// };