<!--
 * @Author: your name
 * @Date: 2021-09-03 10:25:12
 * @LastEditTime: 2021-09-03 10:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\readingBooks\reactTo.md
-->

## 普通属性定义

当我们在组件中需要用到一个变量，并且它与组件的渲染无关时，就应该把这个变量定义为组件的普通属性，直接挂载到 this 下， 而不是作为组件的 state。

```html
class Hello extends React.Component { 
  constructor(props) { 
    super(props); 
    this.timer = null; //普通属性 
    this.state = {
      date : new Date() 
    }
    this.updateDate = this.updateDate.bind(this); 
  }
  componentDidMount() { 
    this.timer = setInterval(this.updateDate, 1000) 
  }
  componentWillUnmount() { clearInterval(this.timer); }
  updateDate(){ this.setState({
    date: new Date() }); 
  }
  render() { return (
    <div>
      <h1>Hello</h1>
      <h1>{this.state.date.toString()}</h1>
    </div>
  ); } }
```

## setState 数组对象优化写法
```html
  数组
  1.使用preState、concat创建新数组 this.setState(preState => ({ books: preState.books.concat(['React Guide']); }))
  2.this.setState(preState => ({books: [...preState.books, 'React Guide']; }))
  3.this.setState(preState => ({ books: preState.books.filter(item => { return item !== 'React'; }); }))
  对象
  this.setState(preState => ({ owner: Object.assign({}, preState.owner, {name: 'Jason'}); }))
  this.setState(preState => ({ owner: {...preState.owner, name: 'Jason'}; }))
```

## 组件在更新阶段与服务器通信
```html
  class UserListContainer extends React.Component{ /** 省略无关代码 **/ 
    componentWillReceiveProps(nextProps) { 
      if(nextProps.category !== this.props.category) { 
        fetch('/path/to/user-api?category='+ nextProps.category). then(
          function(response) { 
            response.json().then(function(data) { 
              that.setState({users: data}) 
            }); 
          }); 
      } 
    } 
  }
```

## 避免组件不必要的渲染
```html
  class MyComponent extend React.Component { 
    shouldComponentUpdate(nextProps, nextState) { 
      if(nextProps.item === this.props.item) { 
        return false; 
      }
      return true;
    }// ... 
  }
```

## 不要在PureComponent组件的props使用直接赋值的方式
```html
const YourStyle = { width: '100px' } 

return (
<YourComponent style={YourStyle}></YourComponent>
)
```

## why-did-you-update
```html
  why-did-you-update会比较组件的 state 和 props 的变化，从而发现 组件render方法不必要的调用。
```