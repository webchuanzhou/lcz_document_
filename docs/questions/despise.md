<!--
 * @Author: your name
 * @Date: 2021-03-16 15:57:51
 * @LastEditTime: 2021-12-15 17:17:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\despise.md
-->

## 1.大型整数相加

JS 中整数的最大安全范围可以查到是：9007199254740991

```js
let a = '9007199254740991'
let b = '1234567899999999999'
function add(a, b) {
  //获取ab 最大长度
  let maxLength = Math.max(a.length, b.length)
  //用0去补齐长度
  a = a.padStart(maxLength, 0) //"0009007199254740991"
  b = b.padStart(maxLength, 0) //"1234567899999999999"
  let t = 0
  let f = 0 //余量
  let num = ''
  for (var i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t / 10)
    num = (t % 10) + num
  }
  if (f == 1) {
    mun = '1' + mum
  }
  return num
}
add(a, b)
```

## 2.手写 promise

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING
  // 成功之后的值
  value = null
  // 失败之后的原因
  reason = null

  // 存储成功回调函数
  onFulfilledCallbacks = []
  // 存储失败回调函数
  onRejectedCallbacks = []

  // 更改成功后的状态
  resolve = value => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED
      // 保存成功之后的值
      this.value = value
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  reject = reason => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED
      // 保存失败后的原因
      this.reason = reason
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    const realOnRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask()
      } else if (this.status === REJECTED) {
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask)
        this.onRejectedCallbacks.push(rejectedMicrotask)
      }
    })

    return promise2
  }

  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }

    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}
```

总结.
创建类以及构造函数,构造函数调用直接执行方法
创建 2 个数组缓存 promise 3 个 promise 状态常量 1 个当前状态 1 个成功的变量 1 个失败信息的变量  
创建 3 个函数 resolve reject then
resolve 主要用于改状态 改成功值 循环走成功数组缓存
reject 主要用于改状态 改成错误 循环走错误数组缓存
then 创建当前类 丢出去 ， ing 状态的时候推数组进去 推的是微任务 queueMicrotask
success 状态 判断是不是 MyPromise 实例对象 是的话 x.then(resolve, reject) 抛出，不是的话 resolve(x)
error 状态同上

2 个重写的静态方法 resolve reject 以便于直接的链式操作

## 3.手写兼容 类型判断 typeOf

```js
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

console.log(typeOf([])) // array
console.log(typeOf({})) // Object
console.log(typeOf(new Date())) // date
```

## 4.数组去重

```js
//es6
;[...new Set(arr)]
```

hash 去重

```js
function unique2(arr) {
  var obj = {}
  return arr.filter(ele => {
    if (!obj[ele]) {
      obj[ele] = true
      return true
    }
  })
}

function unique3(arr) {
  var result = []
  arr.forEach(ele => {
    if (result.indexOf(ele) == -1) {
      result.push(ele)
    }
  })
  return result
}
```

## 5. 事件订阅

思路
/\*\*

- @description: 1.发布 $on
- @param {\*} name fn
- @return {_}
  _/

判断构造函数中的缓存是否有发布名字， 有则追加发布函数，没有则创建此发布

/\*\*

- @description: 2.订阅 $emit 判断订阅名是否存在与缓存中，存在就执行
- @param {\*} name once = false ...args
- @return {_} 发布函数栈中执行
  _/

拿出该发布的函数栈
循环发布函数栈中的函数
可以操作是否订阅一次就摧毁发布栈(只执行一次)

/\*\*

- @description: 3.取消订阅
- @param {\*} name fn
- @return {_}
  _/

拿出发布的函数栈，
寻找发布栈内的函数 与 传入函数的下标
通过数组裁剪对发布栈进行操作 splice(index,1)

```js
class EventEmitter {
  constructor() {
    this.cache = {}
  }

