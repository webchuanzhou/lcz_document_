<!--
 * @Author: your name
 * @Date: 2021-03-16 09:49:25
 * @LastEditTime: 2022-02-15 15:01:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\base.md
-->

# 参考链接

[面试题 1](https://juejin.im/post/5eda38ebf265da7700281d57#heading-176)
[面试题 2](https://juejin.im/post/5ef8377f6fb9a07e693a6061)
[面试题 3](https://juejin.im/post/5f0928cf5188252e9b46f717)
[面试题 4](https://juejin.im/post/5d23e750f265da1b855c7bbe)
[基础面试题 5](https://juejin.im/post/6867715946941775885)

## 1.new 一个对象过程

1. 创建一个空对象
2. 链到原型上
3. 绑定 this
4. 返回新对象

---

new 关键字实现原理

```js
function create() {
  //创建一个空对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  //链到原型上
  obj.__proto__ = Con.prototype
  // 绑定this，执行构造函数
  let result = Con.apply(obj, arguments)
  // 确保new 出来的是个对象
  return typeof result == 'object' ? result : obj
}
```

## 2.js 作用域与作用域链(全局上下文，函数上下文)

1. 全局作用域（全局上下文）
2. 局部作用域（函数上下文）
3. eval 作用域（eval 上下文）

```js
//全局
var a = 10
function foo(i) {
  //局部作用域
  var b = 20
  //找局部作用域
  console.log(b)
  //找全局作用域 -> 形成的链就是作用域链
  console.log(a)
}
foo()
```

### ps. JS 的执行上下文和作用域到底有什么区别和联系？

> 执行上下文
> 简单概括来说就是代码执行期间，所在的一个容器环境，或者说是一个内存空间，代码执行之时，需要在当前上下文查找，所定义得数据变量。
> 作用域
> 在源代码编译整机器码执行之前，编译器需要依赖的一个作用对象。用于查找当前环境所定义得变量等，最终输出整体词法树(ast)
> 总得来说，两者形似，但生不逢时

## 3.es6 用了哪些

1. let const 
2. ``
3. 结构
4. set() 
5. class
6. generator
7. 扩展运算符 ...
8. module import export
9. proxy
10. promise
11. 数组的方法
>es7
12. **
13. includes
>es8 
11. async await 
12. object.value() object.keys()  Object.entries()
13. padStart()
> es9 ..
>es 10
14.  Object.fromEntries()
15. 新增基础类型 BigInt 
> es 13
16. at()
## 4.vue2.0 跟 3.0 的区别有哪些

待优化

> vue3.0
> diff

1. diff 算法 新增静态标记 快速找到更新了 dom 树
2. 使用 proxy 进行双向数据绑定
3. 源码使用 ts 重写，更好的类型推导
4. 提供了 composition api，为更好的逻辑复用与代码组织
   > vue2.0
5. 虚拟 dom 发生改变，它是通过全量比较 diff，进行检测
6. Object.defineProperty 进行双向数据绑定，通过重写数组的 8 大方法，不能监听对象

## 5.this 指向是如何工作的

谁调用 this 就指向谁
1. 函数中的this 指window
2. 对象方法中的this  指当前对象
3. 构造函数中的this 指未来的实列
4. 箭头函数的this 就是外面的this

## 6.面向对象的三大特性，封装继承多态

继承的形式有哪些
封装的形式有哪些
多态的形式有哪些

## 7.js 字符串的方法
1. toLowerCase() 
2. toUpperCase()
3. replace
4. substring()
5. substr()
6. match()
------------------------------
没记住（用到会想起） 

------------------------------
7. indexOf()
8. lastIndexOf()
9. slice()
10. concat()
11. charAt()
12. charCodeAt()
13. split()

## 8.vue 生命周期
> vue2.0             
> 8大生命周期            
create mounted update destory       
缓存组件的2大生命周期，注册 摧毁            
Activated  Deactivated                          
同上+before
> vue3.0              
onBeforeMound onMounted onBeforeUpdate onUpdate  onBeforeUnmount onUnMounted       
缓存组件的2大生命周期，注册 摧毁  
onActivated
onDeactivated
onErrorCaptured

## 9.什么是高阶函数，接触过的高阶函数有哪些
一个函数被当作参数传入函数

-------------------------------
1. es6 的数组方法
2. 柯里化函数
3. 防抖 节流

## 10.重绘，回流

重绘不一定会回流，回流一定会重绘

---------------------
重绘：改变background  color 会出现重绘
回流：top left 位置的偏移transform：translate(x，y)
重绘性能消耗会比回流大

## 11.js 计算为什么会有浮点数

二进制（0，1）计算，最大位数53位


## 12.跨域问题，以及解决方案

1. cros
2. iframe
3. jsonp
4. proxy 代理
5. postmessages 的Api（单词忘记）
....

## 13.前端的安全性问题 xss csrf 上传 sql
1. 防止xss攻击：文件上传的时候前后端过滤sql语句 以及 script 标签的代码文件，可以用三方库对文件过滤
2. 防止csrf攻击: 同源策略，或者请求+验证码
3. 防止ddos，防不住流量对抗

## 14.chrome 如何支持小于 12px 的字体

transform：translate(0.8)

## 15.url 输入后的过程

1. 用户输入网址，浏览器发起DNS查询请求
2. 建立TCP连接
3. 浏览器向 web 服务器发送一个 HTTP 请求
4. 发送响应数据给客户端
5. 浏览器解析http response

## 16.深拷贝与浅拷贝的区别

> 区别
> 浅拷贝只能拷贝第一层
> 浅拷贝

```js
let a = { age: 1 }
//方式1 Object.assgin()
let b = Object.assgin({}, a)
//方式2 ...扩展运算符
let c = { ...a }
a.age = 2
console.log(b.age, c.age) // 1
```

> 深拷贝

- JSON.parse(JSON.stringify(obj))
  缺点

1. 会忽略 undefined
2. 会忽略 symbol
3. 会忽略函数
4. 不能解决循环引用对象
   > 循环引用对象
   > 会报错

```js
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj)
```

- 递归深拷贝（详见手写题）
  > 扩展
  > MessageChannel() 不深拷贝函数的情况下实现方式(MessageChannel iframe 的消息传递实现方式)

1. 不会忽略 undefined（√）
2. 不会忽略 symbol（√）
3. 会忽略函数（X）
4. 能解决循环引用对象（√）

```js
function copyMessageChannel(obj) {
  return new Promise((resolve, reject) => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c(async () => {
  const clone = await copyMessageChannel(obj)
  console.log(clone)
})()
```

## 17.option 预请求的理解

浏览器对复杂跨域请求在真正发送请求之前,会先进行一次预请求,就是参数为OPTIONS的第一次请求,他的作用是用于试探性的服务器响应是否正确,即是否能接受真正的请求,如果在options请求之后获取到的响应是拒绝性质的,例如500等http状态,那么它就会停止第二次的真正请求的访问。

## 18.object.create 与 new object 的区别
中间有一层构造函数的赋值（我的）

---------------------
new关键字创建的对象会保留原构造函数的属性，而用Object.create()创建的对象不会。


## 19.说说对原型的理解，原型链
每一个对象都有一个__proto__ 熟悉，__proto__ 执行链上级的F.protoType , f的__proto__ ,也指向上级的prototype 直到指到了[object,object] 形成的链就叫原型链，调用一个方法在本对象上没找到会通过原型链往上查找
## 20.v-model 的原理

@input + :value 绑定的原理
俗称绑定元素的监听与值的展示

## 21.宏任务与微任务
事件循环机制

----------
先宏任务,遇到微任务放到微任务队列，遇到宏任务放到宏任务队列，在指向微任务队列中的任务，微任务队列中存在宏任务在存放在宏任务中，依次执行
宏-》微-》宏-》有微微，没微结

## 22.闭包

外层函数包裹内层函数以及受保护的变量，内层函数中调用外层函数保护的变量就是闭包,外层函数并 return 内层函数。
调用完成后要释放，避免内存泄漏ßß

> 优点: 变量私有化
> 缺点: 内存泄露

```js
function a() {
  let b = 1
  function c() {
    console.log(b)
  }
  return c
}
```

## 23.promise


## 25.为什么组件中的 data 必须是个函数
为了组件私有化，不然data中的数据任何地方都可以改，就肯定会数据紊乱

## 26.v-if 和 v-show 的区别
1. v-if： dom 元素渲染不渲染
2. v-show: display:none 还是block

## 27.v-for 中的 key
优化diff算法快速查找到变更的元素，优化性能，数据更新

## 28.双向数据绑定的原理
1. vue2 通过发布者与订阅者模式对数据get set的方法的拦截，改变数组8大方法实现伪双向数据绑定
2. vue3 通过proxy 实现双向数据绑定

## 29.组件传递
1. 父子 pros emit $parent ref  prove inject（单词可能有错误） 
2. 兄弟  Bus
3. 状态管理工具vuex 菠萝

## 30.mvvm 和 mvc

## 31.Computed 和 Watch
1. Computed 有缓存
2. Watch 监听定义数据的变化
## 32.虚拟 Dom 以及 key 的作用

## 33.那些 vue 的优化
1. 计算属性中的参数结构this，减少this黑盒子的使用
2. 骨架屏 优化白屏
3. 路由懒加载
4. 页面文件过大，页面拆分
5. UI库 按需引入
6. 减少HTTP请求 css雪碧图
7. 合理使用缓存
8. CDN引入
9. 图片懒加载
10. 图片资源获取失败默认图片
## 34.cookies，sessionStorage 和 localStorage
1. cookies 存储比较小5k 请求的时候会在请求头的带来带去
2. sessionStorage 5Mb 会话关闭就不再记录
3. localStorage 5Mb 一直存在，除非手动移除

## 36.事件代理 事件委托机制 ,以及优点

答案：这样只在内存中开辟一块空间，既节省资源又减少 DOM 操作，提高性能动态绑定事件，

## 37.匿名函数的典型用例

## 38:请为什么说 js 是单线程，而不是多线程呢，说说你的理解

答案:JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如：一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

## 39:表单提交可以跨域吗？ 会存在什么问题?

可以，不知道，这个操作实现 超过我的编写年龄

## 40.检测数据类型的方式有集中

答案: 1.typeOf 2. Object.prototype.toString.call() 3.instanceof

## 41.数组去重的方法
[...new Set(arr)]
for循环+includes或者（indexOf）

## 42.websock 使用方式 如何传参
1. get 的方式
2. 子协议的传递方式，后端没接到过

## 43.如何解决移动端 1px 问题
1. @media device2 设为0.5
2. transform:scale(0.5)
3. viewport <meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

```css
div {
    border: 1px solid #000;
}

@media (-webkit-min-device-pixel-ratio: 2) {
  div {
    border: .5px solid #000;
  }
}
```

## 44.异步编程的方式有哪几种，优点缺点是啥
1. promise
2. Generator
3. async await
4. setTimeout
5. setInterval
6. 事件监听 等等

## 45.promise 的特性，优点缺点，内部实现

答案：优点更方便处理异步操作 缺点：不能中断

## 46.webpack 打包速度太慢如何优化

答案：Webpack、多线程/多实例构建、缩小打包作用域、充分利用缓存提升二次构建速度，CDN

## 47.loader 和 plugin 的区别

答案：loader 是一个转换器，文件转换的过程，
plugin 是扩展器，丰富 webpack 本身，loader 结束后，执行 plugin 打包的整个过程

## 48.如何取消发送出去的请求 后端还没相应的数据
1. axios 中提供cancelToken 进行取消请求
2. 原生xml 提供about()  api 来主动断开请求

## 49.npm install 干了什么事情

答案：npm install 读取 package.json 以创建依赖关系列表，并使用 package-lock.json 告知要安装这些依赖关系的版本。

## 50.页面刷新后 vuex 中的数据丢失了 如何处理

1. localStorge
2. sessionStroage
3. cookie

## 51.为什么要用 vuex,localStorge 不行吗

1. localStorge 存储有上限 存多了读取会有时间差

## 52. Vue 的 template 是如何编译的

答案:vue-loader 里有然后专门处理 template 的 loader，最终本质上还是 createElement

## 53.webpack 的热更新原理大概介绍一下

答案:本地起服务，通过文件内容 hash 来判断是否更新，客户端收到更新消息后会取拉取最新代码进行更新

## 54.promise 返回的是什么？

答案：每次 promise 返回的都是一个新的 promise
每次 promise 返回的一样不一样？
答案：不一样
为啥不一样？
答案：可能有偏差（每次都是 new 新的 promise 聊聊 new 干了啥） 或者 在 promise 数组中的引用地址不一样
为什么要返回一个新的 promise？
因为 promise 的状态修改只能 pending -> resolved 这个方向，一旦修改，不可更改。

## 55.判断数组的方法，请分别介绍它们之间的区别和优劣

```html
Object.prototype.toString.call()、instanceof、Array.isArray()以及typeof
```

Object.prototype.toString.call() 常用于判断浏览器内置对象。
instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
Array.isArray()是 ES5 新增的方法,当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

```html
if (!Array.isArray) { Array.isArray = function(arg) { return Object.prototype.toString.call(arg) === '[object Array]';
}; }
```

typeof 只能检测基本数据类型，包括 boolean、undefined、string、number、symbol，
而 null、Array、Object ,使用 typeof 检测出来都是 Object，无法检测具体是哪种引用类型。

## 56.水平垂直居中

使用 position + transform，不定宽高时

```html
.parent{ position: relative; } .child{ position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); }
```

使用 position + transform，有宽高时

```html
.parent{ position: relative; } .child{ width: 100px; height: 100px; position: absolute; left: 50%; top: 50%;
margin-left: -50px; margin-top: -50px; }
```

3）使用 flex

```html
.parent{ display: flex; align-items: center; justify-content: center; } 或者 .parent{ display: flex; align-items:
center; } .child{ margin: 0 auto; } 或者 .parent{ display: flex; } .child{ margin: auto; }
```

4）使用 position

```html
.parent{ position: relative; } .child{ position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto; }
```

5）使用 grid

```html
.parent{ display: grid; } .child{ justify-self: center; align-self: center; }
```

6）使用 table

```html
.parent{ display: table; } .child{ display: table-cell; vertical-align: middle; text-align: center; }
```

## 57.import 与 require 的区别

import 是静态引入 必需放在头部 ，只是引用 浅拷贝
require 动态引入 深拷贝
import 是编译时的 require 是运行时候的 ，性能上比 require 好很多

## 58. 内置类型之(原始数据类型)与(引用数据类型)

> 原始数据类型

1.  null
2.  undefined
3.  string
4.  number
5.  boolean
6.  symbol
7.  bigint
    > 引用数据类型
8.  Object
9.  Array

## 59.类型判断

- 原始类型中除了 null，其它类型都可以通过 typeof 来判断。
- instanceof 引用数据类型
- Object.prototype.toString.call()最佳判断

---

## 60.对象如何转基础数据类型(感觉有点鸡肋目前)

> 对象转化为基础数据类型，其实最终都是用调用对象自带的 valueOf 和 toString 两个方法之一
> 什么时候调用 valueOf 和 toString

```js
var foo = {
  toString: function () {
    return 'foo'
  },
  valueOf: function () {
    return 5
  },
}

alert(foo + 'bar') // 5bar
alert([foo, 'bar'].join('')) // foobar
```

Symbol.toPrimitive 可以重写

```js
var foo = {
  toString: function () {
    return 'foo'
  },
  valueOf: function () {
    return 5
  },
  [Symbol.toPrimitive]() {
    return 2
  },
}
alert(foo + '1') // 21
alert(foo + 1) // 3
```

## 61.模块化

在有 Babel 的情况下，我们可以直接使⽤ ES6 的模块化

```js
export function a(){}
export function b(){}

import {a,b} from 'xxx'

export default b(){}
import b from 'xxx'
```

commonJs

```js
//a.js
module.exports = {
  a: 1,
}
// or
exports.a = 1

// b,js
var module = require('./a.js')
module.a //=>1
```

> commonjs 与 es6 模块化的区别
> commonjs 支持动态导入 require(${path}/xx.js),es6 不支持 但是有提案

---

| 区别                 | commonjs                                                     | es6babel                                                         |
| -------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| 动态导入             | 支持 require(${path}/xx.js)                                  | 不支持 但是有提案                                                |
| 是否同步导入         | 是(用于服务端，文件都在本地，同步导入即便卡了主线程影响不大) | 否(异步导入，用于浏览器文件需要下载，如果同步导入对渲染影响很大) |
| 导出值是否同一个内存 | 否（导出是值拷贝）导出的值变了需要重新导入一次               | 是 (导入导出指向同一个内存地址，导出值会跟随导入的值变化)        |

AMD

```js
define(['/a', '/b'], function (a, b) {
  a.do()
  b.do()
})
```

## 62.防抖与节流

> 防抖

1. 基础防抖->缺陷不能立即执行(输入框级别的防抖)

```js
function debounce(func, wait = 50) {
  var timeout = 0
  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(this, arguments)
    }, wait)
  }
}
```

2. 优化防抖 (按钮级别的防抖立即执行)

```js
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args
  //延迟执行函数
  const later = () =>
    setTimeout(() => {
      //定时器执行完毕，清定时器缓存
      timer = null
      //使用之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
  return function (...params) {
    if (!timer) {
      timer = later()
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = arguments
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

> 2.  节流 参考

## 63.css 加载会造成阻塞吗

js 执行会阻塞 DOM 树的解析和渲染,  
css 并不会阻塞 DOM 树的解析。  
css 加载会阻塞 DOM 树渲染。  
css 加载会阻塞后面 js 语句的执行  
个人对这种机制的评价  
其实我觉得，这可能也是浏览器的一种优化机制。因为你加载 css 的时候，可能会修改下面 DOM 节点的样式，如果 css 加载不阻塞 DOM 树渲染的话，那么当 css 加载完之后，DOM 树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。所以我干脆就先把 DOM 树的结构先解析完，把可以做的工作做完，然后等你 css 加载完之后，在根据最终的样式来渲染 DOM 树，这种做法性能方面确实会比较好一点。  
[参考文档](https://segmentfault.com/a/1190000018130499)

## 64. 手写 call 与 apply

call

```js
Function.prototype.myCall = function (content) {
  let context = content || window
  // 给 context 添加⼀个属性
  // getValue.call(a, 'yck' , '24') => a.fn = getValue
  context.fn = this
  //取出第一个参数之后
  var args = [...arguments].slice(1)
  var result = content.fn(...args)
  delete context.fn
  return result
}
```

apply

```js
Function.prototype.myApply = function (content) {
  let context = content || window
  // 给 context 添加⼀个属性
  // getValue.call(a, 'yck' , '24') => a.fn = getValue
  context.fn = this
  //取出第一个参数是否存在
  if (arguments[1]) {
    return content.fn(...arguments[1])
  } else {
    return content.fn()
  }
}
```

验证方法

```js
let a = {
  value: 1,
}
function getValue(name, age) {
  console.log(name, age, this.value)
}
getValue.myCall(a, '李雷', 55)
getValue.myApply(a, ['李雷', 55])
```

bind

```js
Function.prototype.myBind = function (content) {
  //bind 必需是函数调用
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  //获取第一个参数后的值
  var args = [...arguments].slice(1)
  //返回一个函数
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(content, args.concat(...arguments))
  }
}
```

## 65. ['1','2','3'].map(parseInt)

Map 有三个参数，分别是当前索引元素，索引，原数组

```js
//parseInt('1',0) -> 1
//parseInt('2',1) -> NaN
//parseInt('3',2) -> NaN
```

## 66.Map、FlatMap 和 Reduce

Map、FlatMap 大致一样
FlatMap 会把数组降维
ps：最多支持 2 维数组

```js
;[1, [2], [3, 4, [5, 6]]].flatMap(el => el)
```

Reduce 作⽤是数组中的值组合起来，最终得到⼀个值

```js
function a() {
  console.log(1)
}
function b() {
  console.log(2)
}
;[a, b].reduce((a, b) => a(b()))
```

## 67. 事件注册

addEventListener 进行事件注册, 第三个参数布尔值，默认冒泡 为 true 时捕获

```js
node.addEventListener(
  'click',
  event => {
    console.log('冒泡')
  },
  false
)

node.addEventListener(
  'click',
  event => {
    console.log('捕获')
  },
  true
)
```

## 68. Service Worker

⽬前该技术通常⽤来做缓存⽂件，提⾼⾸屏速度，可以试着来实现这个功能。

```js
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function (registration) {
      console.log('service worker 注册成功 ')
    })
    .catch(function (err) {
      console.log('servcie worker 注册失败 ')
    })
}
// sw.js
// 监听 `install` 事件， 回调中缓存所需⽂件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
  )
})
//拦截所有请求事件
//如果缓存中已经有请求的数据就直接⽤缓存，否则去请求数据
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        return response
      }
      console.log('fetch source')
    })
  )
})
```

## 69. 缓存

缓存对于前端性能优化来说是个很重要的点，良好的缓存策略可以降低资源的重复加载提⾼⽹⻚的整体加载速度。
通常浏览器缓存策略分为两种：
强缓存和协商缓存
强缓存

> 实现强缓存可以通过两种响应头实现： Expires 和 Cache-Control 。 强缓存表示在缓存期 间不需要请求， state code 为 200

协商缓存

> 如果缓存过期了，我们就可以使⽤协商缓存来解决问题。协商缓存需要请求，如果缓存有效会返回 304。
> 协商缓存需要客户端和服务端共同实现，和强缓存⼀样，也有两种实现⽅式。

## 70.如何渲染⼏万条数据并不卡住界⾯

也就是说不能⼀次性将⼏万条都渲染出来，⽽应该⼀次渲染部分 DOM，那么就可以通过 requestAnimationFrame 来每 16 ms 刷新⼀次

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <ul>
      控件
    </ul>
    <script>
      setTimeout(() => {
        // 插⼊⼗万条数据
        const total = 100000
        // ⼀次插⼊ 20条，如果觉得性能不好就减少
        const once = 20
        //渲染数据总共需要⼏次
        const loopCount = total / once
        let countOfRender = 0
        let ul = document.querySelector('ul')
        function add() {
          //优化性能，插⼊不会造成回流
          const fragment = document.createDocumentFragment()
          for (let i = 0; i < once; i++) {
            const li = document.createElement('li')
            li.innerText = Math.floor(Math.random() * total)
            fragment.appendChild(li)
          }
          ul.appendChild(fragment)
          countOfRender += 1
          loop()
        }
        function loop() {
          if (countOfRender < loopCount) {
            window.requestAnimationFrame(add)
          }
        }
        loop()
      }, 0)
    </script>
  </body>
</html>
```

