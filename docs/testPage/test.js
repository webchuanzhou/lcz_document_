/*
 * @Author: lcz
 * @Date: 2021-06-15 10:18:23
 * @LastEditTime: 2021-06-15 11:35:01
 * @LastEditors: Please set LastEditors
 * @Description: ts test
 * @FilePath: \lcz_document\docs\testPage\test.ts
 */
var anyNumber = 1;
var anyBoolean = true;
var antString = 'string1';
var number = 6;
var string = 'hello world';
var flag = true;
var arr = [1, 2];
//方法中不返回值用 void;
function hello() {
    console.log(111);
}
var nullVar = null;
var undeVar = undefined;
function funcString() {
    return 'str';
}
// console.log(funcString())
function add(x, y) {
    return x + y;
}
// console.log(add(1,2))
function srtfun(x, y) {
    if (y) {
        return x + y;
    }
    else {
        return x;
    }
}
console.log(srtfun('hello', 'ererer'));
console.log(srtfun('hello'));
// console.log(srtfun('hello','ererer','231'));
var val;
val = 'hello';
// console.log(val)
val = 12;
var user = {
    age: 15,
    name: 'lcz'
};
var users = {
    name: 'lcz',
    age: 25,
    lick: '打游戏'
};
console.log(users);
