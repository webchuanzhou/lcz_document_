<!--
 * @Author: your name
 * @Date: 2021-03-12 10:15:45
 * @LastEditTime: 2021-03-12 10:18:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\request.md
-->

## 请求封装
```html
  <!-- const BASE_URL = 'http://8.210.130.53:5000' -->
  const BASE_URL = 'api/xxx'
  
export const requestApi = options => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')
    const language = uni.getStorageSync('language')
    uni.request({
      url: BASE_URL,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        Authorization: `Basic ${token}`,
        language: language,
      },
      success: res => {
        //token 失效 或者被顶号
        if (res.data.status == '1004' || res.data.status == '1002') {
          uni.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none',
          })
          setTimeout(() => {
            return uni.removeStorage({
              key: 'token',
              success() {
                uni.navigateTo({
                  url: '/pages/login/auth',
                })
              },
            })
          }, 2000)
        }
        if (res.data.status != '1') {
          resolve(res.data)
          return uni.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none',
          })
        }
        resolve(res.data)
      },
      fail: err => {
        // uni.showToast()({
        // 	title: '请求接口失败',
        // duration: 2000
        // 	icon: "none"
        // })
        console.log('请求接口失败')
        reject(err)
      },
    })
  })
}

```