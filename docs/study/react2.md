<!--
 * @Author: lcz
 * @Date: 2022-03-16 23:26:17
 * @LastEditTime: 2022-03-17 23:53:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lcz_document/docs/study/react2.md
-->

## react mixin 发展历史

- 目的是为了优化重复渲染问题
- 最早使用三方的 react-addons-pure-render-mixin

```jsx
const PureRenderMixin = require('react-addons-pure-render-mixin')
const component = React.createClass({
  mixins: [PureRenderMixin],
})
```

- 后来使用 shallowCompare 代替 PureRenderMixin

```jsx
const shallowCompare = require('react-addons-shallow-compare')
const component = React.createClass({
  shouldComponentUpdate: (nextProps, nextState) => {
    return shallowCompare(nextProps, nextState)
  },
})
```

- 由于要重复写,后来被 React.PureComponent 代替

## Hoc 写法

- 组件当参数传入另外个组件

```jsx
// hoc.js
export default const HOC = (WrappedComponent) => {
    return Class newComponent extends WrappedComponent {
        state = {
          text: 'hello'
        }
        componentDidMount() {
            super.componentDidMount()
            // do something ...
            console.log('this.state.text')
        }
        render() {
            // init render
            return super.render()
        }
    }
}
```
```jsx
import HOC from './hoc.js'
class user extends React.Component {
    // do something ...
}
export defalut HOC(user)
```
* 装饰器替代
```jsx
import HOC from './hoc.js'
@HOC
class user extends React.Component {
    // do something ...
}
export defalut user
```

### 什么是hooks,为什么要用hooks
* hooks 就是以use开头的方法
* 以前用mixin,mixin弊端就是this执向的变量可能重复,是个黑盒子
```jsx
a.js mixins: [b.js]

b.js mixins: [c.js]

c.js mixins: [d.js]
```
### hooks 的优点
* 会有重名、覆盖问题吗？完全没有！内部的变量在闭包内，返回的变量支持定义别名。
* 可以多次使用

## vue 与 react hooks 的区别
* vue 只能在setUp中使用hooks
* react 只能在函数组件中使用

## 什么是fiber
* hooks 挂载数据的数据结构

## react 执行顺序
* react 是通过jsx编译成render函数,然后执行render函数产生vdom,
* reactV16版本之前跟vue2一样是全量对比,直接递归遍历 vdom,而且递归又不能打断，所以有性能问题。 -》后来引入fiber

## fiber
* 优点: (可以打断) 
* vdom: 递归不能打断
* 先把vdom 树转成 fiber 链表,然后再渲染 fiber
* 看vdom 是树结构,fiber 有sibling(兄)结构
* vdom 转 fiber 的过程叫做 reconcile,是可打断的,

## fiber 优点
* vdom 转 fiber 的过程叫做 reconcile，是可打断的，React 加入了 schedule 的机制在空闲时调度 reconcile，reconcile 的过程中会做 diff，打上增删改的标记（effectTag），并把对应的 dom 创建好。然后就可以一次性把 fiber 渲染到 dom，也就是 commit。

* 这个 schdule、reconcile、commit 的流程就是 fiber 架构
* commit作用:一起把fiber 转化为dom
* reconcile作用:vdom 转fiber,diff,打增删改标记
* schdule作用:空闲的时候调用reconcile

* hooks 就是通过把数据挂载到组件对应的 fiber 节点上来实现的。(目前还没理解)

## useCallBack useMemo  闭包
```jsx
import {useState,useCallback} from 'react'
const [age,setAge] = useState(26)
const set = useCallback(()=>{
  //但是每次是会执行的,有引用到的值就是闭包,因为第二个数组是空数组
  setAge(age + 1)
  //只会渲染一次 age一直都是27 闭包
},[])
//age 传入就不会闭包
```