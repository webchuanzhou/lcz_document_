<!--
 * @Author: your name
 * @Date: 2021-05-16 20:20:26
 * @LastEditTime: 2022-01-07 11:39:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lcz_document/docs/study/react.md
-->

## 1.打包后本地开启虚拟服务

```js
  //全局安装服务
  npm i serve -g
  //运行
  serve xxx
```

## 2.取消点击 3 秒延迟

目录 public index.html

```js
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
      if(!window.Promise) {
        document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
      }
  </script>
```

## 3.配置全局 scss 公共变量

config-overrides.js

```js
const { override, adjustStyleLoaders } = require('customize-cra')
module.exports = override(
  // 配置全局scss引入
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: ['./src/styles/variable.scss', './src/styles/common.scss'],
        },
      })
    }
  })
)
```

## 4.antd-mobile 配置按需引入以及定制主题

```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const theme = require('./antd-theme')
module.exports = override(
  //配置antd-mobile按需引入样式
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
    // style: true //如果需要启动定制主题
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  })
)
```

主题文档变量参考地址：https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less  
主题文件：antd-theme.json

```js
{
    "@color-text-base": "red",
    "@fill-base": "red",
    "@switch-fill": "yellow",
    "@switch-fill-android": "gary"
}
```

## 5.配置代理

src 目录下配置 setupProxy.js

```js
// http-proxy-middleware 脚手架中已自带 如果没有需要自行安装
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api1', {
      target: 'http://api.chuangyeyun.weixue.ltd',
      changeOrigin: true, //控制请求头中host字段的值
      pathRewrite: { '^/api1': '' }, //重新api路径 （必须）重写为空是服务器的的api路径的重写
    }),
    proxy('/api2', {
      target: 'http://api.chuangyeyun.weixue.ltd',
      changeOrigin: true,
      pathRewrite: { '^/api2': '' },
    })
  )
}
```

## 6.全局 index.jsx 代码配置

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css' //重置样式
import App from './App'
// import reportWebVitals from "./reportWebVitals";
// React.StrictMode 检查App以及app子组件是否合理
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
```

## 7.路由懒加载以及懒加载中页面显示的组件 以及 Switch 匹配到即不往下执行

```js
  import React, { Component ,lazy ,Suspense} from 'react'
  import { Route, Switch , Redirect} from 'react-router-dom'
  <!-- 加载组件 -->
  import ZLoading from './components/common/ZLoading/ZLoading'
  const Home = lazy(()=>import('./pages/home'))
  const About = lazy(()=>import('./pages/about'))
  export default class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* 提高匹配速度，先匹配到后不执行 */}
        {/* replace堆替换 Link */}
        <Suspense fallback={<ZLoading/>}>
          <Switch>
            {/* 路由注册 exact 严格匹配 , */}
            <Route path='/home' component={Home}></Route>
            <Route path='/about' component={About}></Route>
            {/* 路由无匹配到重定向 */}
            <Redirect to="/home"></Redirect>
          </Switch>
        </Suspense>
      </div>
    )
  }
}
```

## 8.redux redux-devtools-extension redux-thunk 的使用

redux 状态管理工具  
redux-devtools-extension 开发环境测试查看 redux 状态工具  
// 中间键 支持异步 action 函数都是异步的，对象都是同步的  
文件目录结构  
![Image text](../assets/app/redux.png)
store.js

```js
// 中间键 支持异步action 函数都是异步的，对象都是同步的
import thunk from 'redux-thunk'
// 开发环境测试查看redux状态
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
//所有注册的 reducers
import allReducers from './reducers'
const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
export default store
```

constant.js  
常量文件统一后期方便管理同一个字符串

```js
export const ADD = 'add'
export const REDUCE = 'reduce'
```

actions 中的文件

```js
import { ADD, REDUCE } from '../constant'
//同步action
export const createAddAction = data => ({ type: ADD, data })
export const createReduceAction = data => ({ type: REDUCE, data })

