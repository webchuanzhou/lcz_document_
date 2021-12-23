<!--
 * @Author: lcz
 * @Date: 2021-12-06 11:39:51
 * @LastEditTime: 2021-12-22 16:09:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\react\hooks.md
-->

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
> 相当于vue this.$nextClick
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
>使用
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
  useEffect(()=>{
    callback()
  },[])
}
```

##  useDebounce
```jsx 
import { useEffect, useState } from 'react';

// 防抖 hooks
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])
  
  return debouncedValue;
}
export default useDebounce;

```