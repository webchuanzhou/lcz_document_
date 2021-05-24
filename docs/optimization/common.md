<!--
 * @Author: lcz
 * @Date: 2021-05-08 14:55:37
 * @LastEditTime: 2021-05-17 11:59:11
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