//异步action  异步action一般都会调用同步action
export const createAsyncAddAction = (data, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(createAddAction(data))
    }, time)
  }
}
```

reducers
index.js 用于导入全部的 reduce 进行注册

```js
import { combineReducers } from 'redux'

import count from './count.js'

// combineReducers 合并reducer
export default combineReducers({
  count,
})
```

recudes 状态管理组件

```js
import { ADD, REDUCE } from '../constant'
const number = 0
export default function countReducer(preState = number, action) {
  const { type, data } = action
  switch (type) {
    case ADD:
      return preState + data
    case REDUCE:
      return preState - data
    default:
      return preState
  }
}
```

页面中使用

```js
import { connect } from 'react-redux'
import { createAddAction, createReduceAction, createAsyncAddAction } from '../../redux/actions/count'
class Home extends PureComponent {
  add = () => {
    this.props.add(1)
  }
  reduce = () => {
    this.props.reduce(1)
  }
  asyncAdd = () => {
    this.props.addAsync(1, 1000)
  }

  render() {
    return (
      <Fragment>
        <div>number:{this.props.count}</div>
        <Button className='fs' onClick={this.add}>
          add
        </Button>
        <Button className='fs' onClick={this.reduce}>
          reduce
        </Button>
        <Button className='fs' onClick={this.asyncAdd}>
          异步加
        </Button>
      </Fragment>
    )
  }
}
<!-- 柯里化调用  前面为reduce 后面为UI组件 -->
export default connect(state => ({
  count: state.count,
}), {
  add: createAddAction,
  reduce: createReduceAction,
  addAsync: createAsyncAddAction,
})(Home)

```

拆分 connent 中的 reduce

```js
const mapStateToProps = state => ({
  count: state.count,
})
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    add: (...args) => dispatch(createAddAction(...args)),
    reduce: (...args) => dispatch(createReduceAction(...args)),
    addAsync: (...args) => dispatch(createReduceAction(...args)),
  }
}
```

## 9.hooks 的使用

hooks 的使用是为了让函数式组件能像类组件一样 有生命周期 state 变量 等  
基础用法

```js
import React from 'react'
export default function HooksTets() {
  const [count, setCount] = React.useState(0)
  const inputRef = React.useRef()
  const addCount = () => {
    setCount(count => count + 1)
  }
  const tips = () => {
    alert(inputRef.current.value)
  }
  /**
   * @description: 生命周期 hooks
   * @param {*}  function  [] 挂载 [count]挂载监听
   * @return {*} 卸载组件需要return 操作清楚定时器等
   */
  React.useEffect(() => {
    // return ()=>{
    // }
  }, [count])
  return (
    <div>
      <input type='text' ref={inputRef} />
      <div onClick={tips}>点我</div>
      <div>number:{count}</div>
      <div onClick={addCount}>hooksClick</div>
    </div>
  )
}
```

## 10.一般组件中使用路由 withRouter

```html
import { withRouter } from 'react-router-dom' class ZHeader extends Component { back = ()=>{ this.props.history.go(-1);
} render() { return (
<div>
  <button type="primary" onClick="{this.back}">返回上一页</button>
</div>
) } } // withRouter 让一般组件支持路由组件 export default withRouter(ZHeader)
```

# 优化

## 1.PureComponent 的使用

快捷键 rpc
PureComponent
优点：  
this.setState({})  
空值不会触发更新  
缺点是:  
push()  
unshift()  
等数组方法不会触发热更新，原因是引用类型，不是赋值

```html
class Home extends PureComponent { }
```

## 2.Fragment 优化

Fragment 相当于 vue 中的 template  
只接收一个参数 key 用于 diff  
优点是:页面中不会带有标签

```js
<Fragment>页面中的元素</Fragment>
```

另外一种实现方式空标签  
缺点：不能有任何的键值队，否则无效

```js
<></>
```

## 3.ZNavLink 组件封装

封装

```js
  import React, { Component } from 'react'
  import { NavLink } from 'react-router-dom'
  import './index.scss'
  export default class ZNavLink extends Component {
      render() {
          return (
              <div>
              <!-- ...this.props结构所有传递进来的值  -->
                  <NavLink activeClassName="active" className="headerItem" {...this.props}/>
              </div>
          )
      }
  }

