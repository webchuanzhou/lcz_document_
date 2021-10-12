<!--
 * @Author: lcz
 * @Date: 2021-03-11 16:26:54
 * @LastEditTime: 2021-10-12 17:25:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\fetch.md
-->
## fetch封装
```js
  import configs from '@/../config/config'
export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = configs[configs['Edition']].axiosUrl + url

  if (type == 'GET') {
    let dataStr = '' //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include', //（ 允许 cookie 共享，跨域问题，传Cookie是必须配置）
      method: type,
      headers: {
        Accept: 'application/json', // 用户代理可处理的媒体类型// 用户代理可处理的媒体类型
        'Content-Type': 'application/json' // 报文主体对象类型
      },
      mode: 'cors', // 跨域
      cache: 'force-cache' //缓存 default
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    // 如果浏览器不支持 fetch
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if (type == 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}

//使用方式

 async GetIndexBanner(){
   const res = await fetch('/api/GcMember/Notice/GetIndexBanner', {
       page: '1',
       pageSize: '6'
   });
   console.log(res,111)
   const data = res.response;
   this.bannerList = data.data;
 }
```