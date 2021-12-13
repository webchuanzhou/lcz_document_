<!--
 * @Author: lcz
 * @Date: 2021-10-12 10:15:15
 * @LastEditTime: 2021-12-09 15:06:27
 * @LastEditors: Please set LastEditors
 * @Description: react 基础面试题
 * @FilePath: \lcz_document\docs\questions\reactBase.md
-->

## React 组件间有那些通信方式?

父组件向子组件通信
1、 通过 props 传递
子组件向父组件通信
1、 主动调用通过 props 传过来的方法，并将想要传递的信息，作为参数，传递到父组件的作用域中
跨层级通信
1、 使用 react 自带的 Context 进行通信，createContext 创建上下文， useContext 使用上下文。
2、使用 Redux 或者 Mobx 等状态管理库
3、使用订阅发布模式

## React 父组件如何调用子组件中的方法？

函数式组件
使用 useRef

```js
    import {useRef} from 'react';
    const Child = (props,ref)=>{
        getAlert() {
            alert("getAlert from Child");
        }
        return <h1>Hi</h1>;
    }
    const father = (props,ref)=>{
        const child = useRef()
        <>
            <Child res={child}></Child>
            <button onClick={()=>{child.current.getAlert()}}></button>
        </>
    }
```

类组件
createRef

```js
class Parent extends Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
  }

  onClick = () => {
    this.child.current.getAlert()
  }

  render() {
    return (
      <div>
        <Child ref={this.child} />
        <button onClick={this.onClick}>Click</button>
      </div>
    )
  }
}

class Child extends Component {
  getAlert() {
    alert('getAlert from Child')
  }

  render() {
    return <h1>Hello</h1>
  }
}
```

## 错误边界是什么？它有什么用？

在 React 中，任何一个组件报错，都会破坏整个组件树，导致页面白屏，这个时候就要用到错误边界进行优雅的降级

```js
class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 可以将错误日志上报给服务器
    console.log('组件奔溃 Error', error)
    console.log('组件奔溃 Info', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return this.props.content
    }
    return this.props.children
  }
}
```

## 类组件与函数组件有什么异同？

相同点：
组件是 React 可复用的最小代码片段，它们会返回要在页面中渲染的 React 元素。也正因为组件是 React 的最小编码单位，所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。
我们甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件（虽然并不推荐这种重构行为）。从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。所以，基本可认为两者作为组件是完全一致的。
不同点：

它们在开发时的心智模型上却存在巨大的差异。类组件是基于面向对象编程的，它主打的是继承、生命周期等核心概念；而函数组件内核是函数式编程，主打的是 immutable、没有副作用、引用透明等特点。
之前，在使用场景上，如果存在需要使用生命周期的组件，那么主推类组件；设计模式上，如果需要使用继承，那么主推类组件。但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
性能优化上，类组件主要依靠 shouldComponentUpdate  阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能。
从上手程度而言，类组件更容易上手，从未来趋势上看，由于 React Hooks 的推出，函数组件成了社区未来主推的方案。
类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在 Hooks 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。

## React 如何判断什么时候重新渲染组件？

当 React 将要渲染组件时会执行 shouldComponentUpdate 方法来看它是否返回 true（组件应该更新，也就是重新渲染）。所以需要重写 shouldComponentUpdate 方法让它根据情况返回 true 或者 false 来告诉 React 什么时候重新渲染什么时候跳过重新渲染。

## 类组件和函数组件之间的区别是啥？

函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。为了提高性能，尽量使用函数组件。

---

| 区别             | 函数组件 | 类组件 |
| ---------------- | -------- | ------ |
| 是否有 this      | 没有     | 有     |
| 是否有生命周期   | 没有     | 有     |
| 是否有状态 state | 没有     | 有     |

## React 中 refs 干嘛用的？

Refs 提供了一种访问在 render 方法中创建的 DOM 节点或者 React 组件的。

## 如何创建 refs

元素上绑定 ref 即可

```html
<div ref={(div)=>{this.div = div}}></div>
```

或者

```js
this.div = React.createRef()
;<div ref={this.div}></div>
```

## state 和 props 区别是啥？

state 是当前组件的状态控制
props 是外部传入的数据参数

## 讲讲什么是 JSX ？

JSX 代码本身不能被浏览器读取，必须使用 Babel 和 webpack 等工具将其转换为传统的 JS。
(可以在 jsx 中写 html 代码)

## 为什么不直接更新 state 呢 ?

试图直接更新 state ，则不会重新渲染组件
需要使用 setState()

## React 的生命周期方法有哪些？

componentWillMount:在渲染之前执行，用于根组件中的 App 级配置。

componentDidMount：在第一次渲染之后执行，可以在这里做 AJAX 请求，DOM 的操作或状态更新以及设置事件监听器。

componentWillReceiveProps：在初始化 render 的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染

shouldComponentUpdate：确定是否更新组件。默认情况下，它返回 true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回 false，这是一个提高性能的方法。

componentWillUpdate：在 shouldComponentUpdate 返回 true 确定要更新组件之前件之前执行。

componentDidUpdate：它主要用于更新 DOM 以响应 props 或 state 更改。

componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器

## 使用 React Hooks 好处是啥？

Hooks 通常支持提取和重用跨多个组件通用的有状态逻辑，而无需承担高阶组件或渲染 props 的负担。Hooks 可以轻松地操作函数组件的状态，而不需要将它们转换为类组件。

## React 中的 useState() 是什么？

useState 是一个内置的 React Hook。useState(0) 返回一个元组，其中第一个参数 count 是计数器的当前状态，setCounter 提供更新计数器状态的方法。

## 为什么 JSX 中的组件名要以大写字母开头？

因为 React 要知道当前渲染的是组件还是 HTML 元素。

## 在构造函数调用 super 并将 props 作为参数传入的作用是啥？

在调用 super() 方法之前，子类构造函数无法使用 this 引用，ES6 子类也是如此。将 props 参数传递给 super() 调用的主要原因是在子构造函数中能够通过 this.props 来获取传入的 props。
传递 props

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props) // { name: 'sudheer',age: 30 }
  }
}
```

没传递 props

```js
class MyComponent extends React.Component {
  constructor(props) {
    super()
    console.log(this.props) // undefined
    // 但是 Props 参数仍然可用
    console.log(props) // Prints { name: 'sudheer',age: 30 }
  }
  render() {
    // 构造函数外部不受影响
    console.log(this.props) // { name: 'sudheer',age: 30 }
  }
}
```

## React useEffect 不支持 async function

> useEffect 理由是 effect function 应该返回一个销毁函数（effect：是指 return 返回的 cleanup 函数） ，async 返回值就变成了 Promise 会导致报错
> React 为什么这么设计呢？
> 1、useEffect 的返回值是要在卸载组件时调用的，React 需要在 mount 的时候马上拿到这个值，不然就乱套了
> 2、useEffect() 可能有个潜在逻辑：第二次触发 useEffect 里的回调前，前一次触发的行为都执行完成，返回的清理函数也执行完成。这样逻辑才清楚。而如果是异步的，情况会变得很复杂，可能会很容易写出有 bug 的代码。
