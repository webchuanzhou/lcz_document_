<!--
 * @Description:
 * @Autor: lcz
 * @Date: 2022-05-23 11:25:56
 * @LastEditors: lcz
 * @LastEditTime: 2022-05-23 11:29:12
-->

## postpxtorem 实现响应式布局

- index.jsx 引入 flexible

```js
import '@/utils/flexible'
```

- flexible.js

```js
/*
 * @Description:
 * @Autor: lcz
 * @Date: 2022-05-19 15:16:51
 * @LastEditors: lcz
 * @LastEditTime: 2022-05-21 13:36:58
 */
;(function flexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    if (docEl.clientWidth <= 800) {
      rem = rem * (1920 / 750)
    }
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)
```

- 依赖 postcss-pxtorem

```js
addPostcssPlugins([
    require('postcss-pxtorem')({
      rootValue: 192, //设计稿图/10 与flexble 一致 可实现PC 与 移动端适配
      propList: ['*'],
      unitPrecision: 5,
      mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
      minPixelValue: 12, //px小于12的不会被转换
      // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
      // propWhiteList: []
    }),
  ]),
```
