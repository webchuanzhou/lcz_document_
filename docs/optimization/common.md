<!--
 * @Author: lcz
 * @Date: 2021-05-08 14:55:37
 * @LastEditTime: 2021-07-15 14:41:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\optimization\common.md
-->
## async await 封装拦截报错 减少疯狂 try catch

新建to.js
```html
  export default function to(callback) {
    return callback.then(data => [null, data] ).catch(err => [err, null])
  }
```
使用
```html
  import to from './to.js';
  const [err, res] = await to(aa())
  if(!res) throw new CustomerError('No user found');
  if (err) console.error('Just log the error and continue flow');
```

## 监听网络状态优化 主要场景 视频播放卡顿等

可以封装组件 断网的时候增加遮罩层
```html
var connection = navigator.connection；
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log("网络状况从 " + type + " 切换至" + connection.effectiveType);
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);

```

## 表单提交规则验证优化
新建regFrom.js
```html
/**
 * @description: 数组循环调用对象判断
 * @param {*} arr
 * @param {*} from
 * @param {*} el key
 * @return {*}
 */
function arrMap(arr, from, el) {
  let returnInfo = [null, true]
  for (let i = 0, lenght = arr.length; i < lenght; i++) {
    let [error, status] = rzObject(arr[i], from, el)
    if (!status) {
      returnInfo = [error, status]
      break
    }
  }
  return returnInfo
}

/**
 * @description: 对象判断验证是否成功
 * @param {*} rzObj
 * @param {*} from
 * @param {*} el
 * @return {*}
 */

function rzObject(rzObj, from, el) {
  let value = from[el]
  if (rzObj.require && value.length <= 0) {
    return [rzObj.errorMsg, false]
  }
  if (rzObj.reg && !rzObj.reg.test(value) && value.length > 0) {
    return [rzObj.errorMsg, false]
  }
  return [null, true]
}

/**
 * @description: 表单规则验证
 * @param {*} from
 * @param {*} rule
 * @return {*}
 */

export default function regFrom(from, rule) {
  const formArr = Object.keys(from)
  let info = [null, true]
  for (let i = 0, lenght = formArr.length; i < lenght; i++) {
    const item = rule[formArr[i]]
    if (item === undefined || item === null) {
      continue
    }
    if (Array.isArray(item)) {
      var [error, status] = arrMap(item, from, formArr[i])
    } else if (item.constructor === Object) {
      var [error, status] = rzObject(item, from, formArr[i])
    }
    if (!status) {
      info = [error, status]
      break
    }
  }
  return info
}
```
main.js 全局挂载验证方法
```html
  import regFrom from '@utils/regFrom'
  app.config.globalProperties.$regFrom = regFrom
```
页面应用
```html

  const rules = {
    phone: [
      {
        require: true,
        errorMsg: '请输入账号',
      },
      {
        reg: /^1[3456789]\d{9}$/,
        errorMsg: '手机号码不合法',
      },
    ],
    password: {
      require: true,
      errorMsg: '请输入密码',
    },
  }

  const regFrom = proxy.$regFrom
  let [errInfo, status] = regFrom(state.form, rules)
  if (errInfo && !status) {
    return Toast.fail(errInfo)
  }
  
```

## 前端项目工程化webpack
```html
  //获取moudules文件下所有js文件；
  const modulesFiles = require.context('./dirFun', true, /\.js$/)
  const event = modulesFiles.keys().reduce((modules, modulePath) => {
    //获取文件名
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    //文件路径获取值（value）
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})

```
event 是一个object key value 的形式


## 前端项目工程化vite2
```html
  const files = import.meta.globEager('./modules/*.js')

  const modules: any = {}
  for (const key in files) {
    modules[key.replace(/(\.\/module\/|\.js)/g, '')] = files[key].default
  }

  Object.keys(modules).forEach(item => {
    modules[item]['namespaced'] = true
  })
  
```