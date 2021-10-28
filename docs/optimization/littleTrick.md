<!--
 * @Author: lcz
 * @Date: 2021-10-09 10:38:02
 * @LastEditTime: 2021-10-18 15:21:59
 * @LastEditors: Please set LastEditors
 * @Description: 代码优化小妙招
 * @FilePath: \lcz_document\docs\optimization\littleTrick.md
-->

## 获取对象属性值
```
const name = obj && obj.name;
======
const name = obj?.name;
```

## 结构报错
但是要注意解构的对象不能为undefined、null。否则会报错，故要给被解构的对象一个默认值。
```js
const {a,b,c,d,e} = obj || {};
```

## 关于输入框非空的判断
```js
if(value !== null && value !== undefined && value !== ''){
    //...
}
===========
if(value??'' !== ''){
  //...
}
```

## 函数缓存
```js
  const cacheFun = (fn)=>{
    let cache = {}
    return (...args)=>{
      const _args = JSON.stringify(args)
      return cache[_args]  || (cache[_args] = fn.apply(fn,args))
    }
  }

  const add = function(a, b) {
    console.log('开始缓存')
    return a + b
  }
 
  const adder = memorize(add)
  console.log(adder(2, 6)) // 输出结果: 开始缓存 8
  console.log(adder(2, 6)) // 输出结果: 8 
```