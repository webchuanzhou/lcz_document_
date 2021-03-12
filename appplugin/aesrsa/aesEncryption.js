import {addEncrypt,solutionEncrypt} from './encryption.js'
import {randomString , stringfenge} from '../utils/index.js'
import CryptoJS from 'crypto-js'
// const CryptoJS = require('crypto-js');

// var data1={
// 	name:'lilei',
// }
// var aesAdd = aesAddEncrypt(data1);
// console.log(aesAdd,'请求接口加密aes');
// var paramsKey = aesAdd.split(";=:=;")[0];
// var paramsAes = aesAdd.split(";=:=;")[1];
// // console.log(solutionEncrypt(paramsAes),'解密RSA的aes')
// var jiemipams = JSON.parse(solutionEncrypt(paramsKey));
// var jiemipams2 = JSON.parse(solutionEncrypt(paramsAes));

// console.log(jiemipams,jiemipams2,'解密参数')
// console.log(aesOpenEncrypt(jiemipams2,jiemipams))
// aesOpenEncrypt()
//aes加密 
export function aesAddEncrypt(data1){
	var math1 = randomString(16);
	var math2 = randomString(16);
	//随机生成数字
	// var key = CryptoJS.enc.Utf8.parse(randomString(16))
	// var iv = CryptoJS.enc.Utf8.parse(randomString(16))
	var key = CryptoJS.enc.Utf8.parse(math1)
	var iv = CryptoJS.enc.Utf8.parse(math2)
	var encrypt = CryptoJS.AES.encrypt(JSON.stringify(data1), key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	// var encryptString = encrypt.toString();
	// var rsa = addEncrypt(encryptString);
	
	var encryptStringArr = stringfenge(encrypt.toString());
	var encryptStringArrAdd = encryptStringArr.map((el)=>{
		return addEncrypt(el) 
	})
	var rsa = encryptStringArrAdd.join(";=:=;")
	
	var allJson = {
		key:math1,
		iv:math2,
	}
	//rsa加密
	var rsaAddEncrypt = addEncrypt(JSON.stringify(allJson));
	//key vi + aes加密传后端
	var rsaAddEncrypt2 = rsaAddEncrypt + ";=:=;" + rsa;
	return rsaAddEncrypt2
}

//aes解密
// function aesOpenEncrypt(data,endData){
// 	console.log(data,endData,'aes解密参数')
// 	var decrypt =  CryptoJS.AES.decrypt(data,CryptoJS.enc.Utf8.parse(key), {
// 		iv: CryptoJS.enc.Utf8.parse(iv),
// 		mode: CryptoJS.mode.CBC,
// 		padding: CryptoJS.pad.Pkcs7
// 	});
// 	var data3=JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
// 	console.log(data3,'解出参数')
// 	return data3
// }























// var aseKey = '1234567890123456789012335475';//秘钥
// var key = CryptoJS.enc.Utf8.parse(aseKey);//将秘钥转换成Utf8字节数组
// var iv = CryptoJS.enc.Utf8.parse(aseKey.substr(0,16))
// console.log(key,'aes加密key')
// console.log(iv,'aes加密iv')
//rsa加密
// var key2 = addEncrypt(key);
// var iv2 = addEncrypt(iv)
// console.log(key2,'rsa加密key')
// console.log(iv2,'rsa加密iv')




// //ras 解密
// var jie1 = solutionEncrypt(data5);
// console.log(jie1,'jie1')
// var endData = JSON.parse(jie1);

// //eas解密
// var decrypt = CryptoJS.AES.decrypt(endData.data2, endData.key, {
// 	iv: endData.iv,
// 	mode: CryptoJS.mode.CBC,
// 	padding: CryptoJS.pad.Pkcs7
// });
// var data3=JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));//解密后的数据
// console.log(data3,'end')

