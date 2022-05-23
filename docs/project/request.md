<!--
 * @Author: your name
 * @Date: 2021-03-12 10:15:45
 * @LastEditTime: 2022-05-23 10:55:55
 * @LastEditors: lcz
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\request.md
-->

## 请求封装 uni.request

```html
<!-- const BASE_URL = 'http://8.210.130.53:5000' -->
const BASE_URL = 'api/xxx' export const requestApi = options => { return new Promise((resolve, reject) => { const token
= uni.getStorageSync('token') const language = uni.getStorageSync('language') uni.request({ url: BASE_URL, method:
options.method || 'GET', data: options.data || {}, header: { Authorization: `Basic ${token}`, language: language, },
success: res => { //token 失效 或者被顶号 if (res.data.status == '1004' || res.data.status == '1002') { uni.showToast({
title: res.data.msg, duration: 2000, icon: 'none', }) setTimeout(() => { return uni.removeStorage({ key: 'token',
success() { uni.navigateTo({ url: '/pages/login/auth', }) }, }) }, 2000) } if (res.data.status != '1') {
resolve(res.data) return uni.showToast({ title: res.data.msg, duration: 2000, icon: 'none', }) } resolve(res.data) },
fail: err => { // uni.showToast()({ // title: '请求接口失败', // duration: 2000 // icon: "none" // })
console.log('请求接口失败') reject(err) }, }) }) }
```

## flyio

```js
import storage from './storage'
import encrypt from './encrypt'
import qs from 'qs'
import { baseUrl, NoSignature } from '@/config/env'
import store from '../store'
let Fly = null
// #ifdef H5
Fly = require('flyio/dist/npm/fly')
// #endif
// #ifdef MP-WEIXIN || APP-PLUS
Fly = require('flyio/dist/npm/wx')
// #endif

const fly = new Fly()

//设置超时
fly.config.timeout = 30000
//设置请求基地址
fly.config.baseURL = baseUrl

const codeMessage = {
  400: '请求错误',
  401: '请重新登录',
  403: '拒绝访问',
  404: '请求地址错误',
  500: '服务器错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

// 异常拦截器
const errorHandler = error => {
  uni.hideLoading()
  uni.stopPullDownRefresh()
  // 在当前页面隐藏导航条加载动画
  uni.hideNavigationBarLoading()
  if (error.response) {
    const status = error.response.status
    if (status === 401) {
      storage.remove('ACCESS_TOKEN')
      // 去登陆
      setTimeout(() => {
        if (getCurrentPages().pop().route !== 'pages/user/login') {
          uni.reLaunch({
            url: '/pages/user/login',
          })
        }
      }, 1000)
    }
    codeMessage[status] &&
      uni.showToast({
        title: codeMessage[status],
        icon: 'none',
        position: 'bottom',
      })
  } else {
    uni.showToast({
      title: '请求失败',
      icon: 'none',
      position: 'bottom',
    })
  }
  return Promise.reject(error)
}

// 请求拦截器
fly.interceptors.request.use(config => {
  const token = storage.get('ACCESS_TOKEN')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  if (config.method === 'get') {
    config.paramsSerializer = params =>
      // get 方式key 可以重复
      qs.stringify(params, {
        arrayFormat: 'repeat',
      })
  }
  return NoSignature.includes(config.url.includes('?') ? config.url.split('?')[0] : config.url)
    ? config
    : encrypt(config)
}, errorHandler)

function resetLogin() {
  uni.hideToast()
  uni.showToast({
    title: '请重新登录',
    icon: 'none',
  })
  storage.remove('ACCESS_TOKEN')
  //重写登陆页面
  setTimeout(() => {
    if (getCurrentPages().pop().route !== 'pages/user/login') {
      uni.reLaunch({
        url: '/pages/user/login',
      })
    }
  }, 1000)
}

// 响应拦截器
fly.interceptors.response.use(({ data }) => {
  uni.hideLoading()
  uni.stopPullDownRefresh()
  // 在当前页面隐藏导航条加载动画
  uni.hideNavigationBarLoading()
  switch (data.status) {
    case 401:
      resetLogin()
      break
    case 1003: //被他人顶了
      resetLogin()
      break
    case 1002:
      storage.set('ACCESS_TOKEN', data.NewToken)
      break
    case 2001:
      store.dispatch('setPhone', true)
      //弹出绑定手机框
      uni.showToast({
        title: data.msg,
        icon: 'none',
      })
      return data
    case 200:
      return data
    default:
      let errorMsg = data?.errorMsg || data?.msg || data?.message
      if (!errorMsg || errorMsg.length > 20) errorMsg = '请求错误'
      uni.showToast({
        title: errorMsg,
        icon: 'none',
        position: 'bottom',
      })
      break
  }
  return data
}, errorHandler)

export default fly
```
