<!--
 * @Author: lcz
 * @Date: 2021-09-02 09:48:45
 * @LastEditTime: 2021-10-12 10:27:12
 * @LastEditors: Please set LastEditors
 * @Description: react 面试题
 * @FilePath: \lcz_document\docs\questions\react.md
-->

## 什么是高阶组件？
高阶组件(HOC)是接受一个组件并且返回一个新的组件
HOC 可以用于以下许多用例

1.代码重用、逻辑和引导抽象
2.渲染劫持
3.state 抽象和操作
4.props 处理

## 在构造函数调用 super 并将 props 作为参数传入的作用是啥？
在调用 super() 方法之前，子类构造函数无法使用this引用，ES6 子类也是如此。将 props 参数传递给 super() 调用的主要原因是在子构造函数中能够通过this.props来获取传入的 props。
（没有super之前不能调用this，不能访问this.props，调用后才访问）
例子
```html
  constructor(props) {
      super(props);
      console.log(this.props);  // { name: 'sudheer',age: 30 }
  }

  constructor(props) {
    super();
    console.log(this.props);  //undefined
    console.log(props); // Prints { name: 'sudheer',age: 30 }
  }
  render() {
    // 构造函数外部不受影响
    console.log(this.props) // { name: 'sudheer',age: 30 }
  }
```
上面示例揭示了一点。props 的行为只有在构造函数中是不同的，在构造函数之外也是一样的。

## 什么是控制组件？
```html

在 HTML 中，表单元素如 <input>、<textarea>和<select>通常维护自己的状态，并根据用户输入进行更新。当用户提交表单时，来自上述元素的值将随表单一起发送。
而 React 的工作方式则不同。包含表单的组件将跟踪其状态中的输入值，并在每次回调函数(例如onChange)触发时重新渲染组件，因为状态被更新。以这种方式由 React 控制其值的输入表单元素称为受控组件。
```


## React 中的StrictMode(严格模式)是什么？？
React 的StrictMode是一种辅助组件，可以帮助咱们编写更好的 react 组件，可以使用<StrictMode />包装一组组件，并且可以帮咱们以下检查：

验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。

验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。

通过识别潜在的风险预防一些副作用。

## 什么是 prop drilling，如何避免？

在构建 React 应用程序时，在多层嵌套组件来使用另一个嵌套组件提供的数据。最简单的方法是将一个 prop 从每个组件一层层的传递下去，从源组件传递到深层嵌套组件，这叫做prop drilling。
prop drilling的主要缺点是原本不需要数据的组件变得不必要地复杂，并且难以维护。
为了避免prop drilling，一种常用的方法是使用React Context。通过定义提供数据的Provider组件，并允许嵌套的组件通过Consumer组件或useContext Hook 使用上下文数据。
(redux)
写法:
```html
const {Provider, Consumer} = React.createContext(defaultValue);
父组件
render() {
    let name ="小人头"
    return (
        //Provider共享容器 接收一个name属性
        <Provider value={name}>
            <div style={{border:'1px solid red',width:'30%',margin:'50px auto',textAlign:'center'}}>
                <p>父组件定义的值:{name}</p>
                <Son />
            </div>
        </Provider>
    );
}
子组件
return (
  <Consumer>
    {( name ) =>
        <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
            <p>子组件。获取父组件的值:{name}</p>
            {/* 孙组件内容 */}
            <Grandson />
        </div>
    }
  </Consumer>
)
孙子
function Grandson(props) {
    return (
         //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
        <Consumer>
            {(name ) =>
                   <div style={{border:'1px solid green',width:'60%',margin:'50px auto',textAlign:'center'}}>
                   <p>孙组件。获取传递下来的值:{name}</p>
               </div>
            }
        </Consumer>
    );
}
```
## 受控组件和非受控组件区别是啥？
受控组件是 React 控制中的组件，并且是表单数据真实的唯一来源。（onchange）
非受控组件是由 DOM 处理表单数据的地方，而不是在 React 组件中。 (refs)

尽管非受控组件通常更易于实现，因为只需使用refs即可从 DOM 中获取值，但通常建议优先选择受控制的组件，而不是非受控制的组件。

这样做的主要原因是受控组件支持即时字段验证，允许有条件地禁用/启用按钮，强制输入格式。

## 在 React 中使用构造函数和 getInitialState 有什么区别？
构造函数和getInitialState之间的区别就是ES6和ES5本身的区别。在使用ES6类时，应该在构造函数中初始化state，并在使用React.createClass时定义getInitialState方法。
(es6 类方式的写法) 
(es5 
  React.createClass({
    getInitialState() {
      return { /* initial state */ };
    },
  })
)

