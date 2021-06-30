<!--
 * @Author: lcz
 * @Date: 2021-03-16 09:50:05
 * @LastEditTime: 2021-06-30 15:42:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\intermediate.md
-->

## 在 JavaScript 中创建对象的可行方法有哪些？
基础知道的方式
```html
    //1.对象字面量语法
    let object = {};
    //2.对象的创建方法
    let obj = Object.create(null);
    //3.对象构造函数
    let obj = new Object();
```
```html
    //4.构造函数创建对象
    function person(name){
        let obj = {};
        obj.name = name
        return obj
    }
    var object = new person("Sudheer");
    //5.原型链创建对象
    function Obj(){};
    obj.prototype.name = 'lcz';
    let obj = new Obj();
    // 6.类语法
    class person{
        constructor(name){
            this.name = name
        }
    }
    let obj = person('lcz');
    //7. 单列模式
    var obj = new function(){
        this.name = 'lcz'
    }
    
```

## 2.什么是原型链 （个人答案）
每个对象都有__proto__属性，指向的是父级的原型对象 fun.prototype,一直往上指找到[object object]为止，形成的链就是原型链

## 3.call、apply、bind有什么区别？
call、apply是立即执行
bind  创建一个新函数，该函数将this设置为传递给 bind() 的第一个参数
call与apply 传入的参数不同，一个是数组形式，一个是多参数形式
call:
```html
    var employee1 = {firstName: 'Haiyong', lastName: 'Rodson'};
    var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};

    function invite(greeting1, greeting2) {
        console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
    }

    invite.call(employee1, 'Hello', 'How are you?'); // Hello Haiyong Rodson, How are you?
    invite.call(employee2, 'Hello', 'How are you?'); // Hello Jimmy Baily, How are you?
```
apply:
```html
    var employee1 = {firstName: 'Haiyong', lastName: 'Rodson'};
    var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};

    function invite(greeting1, greeting2) {
        console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
    }

    invite.apply(employee1, ['Hello', 'How are you?']); // Hello Haiyong Rodson, How are you?
    invite.apply(employee2, ['Hello', 'How are you?']); // Hello Jimmy Baily, How are you?
```
bind:
```html
    var employee1 = {firstName: 'Haiyong', lastName: 'Rodson'};
    var employee2 = {firstName: 'Jimmy', lastName: 'Baily'};

    function invite(greeting1, greeting2) {
        console.log(greeting1 + ' ' + this.firstName + ' ' + this.lastName+ ', '+ greeting2);
    }
    let fun1 = invite.bind(employee1)
    let fun2 = invite.bind(employee2)
    fun1('Hello', 'How are you?')
    fun2('Hello', 'How are you?')
```

## 4. 什么是 JSON 及其常见操作？
JSON数据
JSON.parse();
JSON.styingify();

## 5. 数组slice()方法的目的是什么？
返回新数组 不改变原数组
裁剪
```html
    let arrayIntegers = [1, 2, 3, 4, 5];
    let arrayIntegers1 = arrayIntegers.slice(0,2); // returns [1,2]
    let arrayIntegers2 = arrayIntegers.slice(2,3); // returns [3]
    let arrayIntegers3 = arrayIntegers.slice(4); //returns [5]

```

## 6.数组splice()方法的目的是什么？
修改原来的数组 ，并返回删除的数据
裁剪

```html
    let arrayIntegers = [1, 2, 3, 4, 5];
    let arrayIntegers2 = arrayIntegers.splice(0,2) // returns arrayIntegers = [3,4,5] arrayIntegers2 = [1,2];
    let arrayIntegers3 = arrayIntegers.splice(0,2,'a','b','c') // returns arrayIntegers = ['a','b','c',3,4,5] arrayIntegers2 = [1,2];
```

## 7.slice()和splice()有什么区别？
slice 
返回新数组不改变原数组 ，
用于从数组中选取元素 
splice 
在原数组上裁剪，返回裁剪出来的数组，
改变原数组 ，
用于在数组中插入或删除元素

## 8.你如何比较 Object 和 Map
(个人理解)
相同点都是键与值的存储
不同点是
map的key可以存储object，也可以存储dom元素
(官方答案)
Object 的键是字符串和符号，而它们可以是 Map 的任何值，包括functions、Object 和任何primitive。
Map 中的键是有序的，而添加到 Object 的键不是。因此，当迭代它时，一个 Map 对象按插入的顺序返回键。
您可以使用 size 属性轻松获取 Map 的大小，而 Object 中的属性数量必须手动确定。
Map 是可迭代的，因此可以直接迭代，而迭代 Object 需要以某种方式获取其键并对其进行迭代。
一个对象有一个原型，所以如果你不小心，地图中有一些默认的键可能会与你的键发生冲突。从 ES5 开始，这可以通过使用 map =Object.create(null) 绕过，但很少这样做。
Map在涉及频繁添加和删除密钥对的场景中可能表现得更好。

## 9.== 和 === 运算符有什么区别？

== 会隐士转换
=== 会验证数据类型

## 10.如何检查一个对象中是否包含某个key
```html
    //1.使用in运算符
    "key" in obj
    !("key" in obj) //如果key不存在
    //2.hasOwnProperty('key')
    obj.hasOwnProperty('key')
    //3.直接获取这个键判断是否为undefined
    user.name !== undefined
```

## 11.WeakSet和set有什么区别 WeakMap 和 Map有什么区别与下面答案差不多
set是强引用，WeakSet()是弱引用，不使用的时候会被垃圾回收
WeakSet存储的是对象
WeakMap存储的是键与值
