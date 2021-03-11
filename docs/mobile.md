<!--
 * @Author: your name
 * @Date: 2021-03-11 16:39:24
 * @LastEditTime: 2021-03-11 16:55:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\mobile.md
-->

## 1.调用系统功能

```html
<!-- 拨打电话 -->
<a href="tel:10086">拨打电话给10086小姐姐</a>
<!-- 发送短信 -->
<a href="sms:10086">发送短信给10086小姐姐</a>
<!-- 发送邮件 -->
<a href="mailto:young.joway@aliyun.com">发送邮件给JowayYoung</a>
<!-- 选择照片或拍摄照片 -->
<input type="file" accept="image/*" />
<!-- 选择视频或拍摄视频 -->
<input type="file" accept="video/*" />
<!-- 多选文件 -->
<input type="file" multiple />
```

## 2.忽略自动识别

```html
<!-- 忽略自动识别电话和邮箱 -->
<meta name="format-detection" content="telephone=no, email=no" />
```

## 3.弹出数字键盘

```html
<!-- 纯数字带#和* -->
<input type="tel" />
<!-- 纯数字 -->
<input type="number" pattern="\d*" />
```

## 4.唤醒原生应用

```html
<!-- 打开微信 -->
<a href="weixin://">打开微信</a>
<!-- 打开支付宝 -->
<a href="alipays://">打开支付宝</a>
<!-- 打开支付宝的扫一扫 -->
<a href="alipays://platformapi/startapp?saId=10000007">打开支付宝的扫一扫</a>
```

## 5.禁止页面缓存

```html
<meta http-equiv="Cache-Control" content="no-cache" />
```

## 6.禁止字母大写

```html
<input autocapitalize="off" autocorrect="off" />
```

## 7.Safari 配置

```html
<!-- 设置Safari全屏，在iOS7+无效 -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 改变Safari状态栏样式，可选default/black/black-translucent，需在上述全屏模式下才有效 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 添加页面启动占位图 -->
<link
  rel="apple-touch-startup-image"
  href="pig.jpg"
  media="(device-width: 375px)"
/>
<!-- 保存网站到桌面时添加图标 -->
<link rel="apple-touch-icon" sizes="76x76" href="pig.jpg" />
<!-- 保存网站到桌面时添加图标且清除默认光泽 -->
<link rel="apple-touch-icon-precomposed" href="pig.jpg" />
```

## 8.针对其他浏览器配置

```html
<!-- 强制QQ浏览器竖屏 -->
<meta name="x5-orientation" content="portrait" />
<!-- 强制QQ浏览器全屏 -->
<meta name="x5-fullscreen" content="true" />
<!-- 开启QQ浏览器应用模式 -->
<meta name="x5-page-mode" content="app" />
<!-- 强制UC浏览器竖屏 -->
<meta name="screen-orientation" content="portrait" />
<!-- 强制UC浏览器全屏 -->
<meta name="full-screen" content="yes" />
<!-- 开启UC浏览器应用模式 -->
<meta name="browsermode" content="application" />
<!-- 开启360浏览器极速模式 -->
<meta name="renderer" content="webkit" />
```

## 9.让:active 有效，让:hover 无效

```html
<body ontouchstart></body>
```

## 10.支持弹性滚动

```html
在苹果系统上非
<body>
  元素的滚动操作可能会存在卡顿，但安卓系统不会出现该情况。通过声明overflow-scrolling:touch调用系统原生滚动事件优化弹性滚动，增加页面滚动的流畅度。
  body { -webkit-overflow-scrolling: touch; } .elem { overflow: auto; }
</body>
```

## 11.禁止滚动传播

```html
与桌面端浏览器不一样，移动端浏览器有一个奇怪行为。当页面包含多个滚动区域时，滚完一个区域后若还存在滚动动量则会将这些剩余动量传播到下一个滚动区域，造成该区域也滚动起来。这种行为称为滚动传播。
若不想产生这种奇怪行为可直接禁止 .elem { overscroll-behavior: contain; }
```

## 12.监听屏幕旋转

```html
/* 横屏 */ @media all and (orientation: landscape) { /* 自定义样式 */ } /* 竖屏
*/ @media all and (orientation: portrait) { /* 自定义样式 */ }
```

## 13.禁止屏幕抖动

```html
触发条件：打开弹窗就隐藏滚动条，关闭弹窗就显示滚动条，来回操作会让屏幕抖动起来。
解决：100vw为视窗宽度，100%为滚动容器内容宽度，相减就是滚动条宽度，妥妥的动态计算。
body { padding-right: calc(100vw - 100%); }
```

## 14.禁止长按操作

```html
* {
/* pointer-events: none; */ /* 微信浏览器还需附加该属性才有效 */
user-select: none; /* 禁止长按选择文字 */
-webkit-touch-callout: none;
}
但声明user-select:none会让<input>和<textarea>无法输入文本，可对其声明user-select:auto排除在外。
input, textarea { user-select: auto; }

```

## 15.禁止字体调整

```html
触发：旋转屏幕可能会改变字体大小，声明text-size-adjust:100%让字体大小保持不变。
解决：* { text-size-adjust: 100%; }
```

## 16.禁止高亮显示

```html
触发：触摸元素会出现半透明灰色遮罩，不想要！ * { -webkit-tap-highlight-color:
transparent; }
```

## 17.禁止动画闪屏

```html
在移动设备上添加动画，多数情况会出现闪屏，给动画元素的父元素构造一个3D环境就能让动画稳定运行了。
.elem { perspective: 1000; backface-visibility: hidden; transform-style:
preserve-3d; }
```

## 18.对齐输入占位

```html
有强迫症的同学总会觉得输入框文本位置整体偏上，感觉未居中心里就痒痒的。桌面端浏览器里声明line-height等于height就能解决，但移动端浏览器里还是未能解决，需将line-height声明为normal才行。
input { line-height: normal; }
```

## 19.开启硬件加速

```html
想动画更流畅吗，开启GPU硬件加速呗！ .elem { transform: translate3d(0, 0, 0); /*
transform: translateZ(0); */ }
```

## 20.描绘一像素边框

```html
.elem { position: relative; width: 200px; height: 80px; &::after { position:
absolute; left: 0; top: 0; border: 1px solid #f66; width: 200%; height: 200%;
content: ""; transform: scale(.5); transform-origin: left top; } }
```
