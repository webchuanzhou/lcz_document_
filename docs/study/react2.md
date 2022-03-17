<!--
 * @Author: lcz
 * @Date: 2022-03-16 23:26:17
 * @LastEditTime: 2022-03-16 23:53:33
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