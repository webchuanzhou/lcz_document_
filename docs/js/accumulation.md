<!--
 * @Author: your name
 * @Date: 2021-10-09 09:47:16
 * @LastEditTime: 2021-10-09 09:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\accumulation.md
-->
## 1.require 如何动态循环引入img图片 ，因为有hash 不能正常引入？
解决：对象的方式引入
```js
let abc = {
  title:item.title,
  img:require(item.img)
}
```

## 2.解析有效日期
触发：在苹果系统上解析YYYY-MM-DD HH:mm:ss这种日期格式会报错Invalid Date，但在安卓系统上解析这种日期格式完全无问题。
```js
  const date = "2019-03-31 21:30:00"; 
  new Date(date.replace(/\-/g, "/"));

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