  $on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }

  $off(name, fn) {
    let tasks = this.cache[name]
    if (tasks) {
      const index = tasks.findIndex(f => f === fn || f.callback === fn)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }

  $emit(name, once = false, ...args) {
    if (this.cache[name]) {
      let tasks = this.cache[name].slice()

      for (let fn of tasks) {
        fn(...args)
      }

      if (once) {
        delete this.cache[name]
      }
    }
  }
}
```

## 6.实现原生的 AJAX 请求

```js
const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true) // 第三个参数异步与否
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responeText)
      }
    }
    xhr.send()
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responeText)
      }
    }
    xhr.send(data)
  },
}
```

## 7.实现 JSON.parse

```js
  function JSON.parse(json){
    return eval(`(${json})`)
  }
```

## 8.将 dom 节点转换成树接口

```html
<div>
  <span></span>
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>
```

```js
function domToTree(dom) {
  let obj = {}
  obj.tag = dom.tagName
  obj.children = []
  dom.childNodes.forEach(child => obj.children.push(domToTree(child)))
}
```

## 9. 将树结构转换 dom

```js
{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
}
```

```js
function _render(vnode) {
  //数字转字符串
  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }
  // 字符串创建节点
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  // 普通DOM
  let dom = document.createElement(vnode.tag)
  // 遍历属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      let value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }
  // 子数组递归
  vnode.children.forEach(child => dom.appendChild(_render(child)))
  return dom
}
```

## 10.判断一个对象有环引用

```js
var obj = {
  a: {
    c: [1, 2],
  },
  b: 1,
}
obj.a.c.d = obj
console.log(cycleDetector(obj)) // true
```

> 实现

```js
function cycleDetector(obj) {
  const arr = [obj]
  let flag = false

  function cycle(o) {
    const keys = Object.keys(o)
    for (const key of keys) {
      const temp = o[key]
      if (typeof temp === 'object' && temp !== null) {
        if (arr.indexOf(temp) >= 0) {
          flag = true
          return
        }
        arr.push(temp)
        cycle(temp)
      }
    }
  }

  cycle(obj)

  return flag
}
```

## 11.计算一个对象的层数

```js
function lever(obj) {
  if (typeof obj != 'object') {
    throw '请传入对象'
  }
  let leve = (cache = 1)
  function deepLeve(obj) {
    Object.values(obj).forEach(el => {
      console.log(el, 222)
      if (typeof el == 'object' && el != null) {
        leve++
        deepLeve(el)
      } else {
        if (leve > cache) {
          cache = leve
          leve = 1
        }
      }
    })
  }
  deepLeve(obj)
  return cache
}
```

## 12.实现(a == 1 && a == 2 && a == 3)为 true

> 方法 1

```js
var a = {
  i: 1,
  toString: function () {
    return a.i++
  },
}
console.log(a == 1 && a == 2 && a == 3) // true
```

> 方法 2

```js
var a = [1, 2, 3]
a.join = a.shift
console.log(a == 1 && a == 2 && a == 3) // true
```

> 方法 3

```js
var val = 0
Object.defineProperty(window, 'a', {
  get: function () {
    return ++val
  },
})
console.log(a == 1 && a == 2 && a == 3) // true
```

---

# Array

```js
const players = [
  { name: '科比', num: 24 },
  { name: '詹姆斯', num: 23 },
  { name: '保罗', num: 3 },
  { name: '威少', num: 0 },
  { name: '杜兰特', num: 35 },
]
```

## 13. forEach 原理

```js
Array.prototype.cz_forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}
players.cz_forEach((item, index, arr) => {
  console.log(item, index)
})
```

## 14. map 原理

```js
Array.prototype.cz_map = function (callback) {
  let res = []
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this))
  }
  return res
}
console.log(
  players.cz_map((item, index, arr) => {
    return item.name + '-' + index
  })
)
```

## 15.filter

```js
Array.prototype.cz_filter = function (callback) {
  let res = []
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && res.push(this[i])
  }
  return res
}
console.log(players.cz_filter(item => item.num >= 23))
```

## 16.every

```js
Array.prototype.cz_every = function (callback) {
  let flag = true
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this)
    if (!flag) break
  }
  return flag
}
console.log(players.cz_every(item => item.num >= 23))
```

## 17.some

```js
Array.prototype.cz_some = function (callback) {
  let flag = false
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this)
    if (flag) break
  }
  return flag
}
console.log(players.cz_some(item => item.num >= 23))
```

## 18.reduce

```js
Array.prototype.cz_reduce = function (callback, initValue) {
  let start = 0,
    pre
  if (initValue) {
    pre = initValue
  } else {
    pre = this[0]
    start = 1
  }
  for (let i = start; i < this.length; i++) {
    pre = callback(pre, this[i], i, this)
  }
  return pre
}