## 71. UDP(面向报文)

UDP 是⼀个⾯向报⽂ （ 报⽂可以理解为⼀段段的数据） 的协议。  
意思就是 UDP 只是报⽂的搬运⼯，不会对报⽂进⾏任何拆分和拼接操作。

> 不可靠性

1. UDP 是⽆连接的，也就是说通信不需要建⽴和断开连接。
2. UDP 也是不可靠的。协议收到什么数据就传递什么数据，并且也不会备份数据，对⽅能不能收到是不关⼼的 。
3. UDP 没有拥塞控制，⼀直会以恒定的速度发送数据。即使⽹络条件不好，也不会对发送速率进⾏调整。这样实现的弊端就是在⽹络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求⾼的场景（⽐如电话会议）就需要使⽤ UDP ⽽不是 TCP。

> ⾼效
> 因为 UDP 没有 TCP 那么复杂，需要保证数据不丢失且有序到达。所以 UDP 的头部开销⼩，只有⼋字节，相⽐ TCP 的⾄少⼆⼗字节要少得多，在传输数据报⽂时是很⾼效的。

> 传输⽅式
> UDP 不⽌⽀持⼀对⼀的传输⽅式，同样⽀持⼀对多，多对多，多对⼀的⽅式，也就是说 UDP 提供了单播，多播，⼴播的功能

