<!--
 * @Author: lcz
 * @Date: 2021-12-06 11:39:51
 * @LastEditTime: 2022-07-01 14:39:01
 * @LastEditors: lcz
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\react\hooks.md
-->

# 功能才会封 hooks

## useWatch

```js
import { useEffect, useRef } from 'react'
const useWatch = (data, callback, config = { immdiate: false }) => {
  const prev = useRef()
  const { immdiate } = config
  const inited = useRef(false)
  const stop = useRef(false)
  useEffect(() => {
    const execute = () => callback(prev.current)
    if (!stop.current) {
      if (!inited.current) {
        inited.current = true
        immdiate && execute()
      } else {
        execute()
      }
      prev.current = data
    }
  }, [data])

  return () => (stop.current = true)
}

export default useWatch
```

> 使用方式

```jsx
import { useState } from 'react'
import useWatch from '@/hooks/useWatch'
const Test = () => {
  const [num, setNum] = useState(1)
  useWatch(num, pre => console.log(pre, num), { immdiate: false })
  return (
    <div>
      <div style={{ color: '#fff' }}>{num}</div>
      <button onClick={() => setNum(num + 1)}>点我</button>
    </div>
  )
}
export default Test
```

## useAsyncEffect 支持 useEffect 的异步请求

```js
import { useEffect } from 'react'
function useAsyncEffect(effect, dependencies) {
  return useEffect(() => {
    const cleanupPromise = effect()
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
export default useAsyncEffect
```

> 使用

```js
useAsyncEffect(async () => {
  try {
    // 家具
    let res = await getCommodityList()
    //家具分类选择
    let jiajuSelect = res.data.filter(el => {
      if (el.parentId === 0) {
        return el
      }
    })
    setJiajuSelect(jiajuSelect)
  } catch (e) {
    message.error('门店或者家具接口请求失败')
  }
}, [])
```

## useSyncCallback

> 相当于 vue this.$nextClick

```jsx
import { useEffect, useState, useCallback } from 'react'

const useSyncCallback = callback => {
  const [proxyState, setProxyState] = useState(false)

  const fn = useCallback(() => {
    setProxyState(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proxyState])

  useEffect(() => {
    if (proxyState) {
      setProxyState(false)
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proxyState])

  return fn
}

export default useSyncCallback
```

> 使用

```jsx
//useState 异步数据变了之后调用useSyncCallback
const [canvasEcharts, setCharts] = useState('')
setCharts(echarts.init(document.getElementById('main')))
drawApi()

const drawApi = useSyncCallback(async () => {
  try {
    let params = Object.assign({}, queryParams)
    params.year = new Date(params.year).getFullYear()
    console.log(params, 2211)
    let { data } = await storeProfit(params)
    if (data.length > 0) {
      setTimeout(() => {
        let x = Array(13).fill(0),
          y = Array(13).fill(0),
          y1 = Array(13).fill(0)
        console.log(x.length, 22)
        data.forEach(el => {
          x[el.x] = el.x
          y[el.x] = el.y
          y1[el.x] = el.y1
        })
        x = x.map((_, index) => index + '月')
        dreamEcharts(x.splice(1), y.splice(1), y1.splice(1))
      }, 500)
    } else {
      message.error('暂无数据')
    }
  } catch (e) {
    console.log(e)
  }
})
```

## useMount

```jsx
const useMount = callback => {
  useEffect(() => {
    callback()
  }, [])
}
```

## useDebounce

```jsx
import { useEffect, useState } from 'react'

// 防抖 hooks
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
export default useDebounce
```

## 内置 useContext

> 实际开发需要创建一个 context-manager.js 管理文件

```jsx
import React, { createContext } from 'react'

export const MyContext = createContext(null)
```

> 父组件

```jsx
import React, { useState } from 'react'
import Child from './Child'
import { MyContext } from './context-manager'

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    })
  })
}

export default (props = {}) => {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)

  return (
    <MyContext.Provider value={{ setStep, setCount, setNumber, fetchData }}>
      <Child step={step} number={number} count={count} />
    </MyContext.Provider>
  )
}
```

子组件

