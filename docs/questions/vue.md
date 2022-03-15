<!--
 * @Author: lcz
 * @Date: 2021-12-14 09:40:52
 * @LastEditTime: 2022-03-14 14:15:01
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

## render 函数使用场景

```html
level 1 level 1-1 level 1-2 level 1-2-1 level 1-2-2
```

> 我们的模板是这样写的，实际上 Stack 组件就是给每一个 slot 都增加一个左边距：

```jsx
<Stack size='10'>
  <div>level 1</div>
  <Stack size='10'>
    <div>level 1-1</div>
    <div>level 1-2</div>
    <Stack size='10'>
      <div>level 1-2-1</div>
      <div>level 1-2-2</div>
    </Stack>
  </Stack>
</Stack>
```

> 现在我们只用 template 是无法实现这种效果的，众所周知，template 只能把默认的 slot 渲染出来，它不能程序式处理 slot 的值。
> 我们先用 template 来实现这个组件，stack.html：

```jsx
const Stack = {
  props: {
    size: [String, Number],
  },
  template: `
    <div class="stack">
      <slot></slot>
    </div>
  `,
}
```

> 这样由于不能处理 slot 内容，那么它的表现效果如下，并没有层级缩进：

```html
level 1 level 1-1 level 1-2 level 1-2-1 level 1-2-2
```

> 我们现在尝试用 render 函数实现 Stack 组件：

```jsx
const { h } = Vue
const Stack = {
  props: {
    size: [String, Number],
  },
  render() {
    const slot = this.$slots.default ? this.$slots.default() : []

    return h(
      'div',
      { class: 'stack' },
      // 这里给每一项 slot 增加一个缩进 class
      slot.map(child => {
        return h('div', { class: `ml${this.$props.size}` }, [child])
      })
    )
  },
}
```

## Vnode 设计模式

```html
<div id="div">
  div text
  <p>p text</p>
</div>
```

> vue2

```js
const elementVNode = {
  tag: 'div',
  props: {
    id: 'div',
  },
  text: 'div text',
  children: [
    {
      tag: 'p',
      props: null,
      text: 'p text',
    },
  ],
}
```

> vue3

```js
const elementVNode = {
  tag: 'div',
  props: {
    id: 'div',
  },
  children: [
    {
      tag: null,
      props: null,
      children: 'div text',
    },
    {
      tag: 'p',
      props: null,
      children: 'p text',
    },
  ],
}
```

## VNode 描述抽象内容

> 比如组件

> vue2.
> VNode.tag 如果不是字符串，则创建组件类型的 VNode
> VNode.tag 是字符串
> 若是内置的 html 或 svg 标签，则创建正常的 VNode
> 若是属于某个组件的 id，则创建组件类型的 VNode
> 未知或没有命名空间的组件，直接创建 VNode

> vue3.使用静态标记

```js
export const enum ShapeFlags {
  // html 或 svg 标签
  ELEMENT = 1,
  // 函数式组件
  FUNCTIONAL_COMPONENT = 1 << 1,
  // 普通有状态组件
  STATEFUL_COMPONENT = 1 << 2,
  // 子节点是纯文本
  TEXT_CHILDREN = 1 << 3,
  // 子节点是数组
  ARRAY_CHILDREN = 1 << 4,
  // 子节点是 slots
  SLOTS_CHILDREN = 1 << 5,
  // Portal
  PORTAL = 1 << 6,
  // Suspense
  SUSPENSE = 1 << 7,
  // 需要被keepAlive的有状态组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  // 已经被keepAlive的有状态组件
  COMPONENT_KEPT_ALIVE = 1 << 9,
  // 有状态组件和函数式组件都是“组件”，用 COMPONENT 表示
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
```
```js
const elementVNode = {
  shapeFlag: ShapeFlags.ELEMENT,
  tag: 'div',
  props: null,
  children: [{
    shapeFlag: ShapeFlags.COMPONENT,
    tag: MyComponent,
    props: null
  }]
}
```
[设计 VNode](https://github.com/natee/build-your-own-vue-next/blob/master/course/chapter3/2.VNODE.md)

## $nextTick 原理
* 简单理解就是setTimeout 放到异步后去执行
* [参考文章](https://blog.csdn.net/frontend_frank/article/details/105942284)
* 创建了3个变量,callbacks一个队列数组,一个padding状态,一个timerFun,这3个变量其实是闭包,受保护的变量一直在内存中
* pending 用来标实同一个时间只能执行一次
* 其实就是判断是否支持原生的promise,是否支持原生的MutationObserver,或者支持原生的setImmediate,否则就用setTimeout
* 就是对当前环境进行降级处理,主要就是为了把callback执行放进微任务或者宏任务,等下一次事件循环进行执行,
* 列子
```js
  setTimeout(()=>{
    console.log(1)
  },0)
  this.$nextClick(()=>{
    console.log(2)
  })
  this.$nextClick(()=>{
    console.log(3)
  })
  // 2 3 1 
  // 原理如上进宏任务了, 实际要区分this.$nextClick 在的环境是否支持微任务 promise mutationObserver
```

## 原理干货
[原理](https://zhuanlan.zhihu.com/p/101330697)

## 使用Proxy替代Object.defineProperty
* Proxy 是对整个对象的代理，而 Object.defineProperty 只能代理某个属性
* 对象上新增属性，Proxy 可以监听到，Object.defineProperty 不能
* 数组新增修改，Proxy 可以监听到，Object.defineProperty 不能
* 若对象内部属性要全部递归代理，Proxy 可以只在调用的时候递归，而 Object. definePropery 需要一次完成所有递归，性能比 Proxy 差
