# HTML篇

### 启用标准模式
使用 HTML5 的 doctype 来启用标准模式
```html
  <!DOCTYPE html>
```
### 统一使用 UTF-8 编码

```html
  <meta charset="utf-8" />
```

### 自闭合标签无需闭合
例如： img， input， br， hr 等
```html
  <img src="https://xxx.png" alt="Google" />
  <br />
  <input type="text" name="title" />
```

### 多用使用语义化标签
```html
  <!-- bad -->
  <div>
    <p></p>
  </div>

  <!-- good -->
  <header></header>
  <footer></footer>
```
# JS篇
## 关于命名

### 普通命名采用小驼峰式命名
```html
  let userName = 'jack'
```
###  命名是复数的时候需要加 s，比如说我想声明一个数组，表示很多人的名字
```html
  let names = new Array()
```
### 每个常量都需命名，这样更利于别人读懂含义
```html
  const COL_NUM = 10
  let row = Math.ceil(num / COL_NUM)
```
### 命名需要符合语义化，如果函数命名，可以采用加上动词前缀：
```html
  //是否可阅读
  function canRead(){
    return true;
  }
  //获取姓名
  function getName{
    return this.name
  }
```

### 模板字符串
```html
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?'
}

// good
function sayHi(name) {
  return `How are you, ${name}?`
}

```
### 用扩展运算符做数组浅拷贝
```html
// bad
let arr = [1, 2, 3]
const len = arr.length
const copyArr = []

for (let i = 0; i < len; i += 1) {
  copyArr[i] = arr[i]
}

// good
const copyArr = [...arr]
```

### 用 Array.from 去将一个类数组对象转成一个数组。
```html
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 }

// bad
const arr = Array.prototype.slice.call(arrLike)

// good
const arr = Array.from(arrLike)

```

### ES6 使用属性值缩写
```html
let lukeSkywalker = 'Luke Skywalker'

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
}

// good
const obj = {
  lukeSkywalker,
}

```
### 将属性的缩写放在对象声明的开头
```html
const anakinSkywalker = 'Anakin Skywalker'
const lukeSkywalker = 'Luke Skywalker'

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
}

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
}
```
## 关于函数
### 函数参数使用默认值替代使用条件语句进行赋值。
```html
  // good
  function createMicrobrewery(name = 'Jack') {
    ...
  }

  // bad
  function createMicrobrewery(name) {
    const userNameName = name || 'Jack'
    ...
  }
```
### 把默认参数赋值放在最后
```html
  // bad
  function handleThings(opts = {}, name) {
    // ...
  }

  // good
  function handleThings(name, opts = {}) {
    // ...
  }
```
### 关于模块
```html
  // bad
  const AirbnbStyleGuide = require('./AirbnbStyleGuide')
  module.exports = AirbnbStyleGuide.es6

  // ok
  import AirbnbStyleGuide from './AirbnbStyleGuide'
  export default AirbnbStyleGuide.es6

  // best
  import { es6 } from './AirbnbStyleGuide'
  export default es6

```
### 一个入口只 import 一次
```html
  // bad
  import foo from 'foo'
  // … some other imports … //
  import { named1, named2 } from 'foo'

  // good
  import foo, { named1, named2 } from 'foo'
```

### for 循环
使用 for 循环过程中，数组的长度，使用一个变量来接收，这样有利于代码执行效率得到提高，而不是每走一次循环，都得重新计算数组长度
```html
// bad
for(var i = 0; i < arr.length; i++){

}

// good
for(var i = 0; len = arr.length; i < len; i++){

}
```
## Vue篇
###  Prop 定义尽量详细

prop 的定义应该尽量详细，至少需要指定其类型。
```html
  // bad
props: ['status']

// good
props: {
  status: String
}

// better
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return ['syncing','synced','version-conflict','error'].indexOf(value) !== -1
    }
  }
}

```
###  v-for 遍历必须添加 key
###  v-if 和 v-for 不要用在同一个元素上。
### 指令缩写
```html
<!-- bad -->
<input v-bind:value="newTodoText" :placeholder="newTodoInstructions" v-on:input="onInput" />
<!-- good -->
<input :value="newTodoText" :placeholder="newTodoInstructions" @input="onInput" />
```
### 组件名为多个单词 防止冲突

```html
  // good
Vue.component('todo-item', {
  // ...
})
export default {
  name: 'TodoItem',
  // ...
}

// bad
Vue.component('todo', {
  // ...
})

export default {
  name: 'Todo',
  // ...
}

```
### 多个属性进行分行
```html
  <!-- good -->
  <MyComponent 
      foo="a" 
      bar="b" 
      baz="c" 
  />

  <!-- bad -->
  <MyComponent foo="a" bar="b" baz="c" />
```
### 关于组件内样式 必须要写scoped

### 组件结构放置
  script 部分各方法成员遵循以下顺序放置。

```html
  - name
  - components
  - props
  - data
  - computed
  - watch
  - methods
  - created
  - mounted
  - update
  - destroy
```
### 页面卸载清除监听或者定时器
```html
methods:{
  resizeFun () {
    this.tableHeight = window.innerHeight - document.getElementById('table').offsetTop - 128
  },
  setTimer() {
    this.timer = setInterval(() => { })
  },
  clearTimer() {
		clearInterval(this.timer)
    this.timer = null
	}
},
mounted() {
  this.setTimer()
  window.addEventListener('resize', this.resizeFun)
},
beforeDestroy() {
  window.removeEventListener('resize', this.resizeFun)
  this.clearTimer()
}
```

### 路由懒加载
```html
  {
    path: '/Home',
    component: () => import('@/views/Home.vue')
  }
```
### 第三方 UI 组件按需引入

### 图片使用懒加载方式

### VsCode 插件 prettier
根目录创建.prettierrc.js
```html
  module.exports = {
    "printWidth": 120, // 超过最大值换行
    "semi": false, // 句尾添加分号
    "singleQuote": true // 使用单引号代替双引号
};

# 格式化所有文件（. 表示所有文件）
npx prettier --write .

```

### VsCode 插件 EditorConfig 任何编辑器中都统一格式
主要用于区分编辑器不同导致的问题
根目录创建 .editorconfig
使用方式 shift + alt +f
```html
    [*]
    charset=utf-8
    end_of_line=lf
    insert_final_newline=false
    indent_style=space
    indent_size=2

    [{*.ng,*.sht,*.html,*.shtm,*.shtml,*.htm}]
    indent_style=space
    indent_size=2

    [{*.jhm,*.xslt,*.xul,*.rng,*.xsl,*.xsd,*.ant,*.tld,*.fxml,*.jrxml,*.xml,*.jnlp,*.wsdl}]
    indent_style=space
    indent_size=2

    [{.babelrc,.stylelintrc,jest.config,.eslintrc,.prettierrc,*.json,*.jsb3,*.jsb2,*.bowerrc}]
    indent_style=space
    indent_size=2

    [*.svg]
    indent_style=space
    indent_size=2

    [*.js.map]
    indent_style=space
    indent_size=2

    [*.less]
    indent_style=space
    indent_size=2

    [*.vue]
    indent_style=space
    indent_size=2

    [{.analysis_options,*.yml,*.yaml}]
    indent_style=space
    indent_size=2
```

### 代码 遵守 Airbnb JavaScript Style Guide 风格