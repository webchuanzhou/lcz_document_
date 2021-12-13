<!--
 * @Author: lcz
 * @Date: 2021-12-06 11:39:51
 * @LastEditTime: 2021-12-09 15:23:16
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
