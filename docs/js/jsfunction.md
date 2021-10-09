<!--
 * @Author: your name
 * @Date: 2021-09-02 16:29:02
 * @LastEditTime: 2021-10-09 09:39:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\jsfunction.md
-->
## 1. call(this, arg1, arg2) & apply(this, args) & bind(this, args)
```html
  // call、bind、apply 第一个参数都是 this 的指向对象
// call、bind的参数传递通过逗号分割，apply的参数通过数组传递
// bind不会直接执行，会返回一个函数，参数可分别传递；bind是柯里化函数
const foo = {
  name: '徐扶墙',
  say(arg1, arg2) {
    console.log(`${this.name}调用`)
    console.log(`打印参数: arg1->${arg1}, arg2->${arg2}`)
  },
}

const js = {
  name: '姜姒',
}

foo.say.call(js, '天下', '第二')
foo.say.apply(js, ['天下', '第二'])
foo.say.bind(js, '天下')('第二')

// 若this为number、string、boolean则会隐式使用构造函数包裹后返回，俗称装箱
function bar() {
  console.log(this.team)
}
Number.prototype.team = 'EDG'
bar.call(777)
```

## 2. Generator函数

```js
function* gen(){
  yield "hello";
  yield "world";
  return "ends"
}

let g1=gen()
console.log(g1.next()); // {value:'hello',done:false}
console.log(g1.next()) // {value:"world",done:false}
console.log(g1.next()) // {value:"ends",done:true}

```
yield =>表达式
不同的是，调用Generator函数后，函数并不执行，返回的也不是函数运行结果，而是指向内部应用状态的指针对象，就是遍历器对象。

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或者上次停下的地方开始执行，直到遇到下一个yield表达式（或return语句为止）。

Generator函数是分段执行的。yield表达式只是暂停的标志，而next方法可以恢复执行。
console.log(g1.next()); // {value:'hello',done:false}
console.log(g1.next()) // {value:"world",done:false}
console.log(g1.next()) // {value:"ends",done:true}

总结一下，调用Generator函数，返回的都是一个遍历器对象，代表Generator函数内部指针。 以后每次调用Generator函数的next方法，就会返回一个有着value和done两个属性的对象。 value属性表示当前内部状态的值，是yield表达式后面那个表达式的值；done属性值是一个布尔值，表示当前遍历是否结束。

next方法的参数

yield表达式本身没有返回值，或者说总是返回undefined。 next方法可以带一个参数，该参数就会被当做上一个yield表达式的返回值。