## 72. 从输⼊ URL 到⻚⾯加载完成的过程

1. ⾸先做 DNS 查询，如果这⼀步做了智能 DNS 解析的话，会提供访问速度最快的 IP 地址回来
2. 接下来是 TCP 握⼿，应⽤层会下发数据给传输层，这⾥ TCP 协议会指明两端的端⼝号，然后下发给⽹络层。⽹络层中的 IP 协议会确定 IP 地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层⾯的传输了
3. TCP 握⼿结束后会进⾏ TLS 握⼿，然后就开始正式的传输数据
4. 数据在进⼊服务端之前，可能还会先经过负责负载均衡的服务器，它的作⽤就是将请求合理的分发到多台服务器上，这时假设服务端会响应⼀个 HTML ⽂件
5. ⾸先浏览器会判断状态码是什么，如果是 200 那就继续解析，如果 400 或 500 的话就会报错，如果 300 的话会进⾏重定向，这⾥会有个重定向计数器，避免过多次的重定向，超过次数也会报错
6. 浏览器开始解析⽂件，如果是 gzip 格式的话会先解压⼀下，然后通过⽂件的编码格式知道该如何去解码⽂件
7. ⽂件解码成功后会正式开始渲染流程，先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 script 标签的话，会判断是否存在 async 或者 defer，前者会并⾏进⾏下载并执⾏ JS，后者会先下载⽂件，然后等待 HTML 解析完成后顺序执⾏，如果以上都没有，就会阻塞住渲染流程直到 JS 执⾏完毕。遇到⽂件下载的会去下载⽂件，这⾥如果使⽤ HTTP 2.0 协议的话会极⼤的提⾼多图的下载效率。
8. 初始的 HTML 被完全加载和解析后会触发 DOMContentLoaded 事件
9. CSSOM 树和 DOM 树构建完成后会开始⽣成 Render 树，这⼀步就是确定⻚⾯元素的布局、样式等等诸多⽅⾯的东⻄
10. 在⽣成 Render 树的过程中，浏览器就开始调⽤ GPU 绘制，合成图层，将内容显示在屏幕上了

