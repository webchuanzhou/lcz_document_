<!--
 * @Author: your name
 * @Date: 2021-03-16 09:49:25
 * @LastEditTime: 2021-10-12 18:27:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\base.md
-->
# 参考链接
[面试题1](https://juejin.im/post/5eda38ebf265da7700281d57#heading-176)
[面试题2](https://juejin.im/post/5ef8377f6fb9a07e693a6061)
[面试题3](https://juejin.im/post/5f0928cf5188252e9b46f717)
[面试题4](https://juejin.im/post/5d23e750f265da1b855c7bbe)
[基础面试题5](https://juejin.im/post/6867715946941775885)


## 1.new一个对象过程

1. 创建一个空对象
2. 链到原型上
3. 绑定this
4. 返回新对象
- - -
实现
```js
  function create(){
    //创建一个空对象
    let obj = new Object();
    // 获得构造函数
    let Con = [].shift.call(arguments);
    //链到原型上
    obj.__proto__ = Con.prototype
    // 绑定this，执行构造函数
    let result = Con.apply(obj,arguments);
    // 确保new 出来的是个对象
    return typeof result == 'object' ? result :  obj
  }
```
## 2.js作用域与作用域链
## 3.es6用了哪些
## 4.vue2.0跟3.0的区别有哪些
## 5.this指向是如何工作的
## 6.面向对象的三大特性，封装继承多态
继承的形式有哪些
封装的形式有哪些
多态的形式有哪些
## 7.js字符串的方法
## 8.vue生命周期
## 9.什么是高阶函数，接触过的高阶函数有哪些
## 10.重绘，回流
## 11.js计算为什么会有浮点数
## 12.跨域问题，以及解决方案
## 13.前端的安全性问题 xss csrf 上传 sql
## 14.chrome如何支持小于12px的字体
## 15.url输入后的过程
## 16.深拷贝与浅拷贝的区别
## 17.option预请求的理解
## 18.object.create 与new object的区别
## 19.说说对原型的理解，原型链
## 20.v-model的原理
## 21.宏任务与微任务
## 22.闭包
## 23.promise
## 24.es6
## 25.为什么组件中的data必须是个函数
## 26.v-if和v-show的区别
## 27.v-for中的key
## 28.双向数据绑定的原理
## 29.组件传递
## 30.mvvm和mvc
## 31.Computed和Watch
## 32.虚拟Dom以及key的作用
## 33.那些vue的优化
## 34.cookies，sessionStorage 和 localStorage
## 35.事件循环
## 36.事件代理 事件委托机制 ,以及优点
  答案：这样只在内存中开辟一块空间，既节省资源又减少DOM操作，提高性能动态绑定事件，
## 37.匿名函数的典型用例
## 38:请为什么说js是单线程，而不是多线程呢，说说你的理解
  答案:JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如：一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
## 39:表单提交可以跨域吗？ 会存在什么问题?
## 40.检测数据类型的方式有集中 
  答案: 1.typeOf 2. Object.prototype.toString.call()
## 41.数组去重的方法
## 42.websock使用方式 如何传参
## 43.如何解决移动端1px 问题
## 44.异步编程的方式有哪几种，优点缺点是啥
## 45.promise的特性，优点缺点，内部实现
  答案：优点更方便处理异步操作 缺点：不能中断
## 46.webpack打包速度太慢如何优化
  答案：Webpack、多线程/多实例构建、缩小打包作用域、充分利用缓存提升二次构建速度，CDN
## 47.loader 和 plugin的区别
  答案：loader 是一个转换器，文件转换的过程，
plugin是扩展器，丰富webpack本身，loader结束后，执行plugin打包的整个过程
##  48.如何取消发送出去的请求 后端还没相应的数据
##  49.npm install 干了什么事情
 答案：npm install读取package.json以创建依赖关系列表，并使用package-lock.json告知要安装这些依赖关系的版本。
## 50.页面刷新后vuex中的数据丢失了 如何处理
## 51.为什么要用vuex,localStorge不行吗
## 52. Vue 的 template 是如何编译的
答案:vue-loader 里有然后专门处理 template 的 loader，最终本质上还是 createElement
## 53.webpack 的热更新原理大概介绍一下
答案:本地起服务，通过文件内容 hash 来判断是否更新，客户端收到更新消息后会取拉取最新代码进行更新

## 54.promise 返回的是什么？
答案：每次promise返回的都是一个新的promise
每次promise返回的一样不一样？
答案：不一样
为啥不一样？
答案：可能有偏差（每次都是new新的promise 聊聊new 干了啥） 或者 在promise数组中的引用地址不一样
为什么要返回一个新的promise？
因为promise的状态修改只能pending -> resolved这个方向，一旦修改，不可更改。

##  55.判断数组的方法，请分别介绍它们之间的区别和优劣
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

## 56.水平垂直居中
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

## 57.import 与 require的区别
import 是静态引入 必需放在头部 ，只是引用 浅拷贝
require 动态引入  深拷贝
import 是编译时的 require 是运行时候的 ，性能上比require好很多


## 58. 内置类型之(原始数据类型)与(引用数据类型)
> 原始数据类型
 1. null
 2. undefined
 3. string
 4. number
 5. boolean
 6. symbol
 7. bigint
> 引用数据类型
 1. Object
 2. Array
 

## 59.类型判断
* 原始类型中除了 null，其它类型都可以通过 typeof 来判断。
* instanceof 引用数据类型
* Object.prototype.toString.call()最佳判断
- - -
instanceof 实现原理
```js
  function instance_of(left,right){
    //获取类型的原型
    let prototype = right.prototype
    //获取对象的原理
    left = left.__proto__
    //判断对象的类型是否等于类型的原型
    while (true) {
      if(left === null)
      return false
      if(prototype === left)
      return true
      left = left.__proto__
    }
  }
```

## 60.对象如何转基础数据类型(感觉有点鸡肋目前)
> 对象转化为基础数据类型，其实最终都是用调用对象自带的valueOf和toString两个方法之一
> 什么时候调用 valueOf和toString
```js
var foo = {
    toString: function () {
        return "foo";
    },
    valueOf: function () {
        return 5;
    }
};

alert(foo + "bar"); // 5bar
alert([foo, "bar"].join("")); // foobar
```
Symbol.toPrimitive 可以重写
```js
var foo = {
    toString: function () {
        return "foo";
    },
    valueOf: function () {
        return 5;
    },
    [Symbol.toPrimitive]() {
      return 2
    }
};
alert(foo + "1"); // 21
alert(foo + 1); // 3
```
