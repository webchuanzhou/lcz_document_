<!--
 * @Author: lcz
 * @Date: 2021-03-11 15:10:13
 * @LastEditTime: 2021-10-09 09:45:17
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

## rem布局
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

## h5 meta布局
/*
* initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
* maximum-scale：允许用户缩放到的最大比例。
* minimum-scale：允许用户缩放到的最小比例。
* user-scalable：用户是否可以手动缩放

* 这边 initial-scale, maximum-scale 和minimum-scale 都要设置为scale 值。
* 特别注意：meta的content中的值不要设置width
*/

```html
    !function (w) {
        InitView();
        "onorientationchange" in w && w.addEventListener("orientationchange", function () {
            InitView()
        }, false);
        w.addEventListener("resize", function () {
            InitView()
        }, false);

        function InitView() {
            var uiWidth = 750,
                width = screen.width,
                height = screen.height,
                scale = width / uiWidth,
                el = width.viewMeta || document.createElement('meta');
                width.viewMeta || document.getElementsByTagName("head")[0].appendChild(el);
            el.setAttribute('name', 'viewport');
            el.setAttribute('content', "width=" + uiWidth + ", initial-scale=" + scale + ",maximum-scale=" + scale + ",minimum-scale=" + scale + ", user-scalable=no,target-densitydpi=device-dpi,minimal-ui,uc-fitscreen=no");
            width.viewMeta = el;
            window.viewPortNum = scale;
        }

        w.showPlaceholder = 1;
    }(window);
```
