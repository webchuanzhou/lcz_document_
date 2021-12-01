<!--
 * @Author: lcz
 * @Date: 2021-11-04 16:12:51
 * @LastEditTime: 2021-11-04 17:31:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\readingBooks\effective.md
-->

### 原始类型优与封装对象

```js
//new的 封装对象
let str = new String('hello')
let str2 = new String('hello')
let a = 'hello'
typeof str //object
typeof 'hello' // string
str === str2 // false
a === 'hello' // true
```

```js
let a = 'hello'
a.str = 17
console.log(a) //hello
let str = new String('hello')
str.isStrge = 17
/*
  {0: "h"
  1: "e"
  2: "l"
  3: "l"
  4: "o"
  isStrge: 17}
*/
console.log(str)
```

> ps:封装对象 就是经过 Object 包裹

### ;
>你只能在一行、一段代码和一个程序的结尾省略了分号。
>分号仅在随后的输入标记不能解析时插入
```js
;(()=>{console.log('function')})()
```

> ps:可能解析的时候出现实际换行代码相连，解析报错

### unicode 字符长度坑
```js
'💩'.length //2
'sdks'.length // 4

/^.$/.test('💩') // false
/^..$/.test('💩') // true

```

>ps : 解析长度时：数组或者标签会被unicode转码长度可能为1~2个字符，会有坑 

### 闭包
```js
function a1(){
    let a = 'a1'
    return (str)=>{
        return str + 'a1'
    }
}

let a = a1();
console.log(a('123')) //123a1
```
```js
function a2(str){
    return (str2)=>{
        return str + str2
    }
}
let c = a2('111')
c('222') // '111222'
let d = a2('222')
d(333) //'222333'
```
```js
  function box(){
    let und = undefined;
    return {
        get(){
            return und;
        },
        set(newVal){
            und = newVal
        },
        type(){
            return typeof und
        }
    }
}

let b = box();
b.type() // undefined
b.get() //undefined
b.set('1231')
b.get() // '1231'
b.type() // 'string'
```

================================
> end 71 page