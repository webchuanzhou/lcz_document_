<!--
 * @Author: your name
 * @Date: 2021-10-08 10:49:24
 * @LastEditTime: 2022-05-23 11:45:40
 * @LastEditors: lcz
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\css\accumulation.md
-->

# 参考链接

[css 样式 1](https://juejin.im/post/5ed3c27ee51d455f9a6368c9)
[css 样式 2](https://juejin.cn/post/6898482129592647693)

## 解决图片 5px 间距

```html
1.给父元素设置font-size: 0 2.给img设置display: block 3.给img设置vertical-align: bottom 4.给父元素设置line-height: 5px;
```

## 修改 input placeholder 样式

```html
.placehoder-custom::-webkit-input-placeholder{ color: #babbc1; font-size: 12px; }
```

## 巧用 not 选择器

//最后一个不 border-bottom

```html
li:not(:last-child){ border-bottom: 1px solid #ebedf0; }
```

## caret-color 改变光标颜色

```html
.caret-color { /* 关键css */ caret-color: #ffd476; }
```

## 移除 type="number"尾部的箭头

```html
.no-arrow::-webkit-outer-spin-button, .no-arrow::-webkit-inner-spin-button { -webkit-appearance: none; }
```

## 解决 IOS 滚动条卡顿

```html
body,html{ -webkit-overflow-scrolling: touch; }
```

## 自定义属性

之前我们通常是在预处理器里才可以使用变量，而现在 CSS 里也支持了变量的用法。通过自定义属性就可以在想要使用的地方引用它。
自定义属性也和普通属性一样具有级联性，申明在 :root 下的时候，在全文档范围内可用，而如果是在某个元素下申明自定义属性，则只能在它及它的子元素下才可以使用。
自定义属性必须通过 --x 的格式申明，比如：--theme-color: red; 使用自定义属性的时候，需要用 var 函数。比如：

```html
<!-- 定义自定义属性 -->
:root { --theme-color: red; }
<!-- 使用变量 -->
h1 { color: var(--theme-color); }
```

## 溢出...

单行超出省略
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;

多行超出省略
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;

## 所有水平垂直居中

```html
.allCenter{ height: 100vh; display: -webkit-box; -webkit-box-orient: vertical; -webkit-box-pack: center;
-webkit-box-align: center; display: -moz-box; -moz-box-orient: vertical; -moz-box-pack: center; -moz-box-align: center;
display: -o-box; -o-box-orient: vertical; -o-box-pack: center; -o-box-align: center; display: -ms-box; -ms-box-orient:
vertical; -ms-box-pack: center; -ms-box-align: center; display: box; box-orient: vertical; box-pack: center; box-align:
center; box-sizing: border-box; }
```

## 掘金头像移入旋转

```css
transform: rotate(666turn);
transition-delay: 1s;
transition-property: all;
transition-duration: 59s;
transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
```

## 气泡效果

```html
<div class="poptip btn" aria-controls="弹出气泡">poptip</div>
$poptipBg: #30363d; $color: #fff; $triangle: 8px; $distance: -12px; .poptip { position: relative; z-index: 101;
margin-top:100px; &::before, &::after { visibility: hidden; opacity: 0; transform: translate3d(0, 0, 0); transition: all
0.3s ease 0.2s; box-sizing: border-box; } &::before { content: ""; position: absolute; width: 0; height: 0;
border-style: solid; border-width: $triangle $triangle 0 $triangle; border-color: $poptipBg transparent transparent
transparent; left: calc(50% - #{$triangle}); top: 0px; transform: translateX(0%) translateY($distance); } &::after {
font-size: 14px; color: $color; content: attr(aria-controls); position: absolute; padding: 6px 12px; white-space:
nowrap; z-index: -1; left: 50%; bottom: 100%; transform: translateX(-50%) translateY($distance); background: $poptipBg;
line-height: 1; border-radius: 2px; } &:hover::before, &:hover::after { visibility: visible; opacity: 1; } } .btn {
min-width: 100px; line-height: 1.5; padding: 5px 10px; color: #fff; background: #00adb5; border-radius: 4px; text-align:
center; cursor: pointer; }
```

## 黑白模式

> 实现思路 项目根目录 body 下的 div 动态增加样式类 ,localstorge 本地存储,拿取付值
> react demo

- APP.jsx

```jsx
import { moduleReducer, allPageContext } from '@/redux/pageModule'
 const [module, dispatchModule] = useReducer(
    moduleReducer,
    storage.get('PAGEMODULE') ? storage.get('PAGEMODULE') : 'block'
  )
<div className={`App page${module}`}>
<allPageContext.Provider value={{ module, dispatchModule }}></allPageContext.Provider>
<div>
```

- rudux

```jsx
import { createContext } from 'react'
export const allPageContext = createContext()
export const UPDATE_MODULES = 'UPDATE_MODULES'
export const moduleReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_MODULES:
      return action.modules
    default:
      return state
  }
}
```

- scss 全局变量文件

```scss
.pageblock {
  --ptheme-bgColor: #040915;
  --ptheme-color: #ffffff;
  --ptheme-addressBgColor: #192235;
  --ptheme-jb1: #14374f;
  --ptheme-jb2: #470435;
  --ptheme-noSelect: #999999;
  --ptheme-line-jb1: #50a4fa;
  --ptheme-line-jb2: #7b32ed;
  --ptheme-border: rgba(255, 255, 255, 0.2);
  --ptheme-block2Bg: rgba(86, 103, 138, 0.18);
  --ptheme-btnCancel: #7d798d;
  --ptheme-itemBg: #060a10;
  --ptheme-colorBlue: #ffffff;
  --ptheme-inputBg: #251634;
  --ptheme-jb3: #50a8fb;
  --ptheme-jb4: #7d2ced;
}
.pagewhite {
  --ptheme-bgColor: #ffffff;
  --ptheme-color: #040915;
  --ptheme-addressBgColor: #4fbaff;
  --ptheme-jb1: #4cb9ff;
  --ptheme-jb2: #0487ff;
  --ptheme-noSelect: rgba(153, 153, 153, 0.5);
  --ptheme-line-jb1: #50a4fa;
  --ptheme-line-jb2: #7b32ed;
  --ptheme-border: rgba(255, 255, 255, 0.2);
  --ptheme-block2Bg: #f3f3f3;
  --ptheme-btnCancel: #ffffff;
  --ptheme-itemBg: #ffffff;
  --ptheme-colorBlue: #0588ff;
  --ptheme-inputBg: #ffffff;
  --ptheme-jb3: #0487ff;
  --ptheme-jb4: #49b7ff;
}
```
