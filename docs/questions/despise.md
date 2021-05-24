<!--
 * @Author: your name
 * @Date: 2021-03-16 15:57:51
 * @LastEditTime: 2021-04-22 12:13:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\despise.md
-->
## 1.大型整数相加
JS 中整数的最大安全范围可以查到是：9007199254740991
```html
  let a = "9007199254740991";
  let b = "1234567899999999999"
  function add(a,b){
    //获取ab 最大长度
    let maxLength = Math.max(a.length,b.length);
    //用0去补齐长度
    a = a.padStart(maxLength , 0);//"0009007199254740991"
    b = b.padStart(maxLength , 0);//"1234567899999999999"
    let t = 0;
    let f = 0; //余量
    let num = '';
    for(var i = maxLength-1;i>=0;i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      num= t%10 + num
    }
    if(f == 1){
      mun = '1' + mum
    }
    return num
  }
  add(a,b)
```

## 2.手写promise
```html
  // MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () =>  {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        })  
      }

      const rejectedMicrotask = () => { 
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      }
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask() 
      } else if (this.status === REJECTED) { 
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    }) 
    
    return promise2;
  }

  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}
```
总结.
创建类以及构造函数,构造函数调用直接执行方法
创建 2个数组缓存promise  3个promise状态常量 1个当前状态 1个成功的变量 1个失败信息的变量  
创建 3个函数 resolve reject then 
resolve 主要用于改状态 改成功值 循环走成功数组缓存
reject  主要用于改状态 改成错误 循环走错误数组缓存
then 创建当前类 丢出去 ， ing状态的时候推数组进去 推的是微任务queueMicrotask
success状态 判断是不是 MyPromise 实例对象 是的话x.then(resolve, reject) 抛出，不是的话 resolve(x)
error状态同上

2个重写的静态方法resolve reject 以便于直接的链式操作 

## 3.手写兼容 类型判断
```html
  function typeOf(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
  }

  console.log(typeOf([])) // array
  console.log(typeOf({})) // Object
  console.log(typeOf(new Date())) // date

```

## 4.数组去重
```html
  es6 
  [...new Set(arr)]
```

## 5. 事件订阅
思路
/**
 * @description:  1.发布 $on 
 * @param {*} name fn
 * @return {*}
 */

判断构造函数中的缓存是否有发布名字， 有则追加发布函数，没有则创建此发布

/**
 * @description:  2.订阅 $emit 判断订阅名是否存在与缓存中，存在就执行
 * @param {*} name once = false ...args
 * @return {*}  发布函数栈中执行
 */

拿出该发布的函数栈
循环发布函数栈中的函数
可以操作是否订阅一次就摧毁发布栈(只执行一次)

/**
 * @description:  3.取消订阅
 * @param {*} name fn
 * @return {*} 
 */
 
拿出发布的函数栈，
寻找发布栈内的函数 与 传入函数的下标
通过数组裁剪对发布栈进行操作 splice(index,1)

```html
  class EventEmitter{
    constructor(){
      this.cache = {}
    }

    $on(name,fn){
      if(this.cache[name]){
        this.cache[name].push(fn)
      }else{
        this.cache[name] = [fn]
      }
    }

    $off(name,fn){
      let tasks = this.cache[name];
      if(tasks){
        const index = tasks.findIndex(f => f === fn || f.callback === fn)
        if(index>=0){
          tasks.splice(index,1)
        }
      }
    }

    $emit(name,once = false,...args){
      if(this.cache[name]){
        let tasks = this.cache[name].slice();

        for(let fn of tasks){
          fn(...args)
        }

        if(once){
          delete this.cache[name]
        }
      }
    }

}
```