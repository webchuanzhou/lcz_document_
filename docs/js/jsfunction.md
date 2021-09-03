<!--
 * @Author: your name
 * @Date: 2021-09-02 16:29:02
 * @LastEditTime: 2021-09-02 16:29:03
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