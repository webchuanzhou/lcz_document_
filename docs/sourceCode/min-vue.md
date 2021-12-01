<!--
 * @Author: your name
 * @Date: 2021-11-02 09:54:53
 * @LastEditTime: 2021-11-02 12:05:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\sourceCode\min-vue.md
-->

### 把烤肉串命名方式转换成驼峰命名方式

```ts
const camelizeRE = /-(\w)/g
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}
```

### 必须是 on+一个大写字母的格式开头

```ts
export const isOn = key => /^on[A-Z]/.test(key)
```

### 添加 on 前缀，并且首字母大写

```ts
//首字母大写
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const toHandlerKey = (str: string) => (str ? `on${capitalize(str)}` : ``)
```

### 检测值是否有改变

```ts
export function hasChanged(value, oldValue) {
  return !Object.is(value, oldValue)
}
```

### 检测值 key 是否在原型链上

```ts
export function hasOwn(val, key) {
  return Object.prototype.hasOwnProperty.call(val, key)
}
```

## 组件类型

```ts
export const enum ShapeFlags {
  // 最后要渲染的 element 类型
  ELEMENT = 1,
  // 组件类型
  STATEFUL_COMPONENT = 1 << 2,
  // vnode 的 children 为 string 类型
  TEXT_CHILDREN = 1 << 3,
  // vnode 的 children 为数组类型
  ARRAY_CHILDREN = 1 << 4,
  // vnode 的 children 为 slots 类型
  SLOTS_CHILDREN = 1 << 5,
}
```

## componentEmit 实现

```ts
export function emit(instance, event: string, ...rawArgs) {
  // 1. emit 是基于 props 里面的 onXXX 的函数来进行匹配的
  // 所以我们先从 props 中看看是否有对应的 event handler
  const props = instance.props
  // ex: event -> click 那么这里取的就是 onClick
  // 让事情变的复杂一点如果是烤肉串命名的话，需要转换成  change-page -> changePage
  // 需要得到事件名称
  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  if (handler) {
    handler(...rawArgs)
  }
}
```

### componentsProps 实现

```ts
export function initProps(instance, rawProps) {
  console.log('initProps')

  // TODO
  // 应该还有 attrs 的概念
  // attrs
  // 如果组件声明了 props 的话，那么才可以进入 props 属性内
  // 不然的话是需要存储在 attrs 内
  // 这里暂时直接赋值给 instance.props 即可
  instance.props = rawProps
}
```

### componentsSlots 实现

```ts
import { ShapeFlags } from '../shared'
export function initSlots(instance, children) {
  const { vnode } = instance

  console.log('初始化 slots')

  if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, (instance.slots = {}))
  }
}

const normalizeSlotValue = value => {
  // 把 function 返回的值转换成 array ，这样 slot 就可以支持多个元素了
  return Array.isArray(value) ? value : [value]
}

const normalizeObjectSlots = (rawSlots, slots) => {
  for (const key in rawSlots) {
    const value = rawSlots[key]
    if (typeof value === 'function') {
      // 把这个函数给到slots 对象上存起来
      // 后续在 renderSlots 中调用
      // TODO 这里没有对 value 做 normalize，
      // 默认 slots 返回的就是一个 vnode 对象
      slots[key] = props => normalizeSlotValue(value(props))
    }
  }
}
```
