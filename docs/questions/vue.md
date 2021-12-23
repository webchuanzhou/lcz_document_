<!--
 * @Author: lcz
 * @Date: 2021-12-14 09:40:52
 * @LastEditTime: 2021-12-17 14:57:16
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