<!--
 * @Author: lcz
 * @Date: 2022-03-02 11:07:01
 * @LastEditTime: 2022-03-02 12:22:23
 * @LastEditors: Please set LastEditors
 * @Description: 若川源码读写学习
 * @FilePath: /lcz_document/docs/readingBooks/ruochuan.md
-->
##  Object.create 创建不在原型链上的对象
```js
// 这个就是创建一个纯净的对象，在对象上不具有原型，在使用循环的时候性能更好，如果只是存值这个方式更好
 let c = Object.create(null)
 Object.create(null).__proto__ // undefined
 c instanceof Object // false

 //测试验证
 null.__proto__ //报错
 let a = {}
 a.__proto__ //{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
 a instanceof Object // true
```

## Object.prototype.hasOwnProperty.call(obj,key)   与obj.hasOwnProperty(key)  的区别
* 看了缓存字符串函数的启发,为什么源码喜欢用Object.prototype.hasOwnProperty.call(obj,key)
```js
//以下操作正确的
let a = {
    'b':1
}
Object.prototype.hasOwnProperty.call // true

let c = Object.create(null)
c.d = 1
c.hasOwnProperty('d') //c.hasOwnProperty is not a function 因为创建Object.create(null)不在原型链上的对象

Object.prototype.hasOwnProperty.call(c,'d') // true
Object.prototype.hasOwnProperty.call(a,'b') // true
//说明了Object.prototype.hasOwnProperty 用了call方法代理到Object链上
```

## cacheStringFunction 缓存函数
* 原理是闭包
* 避免缓存对象过于庞大，可以加入限制策略，防止缓存对象无限增长 
* 该函数会一直在内存中
```js
const LimitableMap = function(limit){
    this.limit = limit || 10
    this.map = {}
    this.keys = []
}
const hasOwnProperty = Object.prototype.hasOwnProperty
LimitableMap.prototype.set = function(key, value){
    const map = this.map, keys = this.keys
    if(!hasOwnProperty.call(map, key)) {
        if(keys.length === this.limit) {
            delete map[keys.shift()]
        }
        keys.push(key)
    }
    map[key] = value;
}
LimitableMap.prototype.get= function(key){
    return this.map[key]
} 

const myMap = new LimitableMap();

myMap.set("key1", "val1");
myMap.get("key1");
```