```

使用

```js
<ZNavLink to='/home' children='首页' />
```

## react Hooks 中 useMemo 跟 vue 的 computer 原理一样

使用方式

```js
import { userState, useMemo } from 'react'
function Memo() {
  const [name, setName] = useState('lcz')
  const [food, setFood] = useState('拉面')
  //useMemo  == computer
  const msg = useMemo(() => `我是${name},我吃${food}`, [name, food])
}
```

## eslint-plugin-react-hooks 在 useEffect 时候自动添加监听解决方案

1. 不要使用 eslint-plugin-react-hooks 插件，或者可以选择性忽略该插件的警告。(快速修复)
2. 只有一种情况，需要把变量放到 deps 数组中，那就是当该变量变化时，需要触发 useEffect 函数执行。而不是因为 useEffect 中用到了这个变量！

## useEffect 延迟调用会存在闭包问题
1. 使用 setTimeout、setInterval、Promise.then 等
2. useEffect 的卸载函数
> 解决方式
```js
import { useState, useEffect, useRef } from 'react'
const Test = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(countRef.current)
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRef.current])

  return (
    <div>
      <div style={{ color: '#fff' }}>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>点我</button>
    </div>
  )
}
export default Test
```

## 尽量不要用 useCallback
我建议在项目中尽量不要用 useCallback，大部分场景下，不仅没有提升性能，反而让代码可读性变的很差。

## useCallback 大部分场景没有提升性能
useCallback 可以记住函数，避免函数重复生成，这样函数在传递给子组件时，可以避免子组件重复渲染，提高性能。
```js
const someFunc = useCallback(()=> {
   doSomething();
}, []);

return <ExpensiveComponent func={someFunc} />
```
只要是个函数，都加个 useCallback，是你么？反正我以前是。
但我们要注意，提高性能还必须有另外一个条件，子组件必须使用了 shouldComponentUpdate 或者 React.memo 来忽略同样的参数重复渲染。
假如 ExpensiveComponent 组件只是一个普通组件，是没有任何用的。比如下面这样：
```js
  const ExpensiveComponent = ({ func }) => {
  return (
    <div onClick={func}>
    	hello
    </div>
  )
}
```
必须通过 React.memo 包裹 ExpensiveComponent ，才会避免参数不变的情况下的重复渲染，提高性能。
```js
const ExpensiveComponent = React.memo(({ func }) => {
  return (
    <div onClick={func}>
    	hello
    </div>
  )
})
```
所以，useCallback 是要和 shouldComponentUpdate/React.memo 配套使用的，你用对了吗？当然，我建议一般项目中不用考虑性能优化的问题，也就是不要使用 useCallback 了，除非有个别非常复杂的组件，单独使用即可。
>useCallback 让代码可读性变差
多层传递
```js
const someFuncA = useCallback((d, g, x, y)=> {
   doSomething(a, b, c, d, g, x, y);
}, [a, b, c]);

const someFuncB = useCallback(()=> {
   someFuncA(d, g, x, y);
}, [someFuncA, d, g, x, y]);

useEffect(()=>{
  someFuncB();
}, [someFuncB]);
```

## useMemo 建议适当使用
```js
// 使用 useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
如果没有使用 useMemo，computeExpensiveValue 会在每一次渲染的时候执行。如果使用了 useMemo，只有在 a 和 b 变化时，才会执行一次 computeExpensiveValue。

当然也不是无节制的使用，在很简单的基础类型计算时，可能 useMemo 并不划算。
```js
const a = 1;
const b = 2;

const c = useMemo(()=> a + b, [a, b]);
```