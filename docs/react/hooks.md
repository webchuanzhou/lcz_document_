<!--
 * @Author: lcz
 * @Date: 2021-12-06 11:39:51
 * @LastEditTime: 2022-02-28 16:43:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\react\hooks.md
-->

# 功能才会封hooks

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
import React, {useReducer } from 'react'
import { colorReduce } from '@/contentReducer/reducer/index'
const [color, setColor] = useReducer(colorReduce, 'green')
```

## createContent+useContent+useReducer = redux
全局最外面  缺的文件看上文 createContent+useContent +useReducer
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