// 计算所有num相加
const sum = players.cz_reduce((pre, next) => {
  return pre + next.num
}, 0)
```

## 19.findIndex

```js
Array.prototype.cz_findIndex = function (callback, initValue) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i
    }
  }
  return -1
}
console.log(players.cz_findIndex(item => item.name === '科比')) // 0
```

## 20.find

```js
Array.prototype.cz_find = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i]
    }
  }
  return undefined
}

console.log(players.cz_find(item => item.name === '科比')) // { name: '科比', num: 24 }
console.log(players.cz_find(item => item.name === '安东尼')) // undefined
```

## 21.fill

```js
Array.prototype.cz_fill = function (value, start = 0, end) {
  end = end || this.length
  for (let i = start; i < end; i++) {
    this[i] = value
  }
  return this
}

console.log(players.cz_fill('林三心', 1, 3))
```

## 22.includes

```js
Array.prototype.cz_includes = function (value, start = 0) {
  if (start < 0) start = this.length + start
  const isNaN = Number.isNaN(value)
  for (let i = start; i < this.length; i++) {
    if (this[i] === value || Number.isNaN(this[i]) === isNaN) {
      return true
    }
  }
  return false
}

console.log([1, 2, 3].cz_includes(2)) // true
console.log([1, 2, 3, NaN].cz_includes(NaN)) // true
console.log([1, 2, 3].cz_includes(1, 1)) // false
```

## 23.join

```js
Array.prototype.cz_join = function (s = ',') {
  let str = ''
  for (let i = 0; i < this.length; i++) {
    str = i === 0 ? `${str}${this[i]}` : `${str}${s}${this[i]}`
  }
  return str
}

console.log([1, 2, 3].cz_join()) // 1,2,3
console.log([1, 2, 3].cz_join('*')) // 1*2*3
```

## 23.flat

```js
Array.prototype.cz_flat = function () {
  let arr = this
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

const testArr = [1, [2, 3, [4, 5]], [8, 9]]

console.log(testArr.cz_flat())
```

## 24.splice

> 难点:截取长度和替换长度的比较，不同情况

```js
Array.prototype.sx_splice = function (start, length, ...values) {
  length = start + length > this.length - 1 ? this.length - start : length
  const res = [],
    tempArr = [...this]
  for (let i = start; i < start + values.length; i++) {
    this[i] = values[i - start]
  }
  if (values.length < length) {
    const cha = length - values.length
    for (let i = start + values.length; i < tempArr.length; i++) {
      this[i] = tempArr[i + cha]
    }
    this.length = this.length - cha
  }
  if (values.length > length) {
    for (let i = start + length; i < tempArr.length; i++) {
      this.push(tempArr[i])
    }
  }
  for (let i = start; i < start + length; i++) {
    res.push(tempArr[i])
  }
  return res
}
```

---

# Object

```js
const obj = {
  name: 'lcz',
  age: 25,
  gender: '男',
}
```

## 25.entries

> 用处：将对象转成键值对数组

```js
Object.prototype.cz_entries = function (obj) {
  const res = []
  for (let key in obj) {
    obj.hasOwnProperty(key) && res.push([key, obj[key]])
  }
  return res
}

console.log(Object.cz_entries(obj))
```

## 26.fromEntries

> 用处：跟 entries 相反，将键值对数组转成对象

```js
Object.prototype.cz_fromEntries = function (arr) {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    const [key, value] = arr[i]
    obj[key] = value
  }
  return obj
}
console.log(Object.cz_fromEntries(obj))
```

## 27.keys

```js
Object.prototype.cz_keys = function (obj) {
  const keys = []
  for (let key in obj) {
    obj.hasOwnProperty(key) && res.push(key)
  }
  return keys
}
console.log(Object.cz_keys(obj))
```

## 27.values

```js
Object.prototype.cz_values = function (obj) {
  const values = []
  for (let key in obj) {
    obj.hasOwnProperty(key) && values.push(obj[key])
  }
  return values
}
console.log(Object.cz_values(obj))
```

## 28. instanceof 实现原理

> 用处：A instanceOf B，判断 A 是否经过 B 的原型链

```js
function instance_of(left, right) {
  //获取类型的原型
  let prototype = right.prototype
  //获取对象的原理
  left = left.__proto__
  //判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null) return false
    if (prototype === left) return true
    left = left.__proto__
  }
}
```

## 29.is

> 用处：Object.is(a, b)，判断 a 是否等于 b

```js
Object.prototype.sx_is = function (x, y) {
  if (x === y) {
    // 防止 -0 和 +0
    return x !== 0 || 1 / x === 1 / y
  }

  // 防止NaN
  return x !== x && y !== y
}

