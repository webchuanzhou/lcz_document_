<!--
 * @Author: lcz
 * @Date: 2021-03-11 15:10:13
 * @LastEditTime: 2021-03-25 16:49:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lczdocs\docs\layout.md
-->


## 盒模型

标准盒模型认为：盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框
所以 .box 元素内容的宽度就为 200px，而实际的宽度则是 width + padding-left + padding-right + border-left-width + border-right-width = 200 + 10 + 10 + 1 + 1 = 222。

IE 盒模型认为：盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框
.box 元素所占用的实际宽度为 200px，而内容的真实宽度则是 width - padding-left - padding-right - border-left-width - border-right-width = 200 - 10 - 10 - 1 - 1 = 178。

在 CSS3 中新增了一个属性 box-sizing
content-box：标准盒模型；
border-box：IE 盒模型；

## rem
rem(root em) 和 em 一样，也是一个相对长度单位，不过 rem 相对的是 HTML 的根元素 html。
rem 由于是基于 html 的 font-size 来计算，所以通常用于自适应网站或者 H5 中。
比如在做 H5 的时候，前端通常会让 UI 给 750px 宽的设计图，而在开发的时候可以基于 iPhone X 的尺寸 375px * 812px 来写页面，这样一来的话，就可以用下面的 JS 依据当前页面的视口宽度自动计算出根元素 html 的基准 font-size 是多少。

```html
  (function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        psdWidth = 750,  // 设计图宽度
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if ( !clientWidth ) return;
            if ( clientWidth >= 640 ) {
                docEl.style.fontSize = 200 * ( 640 / psdWidth ) + 'px';
            } else {
                docEl.style.fontSize = 200 * ( clientWidth / psdWidth ) + 'px';
            }
        };

    if ( !doc.addEventListener ) return;
    // 绑定事件的时候最好配合防抖函数
    win.addEventListener( resizeEvt, debounce(recalc, 1000), false );
    doc.addEventListener( 'DOMContentLoaded', recalc, false );
    
    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timeout)
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
})(document, window);
```
比如当视口是 375px 的时候，经过计算 html 的 font-size 会是 100px，这样有什么好处呢？好处就是方便写样式，比如从设计图量出来的 header 高度是 50px 的，那我们写样式的时候就可以直接写：

```html
  header {
    height: 0.5rem;
}
```

## 自定义属性

之前我们通常是在预处理器里才可以使用变量，而现在 CSS 里也支持了变量的用法。通过自定义属性就可以在想要使用的地方引用它。
自定义属性也和普通属性一样具有级联性，申明在 :root 下的时候，在全文档范围内可用，而如果是在某个元素下申明自定义属性，则只能在它及它的子元素下才可以使用。
自定义属性必须通过 --x 的格式申明，比如：--theme-color: red; 使用自定义属性的时候，需要用 var 函数。比如：

```html
<!-- 定义自定义属性 -->
:root {
    --theme-color: red;
}
<!-- 使用变量 -->
h1 {
    color: var(--theme-color);
}
```