<!--
 * @Author: your name
 * @Date: 2021-10-09 09:47:16
 * @LastEditTime: 2021-11-12 17:49:55
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

## 5.Object.prototype.toString.call() 
```js
toString.call(()=>{})       // [object Function]
toString.call({})           // [object Object]
toString.call([])           // [object Array]
toString.call('')           // [object String]
toString.call(22)           // [object Number]
toString.call(undefined)    // [object undefined]
toString.call(null)         // [object null]
toString.call(new Date)     // [object Date]
toString.call(Math)         // [object Math]
toString.call(window)       // [object Window]
```