## 73. 栈与队列的概念

> 栈: 后进先出
> 实现：每种数据结构都可以⽤很多种⽅式来实现，其实可以把栈看成是数组的⼀个⼦集，所以这⾥使⽤数组来实现

```js
class stack {
  constructor() {
    this.stack = []
  }
  push(item) {
    this.stack.push(item)
  }
  pop() {
    this.stack.pop()
  }
  peek() {
    return this.stack[this.getCount - 1]
  }
  getCount() {
    return this.stack.length
  }
  isEempy() {
    return this.getCount === 0
  }
}
```

> 队列：先进先出
> 单列队列

```js
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue(item) {
    this.queue.push(item)
  }
  deQueue() {
    this.queue.unshift()
  }
  getHeader() {
    return this.queue[0]
  }
  getLength() {
    return this.queue.length
  }
  isEmpty() {
    return this.getLength() === 0
  }
}
```

循环队列

```js
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    //队头
    this.first = 0
    //队尾
    this.last = 0
    //当前队列⼤⼩
    this.size = 0
  }
  enQueue(item) {
    //判断队尾+ 1是否为队头
    //如果是就代表需要扩容数组
    // % this.queue.length是为了防⽌数组越界
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--
    // 判断当前队列⼤⼩是否过⼩
    // 为了保证不浪费空间， 在队列空间等于总⻓度四分之⼀时
    // 且不为 2 时缩⼩总⻓度为当前的⼀半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return
  }
  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength() {
    return this.queue.length - 1
  }
  isEmpty() {
    return this.first === this.last
  }
  resize(length) {
    let q = new Array(length)
    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
```