```jsx
import React, { useContext, useEffect, memo } from 'react'

import { MyContext } from './context-manager'

export default memo((props = {}) => {
  const { setStep, setNumber, setCount, fetchData } = useContext(MyContext)

  useEffect(() => {
    fetchData().then(res => {
      console.log(`FETCH DATA: ${res}`)
    })
  }, [])

  return (
    <div>
      <p>step is : {props.step}</p>
      <p>number is : {props.number}</p>
      <p>count is : {props.count}</p>
      <hr />
      <div>
        <button
          onClick={() => {
            setStep(props.step + 1)
          }}
        >
          step ++
        </button>
        <button
          onClick={() => {
            setNumber(props.number + 1)
          }}
        >
          number ++
        </button>
        <button
          onClick={() => {
            setCount(props.step + props.number)
          }}
        >
          number + step
        </button>
      </div>
    </div>
  )
})
```

## useReducer

新建：actionTypes

```jsx
export const UPDATE_COLOR = 'UPDATE_COLOR'
```

新建：reducer

```jsx
import { UPDATE_COLOR } from '@/contentReducer/actionTypes'
export const colorReduce = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color
    default:
      return state
  }
}
```

use

```jsx
import React, { useReducer } from 'react'
import { colorReduce } from '@/contentReducer/reducer/index'
const [color, setColor] = useReducer(colorReduce, 'green')
```

## createContent+useContent+useReducer = redux

全局最外面 缺的文件看上文 createContent+useContent +useReducer

```jsx
/*
 * @Author: your name
 * @Date: 2022-02-23 09:50:41
 * @LastEditTime: 2022-02-28 11:20:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /sendCoin/moresendcoin/src/App.jsx
 */
// import logo from './logo.svg';
import React, { lazy, Suspense, useReducer } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import ZLoading from './components/common/ZLoading/ZLoading'

import { allContentReduce } from '@/contentReducer/createContent'
import { colorReduce, reducerQuantity } from '@/contentReducer/reducer/index'

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
const Dapp = lazy(() => import('@/pages/dapp'))
const Demo = lazy(() => import('@/pages/demo/index'))
const Demo2 = lazy(() => import('@/pages/demo2/index'))

function getLibrary(provider) {
  const library = new Web3(provider)
  // const library = new Web3("http://127.0.0.1:7545")
  // 提供者Provider 的轮询频率（以毫秒为单位）。 默认时间间隔为4秒
  // 对于 PoA 网络本地节点时，更小的轮询间隔也许有意义。 不过但轮询Etherscan或INFURA时，设置得太低可能会导致服务阻止我们的IP地址或以其他方式限制API调用。
  library.pollingInterval = 8000
  return library
}

function App() {
  const [color, setColor] = useReducer(colorReduce, 'green')
  const [quantity, setQuantity] = useReducer(reducerQuantity, 0)
  // const [quantity,setQuantity] = useReducer(reducerNumber,0)
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='App'>
        <allContentReduce.Provider value={{ color, setColor, quantity, setQuantity }}>
          <Suspense fallback={<ZLoading />}>
            <Switch>
              <Route path='/dapp' component={Dapp}></Route>
              <Route path='/demo' component={Demo}></Route>
              <Route path='/demo2' component={Demo2}></Route>
              <Redirect to='/dapp'></Redirect>
            </Switch>
          </Suspense>
        </allContentReduce.Provider>
        {/* 提高匹配速度，先匹配到后不执行 */}
        {/* replace堆替换 Link */}
      </div>
    </Web3ReactProvider>
  )
}

export default App
```

## useEffect 和 useLayoutEffect 的区别

```js
// 下面图片名称反了 懒得改
```

> useEffect

- 基本上 90%的情况下,都应该用这个,这个是在 render 结束后,你的 callback 函数执行,但是不会 block browser painting,算是某种异步的方式吧,但是 class 的 componentDidMount 和 componentDidUpdate 是同步的,在 render 结束后就运行,useEffect 在大部分场景下都比 class 的方式性能更好.
  ![useLayoutEffect](../../assets/gif/useLayoutEffect.webp)
  > useLayoutEffect
- 这个是用在处理 DOM 的时候,当你的 useEffect 里面的操作需要处理 DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect 里面的 callback 函数会在 DOM 更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.
  ![useEffect](../../assets/gif/useEffect.webp)

## 封装 useEventListener

