<!--
 * @Author: lcz 
 * @Date: 2022-03-01 16:09:07
 * @LastEditTime: 2022-03-02 10:08:38
 * @LastEditors: Please set LastEditors
 * @Description: prmiseMini
 * @FilePath: /lcz_document/docs/readingBooks/promiseMin.md
-->
* 提示即使一个对象具有 .then 方法，也不一定就能作为ES6 Promises对象使用。 比如thenable*
[参考文档](http://liubin.org/promises-book/#ch2-promise-race)
## 原生xml promise 封装
```js
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
// 运行示例
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.error(error);
});
```

## new Promise的快捷方式
```js 
Promise.resolve(42);
// == 
new Promise(function(resolve){
    resolve(42);
});
// 
Promise.resolve(42).then(res=>{console.log(res)}) // 42
//
new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});
// ==
Promise.reject(new Error("BOOM!")).catch(function(error){
    console.error(error);
});
``` 

## 将thenable对象转换promise对象
* thenable 类似于伪数组与数组的关系.length 与 .then的关系
* 将thenable 转换为promise
```js
var promise = Promise.resolve($.ajax('/json/comment.json'));// => promise对象
promise.then(function(value){
   console.log(value);
});
```

## promise lian
```js
function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中出现异常的时候会被调用
        console.error(error);
    });
```

## promise.all
所有成功才会then 不然catch
```js
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var request = {
        comment: function getComment() {
            return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
        },
        people: function getPeople() {
            return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
        }
    };
function main() {
    return Promise.all([request.comment(), request.people()]);
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.log(error);
});
```

## promise.race
promise数组中有一个成功就会走then方法
```js
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(value);    // => 1
});
```

## 为啥抛出错误要用reject 而不是throw
```js
var promise = new Promise(function(resolve, reject){
    throw new Error("message");
});
promise.catch(function(error){
    console.error(error);// => "message"
});
var promise = new Promise(function(resolve, reject){
    reject(new Error("message"));
});
promise.catch(function(error){
    console.error(error);// => "message"
})
```
* reject有什么优点？
* 首先是因为我们很难区分 throw 是我们主动抛出来的，还是因为真正的其它 异常 导致的。
* Promise中的 throw 语句被break了，这也严重的影响了浏览器提供的此功能的正常使用

## Promise.race 超时运用
* 原理  Promise.race接收一个promise数组,一个是正在操作的promise,一个是根据一定时间主动抛出错误的promise

simple-timeout-promise.js
```js
function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function () {
            throw new Error('Operation timed out after ' + ms + ' ms');
        });
    return Promise.race([promise, timeout]);
}
```