## undefined 和 undeclared

```js
var a
typeof a // "undefined"
typeof b // erenceError: b is not defined  // undeclared
```

## ajax 和 axios、fetch 的区别

> ajax

1. 本身是针对 MVC 的编程,不符合现在前端 MVVM 的浪潮
2. 基于原生的 XHR 开发，XHR 本身的架构不清晰。
3. JQuery 整个项目太大，单纯使用 ajax 却要引入整个 JQuery 非常的不合理

> axios

1. 从浏览器中创建 XMLHttpRequest
2. 支持 Promise API
3. 客户端支持防止 CSRF
4. 提供了一些并发请求的接口（重要，方便了很多的操作）
5. 从 node.js 创建 http 请求
6. 拦截请求和响应
7. 转换请求和响应数据
8. 取消请求
9. 自动转换 JSON 数据

> fetch

1.  语法简洁，更加语义化
2.  基于标准 Promise 实现，支持 async/await
3.  同构方便，使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
4.  更加底层，提供的 API 丰富（request, response）
5.  脱离了 XHR，是 ES 规范里新的实现方式

## typeof 为什么对 null 错误的显示

这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object

## ["1","2","3"].map(parseInt)的输出结果是多少?

二进制

```js
parseInt('1', 0, ['1', '2', '3'])
parseInt('2', 1, ['1', '2', '3'])
parseInt('3', 2, ['1', '2', '3'])
```

