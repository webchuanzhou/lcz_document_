<!--
 * @Author: your name
 * @Date: 2021-03-25 11:09:06
 * @LastEditTime: 2021-03-25 11:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\ddH5.md
-->
# 钉钉微应用总结
开发的是企业内部应用


## 创建应用
钉钉开发平台
1.创建H5微应用
  可获取到 AgentId ，AppKey ， AppSecret 后台使用
2.开发管理中 配置服务器请求 IP：
配置域名或者访问ip
3.权限管理中开通后台需要请求读取的权限，一般通讯录为主
4.监控中心 主要用户钉钉RC版可以打开控制台F12
5.最终发布

钉钉管理后台
1.增加角色组，增加角色，主要用于web端的路由权限

## 依赖，获取登录权限
安装依赖 dingtalk-jsapi

corpId: 获取微应用的code  与后台换取token
```html
  import * as dd from 'dingtalk-jsapi'
  export function getCode(callback) {
    let corpId = 'ding9bc4eeaaec2c9391a1320dcb25e91351'
    if (dd.env.platform !== 'notInDingTalk') {
        dd.ready(() => {
            //使用SDK 获取免登授权码
            dd.runtime.permission.requestAuthCode({
                corpId: corpId,
                onSuccess: info => {
                    // 根据钉钉提供的api 获得code后,再次调用这个callback方法
                    // 由于是钉钉获取code是异步操作,不知道什么时候执行完毕
                    // callback 函数会等他执行完毕后在自己调用自己
                    callback(info.code)
                },
                onFail: err => {
                    alert(err)
                }
            })
        })
    }
}
```

