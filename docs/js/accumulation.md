<!--
 * @Author: your name
 * @Date: 2021-10-09 09:47:16
 * @LastEditTime: 2021-10-09 09:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\accumulation.md
-->
## 1.require 如何动态循环引入img图片 ，因为有hash 不能正常引入？
解决：对象的方式引入
```js
let abc = {
  title:item.title,
  img:require(item.img)
}
```

