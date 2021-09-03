<!--
 * @Author: your name
 * @Date: 2021-09-02 16:22:30
 * @LastEditTime: 2021-09-02 16:28:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\jsObject.md
-->
## 1.Object.create(Object)
```html
  // 创建一个空对象，并继承原型（__proto__ 指向 { name: 'jack' }）
Object.create({ name: 'jack' }) // => {}
// 创建完全为空的对象，无原型链
Object.create(null) // => {}

function Foo() {}
function Bar() {}
// 创建一个空对象，并将Fn1.prototype.__proto__ = Fn2.prototype（继承）
Foo.prototype = Object.create(Bar.prototype)
const fn = new Foo()
```

## 2.hasOwnProperty(prop)
```html
  function Skt() {}
  Skt.prototype.faker = 3
  const edg = new Skt()
  edg.clearlove = 0

  // 判断自身是否拥有该属性
  edg.hasOwnProperty('faker') // => false
  edg.hasOwnProperty('clearlove') // => true
```

## 3. isPrototypeOf(Object)
```html
  function Foo() {}
const bar = new Foo()

// 判断bar原型链上是否有Foo
Foo.prototype.isPrototypeOf(bar) // => true
// 判断bar原型链上是否有Object
Object.prototype.isPrototypeOf(bar) // => true
// 判断bar原型链上是否有Function
Function.prototype.isPrototypeOf(bar) // => false
```

## 4. Object.assign(Object, Object)
```html
  const foo = {
  name: '111',
  age: 17,
}
const bar = {
  name: '222',
}

// 合并对象，将后项合并至目标对象（第一项），属性名相同时会覆盖
Object.assign(foo, bar) // => {name: "222", age: 17}

// 传入可迭代对象
Object.assign({}, [1, 2, 3]) // => {0: 1, 1: 2, 2: 3}
Object.assign({}, 'jack') // => => {0: "j", 1: "a", 2: "c", 3: "k"}
```

## 5. Object.setPrototypeOf(Object, Object)
```html
  function foo() {}
function bar() {}
bar.age = 17

// 设置对象的原型（foo.__proto__ = bar）
Object.setPrototypeOf(foo, bar)
```

## 6. Object.getPrototypeOf(Object)
```html
  function Foo() {}
const bar = new Foo()

// 获取对象的原型（Foo.prototype）
Object.getPrototypeOf(bar) // => { constructor: ƒ }
```

## 7. Object.defineProperty(Object, prop, options) & Object.defineProperties(Object, props)
```html
  const foo = {
  name: '徐扶墙',
  age: 17,
}

// Vue2数据响应式原理
Object.defineProperty(foo, 'name', {
  // 属性的值，默认undefined
  value: '姜姒',
  // 是否可写，默认false
  writable: true,
  // 是否可枚举，默认false
  enumerable: true,
  // 是否可配置，默认false
  configurable: true,
  // 当配置了 get() 或 set() 方法，value 和 writable 会失效
  // 获取属性值时执行的方法
  get() {
    return '获取age值'
  }
  // 设置属性值时执行的方法
  set(newValue) {
    return '设置age值'
  }
})

const bar = {}

// 与Object.defineProperty用法类似，可以一次定义多个属性
Object.defineProperties(bar, {
  name: {
    value: '姜姒',
    enumerable: true
  },
  age: {
    get() {
      return '获取age值'
    },
    set(newValue) {
      return '设置age值'
    }
  }
})

```

## 9. Object.is(item, item)
```html
// 比较两值是否相等，最准确的比较方式；效率不高，主要用来解决下面两种情况
Object.is(+0, -0) // => false
Object.is(NaN, NaN) // => true

+0 === -0 // => true
NaN === NaN // => false
```