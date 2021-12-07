<!--
 * @Author: your name
 * @Date: 2021-12-06 11:39:51
 * @LastEditTime: 2021-12-06 11:41:09
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
>使用方式
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