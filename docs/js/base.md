<!--
 * @Author: your name
 * @Date: 2021-03-15 10:48:31
 * @LastEditTime: 2021-11-04 15:51:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\base.md
-->

## 1.基础类型判断

```js
const objectToString = Object.prototype.toString
const toTypeString = value => objectToString.call(value)
const isMap = val => toTypeString(val) === '[object Map]'
const isSet = val => toTypeString(val) === '[object Set]'
const isDate = val => val instanceof Date
const isFunction = val => typeof val === 'function'
const isString = val => typeof val === 'string'
const isSymbol = val => typeof val === 'symbol'
const isObject = val => val !== null && typeof val === 'object'
const isArray = Array.isArray
const isPromise = val => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
```

## 2.isNaN(any)

```js
isNaN(4.396) // => false
isNaN('clearlove7') // => true
isNaN({}) // => true
isNaN('777') // => false
```

## 3. parseInt(String, radix) & parseFloat(String)

```js
// parseInt第二个参数 radix 是2-36之间的整数，表示被解析字符串的基数
// parseInt转换为整型（一刀切），parseFloat转换为浮点型，转换失败返回NaN
parseInt(4.396) // => 4
parseInt('7.77') // => 7
// 若是以数字开头的字符串,截取到非数字前面,或截取到第二个小数点前面
parseInt('43.9.6jack') // => 43
parseInt('jack') // => NaN
// 其他进制转换为10进制
parseInt(1100001001, 2) // => 777
// 将'D'按16进制转换
parseInt('D', 16) // => 13
// 因'J'大于16进制位数（F），转换失败
parseInt('J', 16) // => NaN
  [
    // 经典面试题
    (10, 10, 10, 10, 10)
  ].map(parseInt) // => [10, NaN, 2, 3, 4]

parseFloat(43.96) // => 43.96
parseFloat('7.77') // => 7.77
// 若是以数字开头的字符串，截取到非数字前面，或截取到第二个小数点前面
parseFloat('43.9.6jack') // => 43.9
parseFloat('love') // => NaN
```

## 4. === 与 Object.is() 区别

正常情况 === 与 Object.is() 一致
区别:

```js
    ===:
    NaN === NaN; // => false
    -0 === +0; // => true

    Object.is():
    Object.is(NaN, NaN); // => true
    Object.is(-0, +0); // => false
```

## 5.冒泡排序

```js
var arr = [9, 1, 2, 34, 21, 125, 65, 34, 32]
for (var i = 0; i < arr.length - 1; i++) {
  for (var j = 0; j > arr.length - 1 - i; j++) {
    if (arr[j] < arr[j + 1]) {
      arr[j] ^= arr[j + 1]
      arr[j + 1] ^= arr[j]
      arr[j] ^= arr[j + 1]
    }
  }
}
```

## 6.位运算

| 运算符 | 描述         | 例子    | 等同于       | 结果 | 十进制 |
| ------ | ------------ | ------- | ------------ | ---- | ------ |
| &      | 与           | 5 & 1   | 0101 & 0001  | 0001 | 1      |
| 杠     | 或           | 5 杠 1  | 0101 杠 0001 | 0101 | 5      |
| ~      | 非           | ~ 5     | ~0101        | 1010 | 10     |
| ^      | 异或         | 5 ^ 1   | 0101 ^ 0001  | 0100 | 4      |
| <<     | 零填充左位移 | 5 << 1  | 0101 << 1    | 1010 | 10     |
| > >    | 有符号右位移 | 5 >> 1  | 0101 >> 1    | 0010 | 2      |
| > > >  | 零填充右位移 | 5 >>> 1 | 0101 >>> 1   | 0010 | 2      |

## ES7 幂运算优化

```js
Math.path(10, 2) === 10 ** 2
```

## Object.defineProperty()

它允许您定义对象属性和/或更改属性的值和/或元数据

```js
let person = {
  firstName: 'lcz',
  lastName: 'sss',
  language: 'ZH',
}
Object.defineProperty(person, 'lastName', {
  value: 'ccc',
  writable: true,
  enumerable: true, //枚举中的属性是否展示
  configurable: true,
})
// Object.defineProperty(person,'lastName',{
//     get : function() { return lastName },
//     set : function(value) { lastName = value.toUpperCase()} //确保每次修改的时候大写
// })
person.lastName = 'cczzzz'
```

## es9 for await of

解析使用方法: 循环请求 then 中返回的数据方法编写要一致

```js
function Gen(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}
async function test() {
  let arr = [Gen(1000), Gen(2000), Gen(5000)]
  for (let item of arr) {
    console.log('同时开始x3')
    item.then(res => {
      console.log(new Date(), res)
    })
  }
}
```

## new Map()

解析：使用方式把对象或者 dom 当 key

```js
let obj = {
  name: 'lcz',
  el: document.getElementById('header'),
}
let createMap = new Map()
createMap.set(obj, 111)
createMap.get(obj) //111
```

| 方法      | 描述                      |
| --------- | ------------------------- |
| clear()   | 删除 Map 中的所有元素。   |
| delete()  | 删除由键指定的元素。      |
| has()     | 如果键存在，则返回 true。 |
| forEach() | 为每个键/值对调用回调。   |

## call()

```js
var person = {
  fullName: function (city, country) {
    return this.firstName + ' ' + this.lastName + ',' + city + ',' + country
  },
}
var person1 = {
  firstName: 'Bill',
  lastName: 'Gates',
}
person.fullName.call(person1, 'Seattle', 'USA')
```

## apply()
```js
var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"John",
  lastName: "Doe"
}
person.fullName.apply(person1, ["Oslo", "Norway"]);
```