## 如何避免组件的重新渲染？
eact 中最常见的问题之一是组件不必要地重新渲染。React 提供了两个方法，在这些情况下非常有用：

React.memo():这可以防止不必要地重新渲染函数组件

PureComponent:这可以防止不必要地重新渲染类组件

## 什么是纯函数？
一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。
1.相同输入总是会返回相同的输出。
2.不产生副作用。
3.不依赖于外部状态。

## 当调用setState时，React render 是如何工作的？
虚拟 DOM 渲染:当render方法被调用时，它返回一个新的组件的虚拟 DOM 结构。当调用setState()时，render会被再次调用，因为默认情况下shouldComponentUpdate总是返回true，所以默认情况下 React 是没有优化的。
原生 DOM 渲染:React 只会在虚拟DOM中修改真实DOM节点，而且修改的次数非常少——这是很棒的React特性，它优化了真实DOM的变化，使React变得更快。

## 如何避免在React重新绑定实例？
1.将事件处理程序定义为内联箭头函数
2.使用箭头函数来定义方法：
3.使用带有 Hooks 的函数组件

## React 事件机制
React并不是将click事件绑定到了div的真实DOM上，而是在document处监听了所有的事件，当事件发生并且冒泡到document处的时候，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂在销毁时统一订阅和移除事件。
除此之外，冒泡到document上的事件也不是原生的浏览器事件，而是由react自己实现的合成事件（SyntheticEvent）。因此如果不想要是事件冒泡的话应该调用event.preventDefault()方法，而不是调用event.stopProppagation()方法。

（react 事件都是挂载document监听所有事件）

## React 高阶组件、Render props、hooks 有什么区别，
Hoc、render props和hook都是为了解决代码复用的问题，但是hoc和render props都有特定的使用场景和明显的缺点。hook是react16.8更新的新的API，让组件逻辑复用更简洁明了，同时也解决了hoc和render props的一些缺点。

## React.Component 和 React.PureComponent 的区别
PureComponent表示一个纯组件，可以用来优化React程序，减少render函数执行的次数，从而提高组件的性能。

在React中，当prop或者state发生变化时，可以通过在shouldComponentUpdate生命周期函数中执行return false来阻止页面的更新，从而减少不必要的render执行。React.PureComponent会自动执行 shouldComponentUpdate。

不过，pureComponent中的 shouldComponentUpdate() 进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。浅比较会忽略属性和或状态突变情况，其实也就是数据引用指针没有变化，而数据发生改变的时候render是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。PureComponent一般会用在一些纯展示组件上。

## React.createClass和extends Component的区别有哪些？
语法区别：
createClass本质上是一个工厂函数，extends的方式更加接近最新的ES6规范的class写法。两种方式在语法上的差别主要体现在方法的定义和静态属性的声明上。
createClass方式的方法定义使用逗号，隔开，因为creatClass本质上是一个函数，传递给它的是一个Object；而class的方式定义方法时务必谨记不要使用逗号隔开，这是ES6 class的语法规范。
propType 和 getDefaultProps区别：
React.createClass：通过proTypes对象和getDefaultProps()方法来设置和获取props.
React.Component：通过设置两个属性propTypes和defaultProps
状态的区别：
React.createClass：通过getInitialState()方法返回一个包含初始值的对象
React.Component：通过constructor设置初始状态
this区别：
React.createClass：会正确绑定this
React.Component：由于使用了 ES6，这里会有些微不同，属性并不会自动绑定到 React 类的实例上。
Mixins
React.createClass：使用 React.createClass 的话，可以在创建组件时添加一个叫做 mixins 的属性，并将可供混合的类的集合以数组的形式赋给 mixins。
如果使用 ES6 的方式来创建组件，那么 React mixins 的特性将不能被使用了。

## 对componentWillReceiveProps 的理解
该方法当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用。
使用好处： 在这个生命周期中，可以在子组件的render函数执行前获取新的props，从而更新子组件自己的state。 可以将数据请求放在这里进行执行，需要传的参数则从componentWillReceiveProps(nextProps)中获取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担。

## 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？
1.setState（）方法被调用
setState（） 如果传入的是null 不会重新调用render
2.父组件重新渲染
只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

