
/*
	**目的解决app 下全局变量跑不起app报错
	** 需要修改node_modules/encryptlong/bin/jsencrypt.js 文件
	* 操作步骤1 'use strict'下添加
	*  var modificationNavigator = {
		appName: 'Netscape',
		userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 	(KHTML, like  	 Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
	  };
	   var modificationWindow = {
		ASN1: null,
		Base64: null,
		Hex: null,
		crypto: null,
		href: null
	  };
	  操作步骤2 navigator全部替换为 modificationNavigator 
	  window全部替换为 modificationWindow
*/
//rsa加密
// const {JSEncrypt} = require('encryptlong')
import { JSEncrypt } from 'encryptlong'
//公钥
var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaNNQuK9ELromIcGY+54dV9vr+5sxEdB4lSIkSI2v5x5bzL3Fwr/DBGv6r9tijvk+d5QnOE9PxRSqP8fHRM0ahPyWoVLEimKnqi5Hdq5YpXMzCvMu3VlbRfEd6U5e089tyG6XyxMUl/qcTSH/7ME3l3MbU3k5qcRw4Ouihu/D+hQIDAQAB';
//私钥 MIICXQIBAAKBgQCaNNQuK9ELromIcGY+54d
var PRIVATE_KEY = 'V9vr+5sxEdB4lSIkSI2v5x5bzL3Fwr/DBGv6r9tijvk+d5QnOE9PxRSqP8fHRM0ahPyWoVLEimKnqi5Hdq5YpXMzCvMu3VlbRfEd6U5e089tyG6XyxMUl/qcTSH/7ME3l3MbU3k5qcRw4Ouihu/D+hQIDAQABAoGBAIQaQ7a2BKR8RgfjOkQjNhYXudfKQi1WSEjqRbqLK8HUEOWNvCGsJ5RWGtuYYOiNbUk3X9nxtHwZI6givWTZB2Rg4LjeOZ5ommlNJTXLq03eu2Igd8YU8o7EnlRHG3PlM2AQOt9nDP390kfTWAvMhifm6PlBE/I4pNd+FCfS3+hBAkEAy0coV2FLfIo8Q0H9kJkS4g1ekKBwEJsDmfouUEq8F7T7tDINLazGtBHbjiuQCTuDCYUeMTdHfhY7fPuCuaSIlQJBAMIzg4TeFHJzTsQgRq2nVYOHUyf1+NYUbfRV39WmOtnKpmlMut60b2uO2Wo7sLD5Pc7/mJAmBK7ujKKpDG1+8jECQFrP+UfAIZcLsoxhiMP2fqcaTerSof3pIpzBVbttB8aXhfMkgRqsm0CK0ckb0Qcu3QV9wNU/2uKLUBwvyGDjDlkCQCuADn28oSfh3EriT/KmAOmtblsNJegOO3L3qWPaEGSomA4OOe2YzTxyixDYvgNmUQoFBs+DNJlapfXpl/cO8IECQQCumtnOKclhm7qnpwvewnkY+DE1+c1jLSs4ySyqOPZnI0EJDUflw+ZXX+Hb1H/JG3f/7nqwy5mQ2cS9iD0wh57x';
//加密实体类
var encrypt = new JSEncrypt();
encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');

//解密实体类
var decrypt = new JSEncrypt();
decrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----'+PRIVATE_KEY+'-----END RSA PRIVATE KEY-----');

//加密方法
export function addEncrypt(val){
	// return encrypt.encrypt(val)
	return encrypt.encryptLong(val)
}
//解密方法
export function solutionEncrypt(encrypted){
	return decrypt.decrypt(encrypted);
	// return decrypt.encryptLong(encrypted);
}