```js
function useEventListener(eventName, handler, element = global) {
  // 创建一个储存处理方法的ref
  const savedHandler = useRef()

  // 当处理函数改变的时候更新ref.current的方法
  // 这样可以使我们的总是获取到最新的处理函数
  // 并且不需要在它的effect依赖数组中传递
  // 并且避免有可能每次渲染重新引起effect方法
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // 确认是否支持addEventListener
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // 创建一个调用储存在ref中函数的事件监听
      const eventListener = event => savedHandler.current(event)

      // 添加事件监听
      element.addEventListener(eventName, eventListener)

      // 在cleanup的回调中，清除事件监听
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element] // 当元素或者绑定事件改变时，重新运行
  )
}
```

- use

```js
import { useRef, useEffect, useCallback } from 'react';
function App(){
  // 用来储存鼠标位置的State
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // 利用useCallback来处理回调
  // ... 这里依赖将不会发生改变
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // 更新坐标
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  // 使用自定义的hook添加事件
  useEventListener('mousemove', handler);

  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );

```

## useLockBodyScroll

目的:弹出层调用 hooks 锁住 body

```js
import { useState, useLayoutEffect } from 'react'

// 使用
function App() {
  // modal框的state
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal title='Try scrolling' content="I bet you you can't! Muahahaha ?" onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}

function Modal({ title, content, onClose }) {
  // 调用hook锁定body滚动
  useLockBodyScroll()

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal'>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  )
}

// Hook
function useLockBodyScroll() {
  useLayoutEffect(() => {
    // 获取原始body的overflow值
    const originalStyle = window.getComputedStyle(document.body).overflow
    //防止在mount的过程中滚动
    document.body.style.overflow = 'hidden'
    // 当组件unmount的时候解锁滚动
    return () => (document.body.style.overflow = originalStyle)
  }, []) // 空数组保证了effect函数只会在mount和unmount的时候运行
}
```

## useTheme

目的 改变主题样式:可以通过接口等方式实现改变

```js
import { useLayoutEffect } from 'react'
import './styles.scss' // -> https://codesandbox.io/s/15mko9187

// Usage
const theme = {
  'button-padding': '16px',
  'button-font-size': '14px',
  'button-border-radius': '4px',
  'button-border': 'none',
  'button-color': '#FFF',
  'button-background': '#6772e5',
  'button-hover-border': 'none',
  'button-hover-color': '#FFF',
}

function App() {
  useTheme(theme)

  return (
    <div>
      <button className='button'>Button</button>
    </div>
  )
}

// Hook
function useTheme(theme) {
  useLayoutEffect(
    () => {
      // 循环这个主题对象
      for (const key in theme) {
        // 更新文档根元素的css变量
        document.documentElement.style.setProperty(`--${key}`, theme[key])
      }
    },
    [theme] // 只要当主题对象发行改变时才会再次运行
  )
}
```

## usePrevious

- 缓存上一次的值
- 类似于 vue watch 中的 oldvalue 与 newvalue

```js
import { useState, useEffect, useRef } from 'react'

// Usage
function App() {
  const [count, setCount] = useState(0)

  // 获取更新前的值 (在上一次render中传进hook)
  const prevCount = usePrevious(count)

  // 同时展示当前值和更新前值
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// Hook
function usePrevious(value) {
  // ref对象是一个通用容器其current属性为可变的，并且可以容纳任何值，类似与一个类上的实例属性。
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // 只有当值改变时重新运行

  // 返回更新前的值 (发生在useEffect更新之前)
  return ref.current
}
```

## useOnClickOutside

- 是否在元素外点击

```js
import { useState, useEffect, useRef } from 'react'

// Usage
function App() {
  // 创建一个ref，储存我们要监测外部点击的元素
  const ref = useRef()
  // modal框的逻辑
  const [isModalOpen, setModalOpen] = useState(false)
  // 调用hook，并传入ref和外部点击时要触发的函数
  useOnClickOutside(ref, () => setModalOpen(false))

  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>? Hey, I'm a modal. Click anywhere outside of me to close.</div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  )
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // 元素内点击不做任何事
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // 将ref和处理函数添加到effect的依赖数组中
    // 值得注意的一点是，因为在每一次render中被传入的处理方法是一个新函数，这将会导致effect的callback和cleanup每次render时被1调用。
    // 这个问题也不大，你可以将处理函数通过useCallback包裹起来然后再传入hook中。
    [ref, handler]
  )
}
```

## useWindowSize

- 获取浏览器当前的屏幕尺寸

```js
import { useState, useEffect } from 'react'

// Usage
function App() {
  const size = useWindowSize()

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  )
}

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // 空数组保证effect只会在mount和unmount执行

  return windowSize
}
```