重新渲染 render 会做些什么?
会对新旧 VNode 进行对比，也就是我们所说的Diff算法。
对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
遍历差异对象，根据差异的类型，根据对应对规则更新VNode

## React声明组件有哪几种方法，有什么不同？
React 声明组件的三种方式：

函数式定义的无状态组件
ES5原生方式React.createClass定义的组件
ES6形式的extends React.Component定义的组件
（1）无状态函数式组件
它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到state状态的操作
组件不会被实例化，整体渲染性能得到提升，不能访问this对象，不能访问生命周期的方法
（2）ES5 原生方式 React.createClass // RFC
React.createClass会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。
（3）E6继承形式 React.Component // RCC 目前极为推荐的创建有状态组件的方式，最终会取代React.createClass形式；相对于 React.createClass可以更好实现代码复用。

## React中可以在render访问refs吗？为什么？
不可以，render 阶段 DOM 还没有生成，无法获取 DOM。

## 对React的插槽(Portals)(传送门)的理解，如何使用，有哪些使用场景

```html
const appRoot = document.getElementById('app-root');
const maskRoot = document.getElementById('mask-root');
class Mask extends React.Component{
    constructor(props){
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount(){
        maskRoot.appendChild(this.el);
    }
    componentWillUnmount(){
        maskRoot.removeChild(this.el);
    }
    render(){
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showMask:false
        }
        this.handler = this.handler.bind(this);
    }
    handler(){
        let showMask = this.state.showMask;
        this.setState({showMask:!showMask});
    }
    render(){
        let showMask = this.state.showMask;
        let mask =  showMask ? 
            <Mask>
               <div className='modal'>
                    adadsadadad
                   <button onClick={this.handler}>hidden</button>
               </div>
            </Mask>
        : null;
        return (
            <div>
                 This div has overflow: hidden.
                <button onClick={this.handler}>show</button>    
                {mask}
            </div>
        );
    }
}
ReactDOM.render(<App/>,appRoot);
```

## setState 是同步的还是异步的
setState 调用本身就是同步的，而外面之所以不能立即拿到结果就是因为 React 的批处理机制。
正是因为 setState 是同步的，当同时触发多次 setState 时浏览器会一直被JS线程阻塞，那么那么浏览器就会掉帧，导致页面卡顿，所以 React 才引入了批处理的机制，主要是为了将同一上下文中触发的更新合并为一个更新。
```html
    componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);   
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);   

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val); 
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  
    }, 0);
  }
  // 0 0 2 3
```
合并机制原理：
```html
processPendingState: function (props, context) {
  var inst = this._instance;
  var queue = this._pendingStateQueue;
  var replace = this._pendingReplaceState;
  this._pendingReplaceState = false;
  this._pendingStateQueue = null;

  if (!queue) {
   return inst.state;
  }

  if (replace && queue.length === 1) {
   return queue[0];
  }

  var nextState = _assign({}, replace ? queue[0] : inst.state);
  for (var i = replace ? 1 : 0; i < queue.length; i++) {
   var partial = queue[i];
   _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
  }

  return nextState;
 },

```

## fiber 是什么？
React Fiber 是一种基于浏览器的单线程调度算法。

## 调用 setState 之后发生了什么？
1. 在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
2. 然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， 
3. Fiber 算法的最大特点是可以做到异步可中断的执行。
4. 然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
5. 在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
6. 当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
7. 当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
8. 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。
(创建一个更新列队,然后会Fiber 的调度算法，生成新的Fiber树，)

## 为什么虚拟dom 会提高性能?
虚拟dom 相当于在 JS 和真实 dom 中间加了一个缓存，利用 diff 算法避免了没有必要的 dom 操作，从而提高性能。



## 什么是 Portals？
Portals 提供了把子节点渲染到父组件以外的DOM树
ReactDom.createPortal(child,container);
列子：(全局弹出层)


## React有哪些优化性能的手段?
> 类组件中的优化手段
1. 使用纯组件 PureComponent 作为基类
2. 使用React.memo 高阶函数包装组件
3. 使用shouldComponentUpdate 生命周期函数自定义渲染逻辑

> 方法组件的优化手段
1. 使用useMemo
2. 使用useCallBack

> 其他方式
1. 使用唯一值作为下标
2. 必要的时候用CSS隐藏组件，而不是条件判断
3. 使用Suspense 和 lazy 进行懒加载

## 为什么 React 元素有一个 $$typeof 属性？
目的是为了防止XSS攻击

## 什么是 suspense 组件?
Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。中途由suspense渲染