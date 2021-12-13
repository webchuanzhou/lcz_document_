<!--
 * @Author: lcz
 * @Date: 2021-10-09 10:38:02
 * @LastEditTime: 2021-12-13 12:15:01
 * @LastEditors: Please set LastEditors
 * @Description: 代码优化小妙招
 * @FilePath: \lcz_document\docs\optimization\littleTrick.md
-->

## 获取对象属性值

```js
const name = obj && obj.name;
======
const name = obj?.name;
```

## 结构报错

但是要注意解构的对象不能为 undefined、null。否则会报错，故要给被解构的对象一个默认值。

```js
const { a, b, c, d, e } = obj || {}
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
const cacheFun = fn => {
  let cache = {}
  return (...args) => {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}

const add = function (a, b) {
  console.log('开始缓存')
  return a + b
}

const adder = memorize(add)
console.log(adder(2, 6)) // 输出结果: 开始缓存 8
console.log(adder(2, 6)) // 输出结果: 8
```

## [] or {} => null (永远不要相信后端返回的数据)

```js
const { data } = await getApiData()

// 如果data类型是一个数组
console.log(data[0]) // 如果data返回了个null，会报错

// 如果data类型是一个对象
console.log(data.a) // 如果data返回了个null，会报错

// 可以写成下面这样
console.log((data || [])[0])
console.log((data || {}).a)
// 此时就算data返回了null，也只会提示undefined，并不会报错阻塞代码

```

## 取整
```js
const num = 123.456
console.log(num | 0) // 123
```