- parseInt('1', 0, ['1','2','3']): radix 为 0 时，默认取 10，最后返回 1
- parseInt('2', 1, ['1','2','3']): radix 取值为 2~36，返回 NaN
- parseInt('3', 2, ['1','2','3']): radix 取值为 2，二进制只包括 0，1，返回 NaN

## a.b.c.d 和 a['b']['c']['d']，哪个性能更高？

应该是 a.b.c.d 比 a['b']['c']['d'] 性能高点，后者还要考虑 [ ] 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。

## 后端一次给你 10 万条数据，如何优雅展示

> 直接渲染, 因为一次性渲染出 10w 个节点，是非常耗时间的，咱们可以来看一下耗时，差不多要消耗 12 秒，非常消耗时间

```js
const renderList = async () => {
  console.time('列表时间')
  const list = await getList()
  list.forEach(item => {
    const div = document.createElement('div')
    div.className = 'sunshine'
    div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
    container.appendChild(div)
  })
  console.timeEnd('列表时间')
}
renderList()
```

> setTimeout 分页渲染 把 10w 按照每页数量 limit 分成总共 Math.ceil(total / limit)页，然后利用 setTimeout

```js
const renderList = async () => {
  console.time('列表时间')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = page => {
    if (page >= totalPage) return
    setTimeout(() => {
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i]
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        container.appendChild(div)
      }
      render(page + 1)
    }, 0)
  }
  render(page)
  console.timeEnd('列表时间')
}
```