## useHover

检测是否移动到某个元素上

```js
import { useRef, useState, useEffect } from 'react'

// Usage
function App() {
  const [hoverRef, isHovered] = useHover()

  return <div ref={hoverRef}>{isHovered ? '?' : '☹️'}</div>
}

// Hook
function useHover() {
  const [value, setValue] = useState(false)

  const ref = useRef(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)

        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }
    },
    [ref.current] // 只有当ref改变时才会重新调用
  )

  return [ref, value]
}
```

## useLocalStorage

```js
import { useState } from 'react'

// Usage
function App() {
  // 与useState相似，但是第一个参数是localstorage中的key值
  const [name, setName] = useLocalStorage('name', 'Bob')

  return (
    <div>
      <input type='text' placeholder='Enter your name' value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // 将初始状态传给useState，这样逻辑只会执行一次
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 通过key值从localstorage中获取值
      const item = window.localStorage.getItem(key)
      // 如果没有返回初始值则解析储存的json
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // 如果报错了依旧返回初始值
      console.log(error)
      return initialValue
    }
  })

  // 返回useState的setter函数的包装版本，该函数将新的值保存到localstorage中
  const setValue = value => {
    try {
      // 允许值是一个函数，这样我们就有了和useState一样的api
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // 保存state
      setStoredValue(valueToStore)
      // 保存到localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // 更高级实现的处理将会处理错误的情况
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
```

## useState 实现原理
* 版本1 简单方式
* 缺点 同一个cunrrentState 每次改都改这个
```js
let cunrrentState
const useState = initialState => {
  const state = cunrrentState || initialState
  const setState = newState => {
    cunrrentState = newState
    render() //渲染dom的方法
  }
  return [state, setState]
}
```
* 优化, 数组+下标的形式单独存储,对应不同useState创建的地址
```js
let index=  -1;
const currentStateBoxs = [];
const useState = initialState => {
  index++;
  const currentIndex = index;
  currentStateBoxs[currentIndex] = currentStateBoxs[currentIndex] || initialState;
  const setState = newState => {
    currentStateBoxs[currentIndex] = newState;
    render(); // 这个 render 可以理解为触发了整个 react app 渲染，就像 ReactDOM.render();
  };
  return [ currentStateBoxs[currentIndex], setState ];
};
```

## useEffect 实现原理
* 目前还没参考明白 需要参考额外资料
* 参考地址:https://zhuanlan.zhihu.com/p/265662126
```js
const lastDepsBoxs = [];
const lastClearCallbacks = [];
let index = 0;
const useEffect = (callback, deps) => {
    const lastDeps = lastDepsBoxs[index];
    const changed = !lastDeps || !deps || deps.some((dep, index) => dep !== lastDeps[index]);   
    if (changed) {
        lastDepsBoxs[index] = deps;
        if (lastClearCallbacks[index]) {
            lastClearCallbacks[index]();
        }
        lastClearCallbacks[index] = callback();
    }
    index ++;
};
```

## useState 与 useEffect 与 useLayoutEffect 顺序流程图
* 参考文档:https://zhuanlan.zhihu.com/p/346977585
* 执行顺序 effect保存在fiber.memoizedState对应的hook中
1. fiber.memoizedState ---> useState hook
2. useState hook ---> useEffect hook
3. useEffect hook ---> useLayoutffect hook
* 执行顺序 effect保存在fiber.updateQueue对应的hook中
1. useLayoutEffect ----> useEffect

## useStateWithCall 

```jsx
import { useRef, useState, useEffect } from "react";

const useStateWithCall = (initValue)=>{
  const ref = useRef(0)
  const callFRef = useRef()
  const setFuncRef = useRef()
  let [state,setState] = useState(initValue)
  if(!ref.current){
    ref.current = 1;
    setFuncRef.current = (newData,callF)=>{
      callFRef.current = callF;
      setState(newData)
      return Promise.resolve(newData)
    }
  }
  useEffect(()=>{
    callFRef.current?.(state)
  },[state])
  return [state,setFuncRef.current]
}

export default useStateWithCall;

```
* use
```jsx
const [test,setTest] = useStateWithCall(-1);
```
callback
```jsx
// 设置新数据 
setTest(1,(newState)=>{
    console.log("新值"+newState)
})
```
.then
```jsx
setTest(type).then((newState)=>{
    console.log("新值"+newState)
})
```