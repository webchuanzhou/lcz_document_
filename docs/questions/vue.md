<!--
 * @Author: lcz
 * @Date: 2021-12-14 09:40:52
 * @LastEditTime: 2021-12-14 09:46:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\questions\vue.md
-->

## .sync 修饰符的原理

```html
// 正常父传子：
<com1 :a="num" :b="num2"></com1>

// 加上sync之后父传子：
<com1 :a.sync="num" .b.sync="num2"></com1>

// 它等价于
<com1 :a="num" @update:a="val=>num=val" :b="num2" @update:b="val=>num2=val"></com1>
```

子组件

```js
this.$emit('update:a', 222)
```
