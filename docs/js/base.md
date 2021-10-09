<!--
 * @Author: your name
 * @Date: 2021-03-15 10:48:31
 * @LastEditTime: 2021-10-09 10:07:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\base.md
-->
## 1.基础类型判断
```html
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const isMap = (val) => toTypeString(val) === '[object Map]';
    const isSet = (val) => toTypeString(val) === '[object Set]';
    const isDate = (val) => val instanceof Date;
    const isFunction = (val) => typeof val === 'function';
    const isString = (val) => typeof val === 'string';
    const isSymbol = (val) => typeof val === 'symbol';
    const isObject = (val) => val !== null && typeof val === 'object';
    const isArray = Array.isArray;
    const isPromise = (val) => {
        return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
```
## 2.isNaN(any)
```html
    isNaN(4.396) // => false
    isNaN('clearlove7') // => true
    isNaN({}) // => true
    isNaN('777') // => false
```

## 3. parseInt(String, radix) & parseFloat(String)
```html
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
    // 经典面试题
    [10, 10, 10, 10, 10].map(parseInt) // => [10, NaN, 2, 3, 4]

    parseFloat(43.96) // => 43.96
    parseFloat('7.77') // => 7.77
    // 若是以数字开头的字符串，截取到非数字前面，或截取到第二个小数点前面
    parseFloat('43.9.6jack') // => 43.9
    parseFloat('love') // => NaN
```

## 4. === 与 Object.is() 区别
正常情况 === 与 Object.is() 一致 
区别:
```html
    ===:
    NaN === NaN; // => false
    -0 === +0; // => true

    Object.is():
    Object.is(NaN, NaN); // => true
    Object.is(-0, +0); // => false
```

## 5.冒泡排序
```js
var arr=[9,1,2,34,21,125,65,34,32];
for(var i = 0 ;i<arr.length-1;i++){
    for(var j=0;j>arr.length-1-i;j++){
        if(arr[j]<arr[j+1]){
            arr[j]^=arr[j+1];
            arr[j+1]^=arr[j];
            arr[j]^=arr[j+1];
        }
    }
}
```