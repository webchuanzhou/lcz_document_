<!--
 * @Author: your name
 * @Date: 2021-03-16 09:49:25
 * @LastEditTime: 2021-04-22 11:23:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\base.md
-->
##  1.判断数组的方法，请分别介绍它们之间的区别和优劣
```html
  Object.prototype.toString.call()、instanceof、Array.isArray()以及typeof
```
Object.prototype.toString.call() 常用于判断浏览器内置对象。
instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
Array.isArray()是ES5新增的方法,当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。
```html
  if (!Array.isArray) {
      Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]';
      };
  }
```
typeof 只能检测基本数据类型，包括boolean、undefined、string、number、symbol，
而null、Array、Object ,使用typeof检测出来都是Object，无法检测具体是哪种引用类型。

## 2.水平垂直居中
使用position + transform，不定宽高时
```html
  .parent{
    position: relative;
  }
  .child{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
  }
```
使用position + transform，有宽高时
```html
  .parent{
    position: relative;
  }
  .child{
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
  }
```
3）使用flex
```html
  .parent{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  或者
  .parent{
    display: flex;
    align-items: center;
  }
  .child{
      margin: 0 auto;
  }
  或者
  .parent{
    display: flex;
  }
  .child{
      margin: auto;
  }
```
4）使用position
```html
  .parent{
    position: relative;
}
.child{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
5）使用grid
```html
.parent{
    display: grid;
}
.child{
    justify-self: center;
    align-self: center;
}
```

6）使用table
```html
.parent{
    display: table;
}
.child{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```

## import 与 require的区别
import 是静态引入 必需放在头部 ，只是引用 浅拷贝
require 动态引入  深拷贝
import 是编译时的 require 是运行时候的 ，性能上比require好很多

## 类型判断
原始类型中除了 null，其它类型都可以通过 typeof 来判断。
instanceof 引用数据类型
Object.prototype.toString.call()最佳判断