const a = { name: 'lcz' }
const b = a
const c = { name: 'lcz' }

console.log(Object.sx_is(a, b)) // true
console.log(Object.sx_is(a, c)) // false
```

## 30.Object.assign

- assign 接收多个对象，并将多个对象合成一个对象
- 这些对象如果有重名属性，以后来的对象属性值为准
- assign 返回一个对象，这个对象 === 第一个对象

```js
Object.prototype.sx_assign = function (target, ...args) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  target = Object(target)

  for (let nextObj of args) {
    for (let key in nextObj) {
      nextObj.hasOwnProperty(key) && (target[key] = nextObj[key])
    }
  }
  return target
}

const testa = { name: '林三心' }
const testb = { name: 'sunshine_lin', age: 22 }
const testc = { age: 18, gender: '男' }

const testd = Object.sx_assign(testa, testb, testc)
console.log(testd) // { name: 'sunshine_lin', age: 18, gender: '男' }
console.log(testa === testd) // true
```

---

# String

## 31.slice

> 参数代表含义

- start：开始截取的字符索引(包含此字符)
- end：结束截取的字符索引(不包含此字符)
  > 注意点
- start > end：返回空字符串
- start < 0：start = 数组长度 + start

```js
String.prototype.cz_slice = function (start = 0, end) {
  start = start < 0 ? this.length + start : start
  end = !end && end !== 0 ? this.length : end

  if (start >= end) return ''
  let str = ''
  for (let i = start; i < end; i++) {
    str += this[i]
  }

  return str
}

console.log(str.cz_slice(2)) // nshine_lin
console.log(str.cz_slice(-2)) // in
console.log(str.cz_slice(-9, 10)) // shine_l
console.log(str.cz_slice(5, 1)) // ''
```

## 32.substr

> 参数代表含义

- start：开始截取的字符索引(包含此字符)
- end：截取的长度
  > 注意点
- start < 0
- length 超出所能截取范围，需要做处理
- length < 0：返回空字符串

```js
String.prototype.cz_substr = function (start = 0, length) {
  if (length < 0) return ''

  start = start < 0 ? this.length + start : start
  length = (!length && length !== 0) || length > this.length - start ? this.length : start + length

  let str = ''
  for (let i = start; i < length; i++) {
    str += this[i]
  }
  return str
}

console.log(str.cz_substr(3)) // shine_lin
console.log(str.cz_substr(3, 3)) // shi
console.log(str.cz_substr(5, 300)) // ine_lin
```

## 33.substring

> 功能与 slice 大致相同
> 区别之处
> start > end：互换值

```js
String.prototype.cz_sunstring = function (start = 0, end) {
  start = start < 0 ? this.length + start : start
  end = !end && end !== 0 ? this.length : end

  if (start >= end) [start, end] = [end, start]
  let str = ''
  for (let i = start; i < end; i++) {
    str += this[i]
  }

  return str
}