> requestAnimationFrame ,requestAnimationFrame 代替 setTimeout，减少了重排的次数，极大提高了性能，建议大家在渲染方面多使用 requestAnimationFrame

```js
const renderList = async () => {
  console.time('列表时间')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = page => {
    if (page >= totalPage) return
    // 使用requestAnimationFrame代替setTimeout
    requestAnimationFrame(() => {
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i]
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        container.appendChild(div)
      }
      render(page + 1)
    })
  }
  render(page)
  console.timeEnd('列表时间')
}
```

> 文档碎片 + requestAnimationFrame
> 文档碎片的好处
> 1、之前都是每次创建一个 div 标签就 appendChild 一次，但是有了文档碎片可以先把 1 页的 div 标签先放进文档碎片中，然后一次性 appendChild 到 container 中，这样减少了 appendChild 的次数，极大提高了性能
> 2、页面只会渲染文档碎片包裹着的元素，而不会渲染文档碎片

```js
const renderList = async () => {
  console.time('列表时间')
  const list = await getList()
  console.log(list)
  const total = list.length
  const page = 0
  const limit = 200
  const totalPage = Math.ceil(total / limit)

  const render = page => {
    if (page >= totalPage) return
    requestAnimationFrame(() => {
      // 创建一个文档碎片
      const fragment = document.createDocumentFragment()
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i]
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        // 先塞进文档碎片
        fragment.appendChild(div)
      }
      // 一次性appendChild
      container.appendChild(fragment)
      render(page + 1)
    })
  }
  render(page)
  console.timeEnd('列表时间')
}
```

