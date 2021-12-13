<!--
 * @Author: your name
 * @Date: 2021-10-09 09:47:16
 * @LastEditTime: 2021-12-13 11:02:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\accumulation.md
-->

## 1.require 如何动态循环引入 img 图片 ，因为有 hash 不能正常引入？

> 解决：对象的方式引入

```js
let abc = {
  title: item.title,
  img: require(item.img),
}
```

> 方式 2:

```js
const context = require.context('@/static', true, /\.(png|jpg)$/)
context('./url' + String(i).padStart(this.baseZero, '0') + '.png')
```

## 2.解析有效日期

触发：在苹果系统上解析 YYYY-MM-DD HH:mm:ss 这种日期格式会报错 Invalid Date，但在安卓系统上解析这种日期格式完全无问题。

```js
const date = '2019-03-31 21:30:00'
new Date(date.replace(/\-/g, '/'))
```

## 3.禁止滑动穿透

```js
  body.static { position: fixed; left: 0; width: 100%; }
  const body = document.body;
  const openBtn = document.getElementById("open-btn");
  const closeBtn = document.getElementById("close-btn"); openBtn.addEventListener("click", e => {
    e.stopPropagation();
    const scrollTop = document.scrollingElement.scrollTop; body.classList.add("static"); body.style.top = `-${scrollTop}px`; }); closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    body.classList.remove("static"); body.style.top = "";
  });


```

## 4. uuid 生成

```js
function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}
```
> 方式2一行生成UUid
```js
URL.createObjectURL(new Blob()).substr(-36)
```

## 5.Object.prototype.toString.call()

```js
toString.call(() => {}) // [object Function]
toString.call({}) // [object Object]
toString.call([]) // [object Array]
toString.call('') // [object String]
toString.call(22) // [object Number]
toString.call(undefined) // [object undefined]
toString.call(null) // [object null]
toString.call(new Date()) // [object Date]
toString.call(Math) // [object Math]
toString.call(window) // [object Window]
```

## ??合并空运算符

假设变量 a 不存在，我们希望给系统一个默认值，一般我们会使用||运算符。但是在 javascript 中空字符串，0，false 都会执行||运算符，所以 ECMAScript2020 引入合并空运算符解决该问题，只允许在值为 null 或未定义时使用默认值。

<!-- null 和 undefined 时才会执行 ??  -->

```js
const name = ''

console.log(name || 'yd') // yd;
console.log(name ?? 'yd') // '';
```

## 声明和初始化数组

```js
const array = Array(5).fill('');
// 输出
(5) ["", "", "", "", ""]

const matrix = Array(5).fill(0).map(() => Array(5).fill(0))
// 输出
(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 0, 0, 0, 0]
2: (5) [0, 0, 0, 0, 0]
3: (5) [0, 0, 0, 0, 0]
4: (5) [0, 0, 0, 0, 0]
length: 5
```

## void 0 与 undefined 的区别

> 为什么用 void 0 来代替 undefined
> undefined 可以被重写  
> undefined 在 ES5 中已经是全局对象的一个只读（read-only）属性了，它不能被重写。但是在局部作用域中，还是可以被重写的。

```js
;(function () {
  var undefined = 10

  // 10 -- chrome
  alert(undefined)
})()

;(function () {
  undefined = 10

  // undefined -- chrome
  alert(undefined)
})()
```

> 为什么选择 void 0 作为 undefined 的替代
> void 运算符能对给定的表达式进行求值，然后返回 undefined。也就是说，void 后面你随便跟上一个表达式，返回的都是 undefined，如 void (2), void (‘hello’)。并且 void 是不能被重写的。但为什么是 void 0 呢，void 0 是表达式中最短的。用 void 0 代替 undefined 能节省字节。不少 JavaScript 压缩工具在压缩过程中，正是将 undefined 用 void 0 代替掉了。