console.log(str.cz_sunstring(2)) // nshine_lin
console.log(str.cz_sunstring(-2)) // in
console.log(str.cz_sunstring(-9, 10)) // shine_l
console.log(str.cz_sunstring(5, 1)) // unsh
```

---

# promise

## 34.all

- 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
- 如果所有 Promise 都成功，则返回成功结果数组
- 如果有一个 Promise 失败，则返回这个失败结果

```js
function all(promises) {
  const result = []
  let count = 0
  return new MyPromise((resolve, reject) => {
    const addData = (index, value) => {
      result[index] = value
      count++
      if (count === promises.length) resolve(result)
    }
    promises.forEach((promise, index) => {
      if (promise instanceof MyPromise) {
        promise.then(
          res => {
            addData(index, res)
          },
          err => reject(err)
        )
      } else {
        addData(index, promise)
      }
    })
  })
}
```

## 35.race

- 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
- 哪个 Promise 最快得到结果，就返回那个结果，无论成功失败

```js
function race(promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(promise => {
      if (promise instanceof MyPromise) {
        promise.then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      } else {
        resolve(promise)
      }
    })
  })
}
```

## 36.allSettled

- 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
- 把每一个 Promise 的结果，集合成数组，返回

```js
function allSettled(promises) {
  return new Promise((resolve, reject) => {
    const res = []
    let count = 0
    const addData = (status, value, i) => {
      res[i] = {
        status,
        value,
      }
      count++
      if (count === promises.length) {
        resolve(res)
      }
    }
    promises.forEach((promise, i) => {
      if (promise instanceof MyPromise) {
        promise.then(
          res => {
            addData('fulfilled', res, i)
          },
          err => {
            addData('rejected', err, i)
          }
        )
      } else {
        addData('fulfilled', promise, i)
      }
    })
  })
}
```

## 37.any

- 接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
- 如果有一个 Promise 成功，则返回这个成功结果
- 如果所有 Promise 都失败，则报错

```js
    function any(promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            promises.forEach((promise) => {
                promise.then(val => {
                    resolve(val)
                }, err => {
                    count++
                    if (count === promises.length) {
                        reject(new AggregateError('All promises were rejected'))
                    }
                })
            })
        })
    }
}

```

## 38.finally

- 接收一个回调函数，但无参数接收
- 无论成功失败状态，都会执行 finally

```js
Promise.prototype.finally = function (callback) {
  return this.then(
    res => {
      callback()
      return res
    },
    err => {
      callback()
      throw err
    }
  )
}
```

## 39.字符串去重

```js
String.prototype.unique = function () {
  var obj = {},
    str = '',
    len = this.length
  for (var i = 0; i < len; i++) {
    if (!obj[this[i]]) {
      str += this[i]
      obj[this[i]] = true
    }
  }
  return str
}

function uniq(str) {
  return str.replace(/(\w)\1+/g, '$1')
}
```

## 40.判断字符串是否是回文

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase()
  console.log(str)
  return str == str.split('').reverse().join('')
}

function isPalina(str) {
  if (Object.prototype.toString.call(str) !== '[object String]') {
    return false
  }
  var len = str.length
  for (var i = 0; i < len / 2; i++) {
    if (str[i] != str[len - 1 - i]) {
      return false
    }
  }
  return true
}
```

## 41.异步加载 script

```js
function loadScript(url, callback) {
  var oscript = document.createElement('script')
  if (oscript.readyState) {
    // ie8及以下版本
    oscript.onreadystatechange = function () {
      if (oscript.readyState === 'complete' || oscript.readyState === 'loaded') {
        callback()
      }
    }
  } else {
    oscript.onload = function () {
      callback()
    }
  }
  oscript.src = url
  document.body.appendChild(oscript)
}
```

