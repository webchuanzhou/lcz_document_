<!--
 * @Author: your name
 * @Date: 2021-10-08 10:49:24
 * @LastEditTime: 2021-10-08 10:58:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\css\accumulation.md
-->

## 解决图片 5px 间距

```html
  1.给父元素设置font-size: 0
  2.给img设置display: block
  3.给img设置vertical-align: bottom
  4.给父元素设置line-height: 5px;
```

## 修改input placeholder样式
```html
  .placehoder-custom::-webkit-input-placeholder{
    color: #babbc1;
    font-size: 12px;
  }
```

## 巧用not选择器
//最后一个不border-bottom
```html
  li:not(:last-child){
    border-bottom: 1px solid #ebedf0;
  }
```

## caret-color 改变光标颜色
```html
  .caret-color {
    /* 关键css */
    caret-color: #ffd476;
  }
```

##  移除type="number"尾部的箭头
```html
  .no-arrow::-webkit-outer-spin-button,
  .no-arrow::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
```

## 解决IOS滚动条卡顿
```html
body,html{   
  -webkit-overflow-scrolling: touch;
}
```