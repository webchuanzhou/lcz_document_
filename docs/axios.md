<!--
 * @Author: lcz
 * @Date: 2021-03-11 16:28:18
 * @LastEditTime: 2021-03-11 17:16:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\axios.md
-->
## axios
```html
<!-- 部分库需要自行改动 -->
import axios from 'axios'
import { Message ,Notification } from 'element-ui'
import store from '../store'
import { getCookie , setCookie } from '@/utils/auth'
import qs from 'qs'
import * as configs from '@/../config/config'
const BASE_API = configs[configs.Edition].axiosUrl
// const BASE_API = process.env.NODE_ENV === "development" ? '/test' : configs[configs.Edition].axiosUrl


//取消请求 和axios 标识 + JSON.stringify(config.data) 
let pending = []
const CancelToken = axios.CancelToken
let removePending = (config) => {
	for (let p in pending) {
		if (pending[p].u === config.url + '&' + config.method) {
			pending[p].f()
			pending.splice(p, 1)
		}
	}
}

// 创建axios实例
const service = axios.create({
	// baseURL: process.env.BASE_API, // api 的 base_url
	baseURL: BASE_API,
	timeout: 30000 // 请求超时时间
})

//设置默认请求头格式
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// request拦截器
service.interceptors.request.use(
	config => {
		if (config.method === 'post' || config.method === 'put') {
			if (config.headers['Content-Type'] === 'application/json; charset=UTF-8') {
				
			}else if (config.headers.post['Content-Type'] === 'application/x-www-form-urlencoded') {
				config.data = qs.stringify(config.data)
			}
		}
		if (config.method === 'get' ) {
			if(config.data){
				Object.keys(config.data).forEach(function(key){
					if(config.data[key]==''){
						config.data[key]=undefined
					}
				});
				config.url +='?'+ qs.stringify(config.data)
			}
		}
		if (getCookie('token')) {
			config.headers['Authorization'] = 'Bearer '+getCookie('token') // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		//取消请求 tab切换等
		removePending(config)
		config.cancelToken = new CancelToken((c) => {
			// 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式 JSON.stringify(config.data) +
			pending.push({ u: config.url +  '&' + config.method, f: c })
		})

		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
  	response => {
		//取消数组中的请求
		removePending(response.config)
		// 200 请求成功 1002 请求成功token 更新  0 错误  401 token过期重新登陆 403 404 500 2001账号没绑定
		const res = response.data
		//请求不成功操作
		if (res.status !== 200 &&  res.status !== 1002) {
			Notification({
				title: '错误',
				message: res.msg,
				duration:2000,
				type:"error",
			});
			//token 过期重新登陆
			if(res.status == 401){
				store.dispatch('LayOut').then(()=>{
					// location.reload();
				})
			}
			return Promise.reject('error')
		//请求成功操作
		} else {
			//更新token 
			if(res.status == 1002){
				setCookie('token',res.NewToken)
			}
			return res
		}
	},
	error => {
		return Promise.reject(error)
	}
)
//表示跨域请求时是否需要使用凭证
service.defaults.withCredentials = true
export default service

```