> 懒加载
> 为了比较通俗的讲解，咱们启动一个 vue 前端项目，后端服务还是开着
> 其实实现原理很简单，咱们通过一张图来展示，就是在列表尾部放一个空节点 blank，然后先渲染第 1 页数据，向上滚动，等到 blank 出现在视图中，就说明到底了，这时候再加载第二页，往后以此类推。
> 至于怎么判断 blank 出现在视图上，可以使用 getBoundingClientRect 方法获取 top 属性

```vue
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
const getList = () => {
  // 跟上面一样的代码
}

const container = ref<HTMLElement>() // container节点
const blank = ref<HTMLElement>() // blank节点
const list = ref<any>([]) // 列表
const page = ref(1) // 当前页数
const limit = 200 // 一页展示
// 最大页数
const maxPage = computed(() => Math.ceil(list.value.length / limit))
// 真实展示的列表
const showList = computed(() => list.value.slice(0, page.value * limit))
const handleScroll = () => {
  // 当前页数与最大页数的比较
  if (page.value > maxPage.value) return
  const clientHeight = container.value?.clientHeight
  const blankTop = blank.value?.getBoundingClientRect().top
  if (clientHeight === blankTop) {
    // blank出现在视图，则当前页数加1
    page.value++
  }
}

onMounted(async () => {
  const res = await getList()
  list.value = res
})
</script>

<template>
  <div id="container" @scroll="handleScroll" ref="container">
    <div class="sunshine" v-for="item in showList" :key="item.tid">
      <img :src="item.src" />
      <span>{{ item.text }}</span>
    </div>
    <div ref="blank"></div>
  </div>
</template>
```

## less 与 sass 的区别

> 相同点：都是 css 预处理器,嵌套写法相同,&父选择器
> 不同点:

| 不同点 | less | sass |
| ------ | ---- | ---- |
| 变量   | @    | $    |
|编译环境|Less是需要引入less.js来处理less代码输出css|scss是在服务端处理Node-Sass
