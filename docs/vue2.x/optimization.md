<!--
 * @Author: lcz
 * @Date: 2021-10-09 09:51:51
 * @LastEditTime: 2021-10-09 09:54:51
 * @LastEditors: Please set LastEditors
 * @Description: vue2.x 代码优化
 * @FilePath: \lcz_document\docs\vue2.x\optimization.md
-->

## 1.通过$once来监听定时器，在beforeDestroy钩子可以被清除。
```js
  this.$once('hook:beforeDestroy', () => { 
    clearInterval(timer); 
  })
```

## 2.v-if 与 v-for 同时的时候的优化:
```html
<template v-for="item in 10"> 
  <div v-if="item % 2 == 0" :key="item">{{item}}</div>
</template>
```
## 3.子组件修改父组件的props
```html
父组件: :title.sync="title" .sync的作用
子组件: this.$emit('update:title', 'hello') //update 生命周期的作用

```
## 4.create中的watch 监听可以卸载
```html
  let unwatchFn = this.$watch('count', function(){ console.log('count 新值：'+newVal) })
  this.count = 2 // log: count 新值：2 
  unwatchFn()
  this.count = 3 // 什么都没有发生...
```