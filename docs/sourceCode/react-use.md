<!--
 * @Author: lcz
 * @Date: 2022-03-07 11:11:53
 * @LastEditTime: 2022-03-08 16:18:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lcz_document/docs/sourceCode/react-use.md
-->

# 参考地址

[github](https://github.com/streamich/react-use/blob/master/docs/useEffectOnce.md)

# 生命周期 hooks 封装

## useEffectOnce

```jsx
import { EffectCallback, useEffect } from 'react'
const useEffectOnce = (callBack: EffectCallback) => {
  useEffect(callBack, [])
}
export default useEffectOnce
```

- use

```jsx
import { useEffectOnce } from 'react-use'

const Demo = () => {
  useEffectOnce(() => {
    console.log('Running effect once on mount')

    return () => {
      console.log('Running clean-up of effect on unmount')
    }
  })

  return null
}
```

## useLifecycles

```jsx
import { useEffect } from 'react'

const useLifecycles = (mount, unmount?) => {
  useEffect(() => {
    if (mount) {
      mount()
    }
    return () => {
      if (unmount) {
        unmount()
      }
    }
  }, [])
}

export default useLifecycles
```

- use

```jsx
import { useLifecycles } from 'react-use'

const Demo = () => {
  useLifecycles(
    () => console.log('MOUNTED'),
    () => console.log('UNMOUNTED')
  )
  return null
}
```

## useMountedState

```jsx
import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState(): () => boolean {
  const mountedRef = useRef < boolean > false
  const get = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return get
}
```

- use

```jsx
import * as React from 'react'
import { useMountedState } from 'react-use'

const Demo = () => {
  const isMounted = useMountedState()

  React.useEffect(() => {
    setTimeout(() => {
      if (isMounted()) {
        // ...
      } else {
        // ...
      }
    }, 1000)
  })
}
```

## usePromise

```js
import { useCallback } from 'react'
import useMountedState from './useMountedState'

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>

const usePromise: UsePromise = () => {
  const isMounted = useMountedState()
  return useCallback(
    (promise: Promise<any>) =>
      new Promise() <
      any >
      ((resolve, reject) => {
        const onValue = value => {
          isMounted() && resolve(value)
        }
        const onError = error => {
          isMounted() && reject(error)
        }
        promise.then(onValue, onError)
      }),
    []
  )
}

export default usePromise
```

- use

```js
import { usePromise } from 'react-use'

const Demo = ({ promise }) => {
  const mounted = usePromise()
  const [value, setValue] = useState()

  useEffect(() => {
    ;(async () => {
      const value = await mounted(promise)
      // This line will not execute if <Demo> component gets unmounted.
      setValue(value)
    })()
  })
}
```

## useMount

```js
import useEffectOnce from './useEffectOnce'

const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn()
  })
}

export default useMount
```

- use

```jsx
import { useMount } from 'react-use'

const Demo = () => {
  useMount(() => alert('MOUNTED'))
  return null
}
```

## useUnmount

```js
import { useRef } from 'react'
import useEffectOnce from './useEffectOnce'

const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn)

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}

export default useUnmount
```

- use

```js
import { useUnmount } from 'react-use'

const Demo = () => {
  useUnmount(() => alert('UNMOUNTED'))
  return null
}
```

## useUpdateEffect

> 后续补充

# Side-effects
## useCookie
```jsx
import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

const useCookie = (
  cookieName: string
): [string | null, (newValue: string, options?: Cookies.CookieAttributes) => void, () => void] => {
  const [value, setValue] = useState<string | null>(() => Cookies.get(cookieName) || null);

  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
```
* use
```jsx
import { useCookie } from "react-use";

const Demo = () => {
  const [value, updateCookie, deleteCookie] = useCookie("my-cookie");
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    deleteCookie();
  }, []);

  const updateCookieHandler = () => {
    updateCookie(`my-awesome-cookie-${counter}`);
    setCounter(c => c + 1);
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={updateCookieHandler}>Update Cookie</button>
      <br />
      <button onClick={deleteCookie}>Delete Cookie</button>
    </div>
  );
};
```
* use
```jsx
  const [value, updateCookie, deleteCookie] = useCookie(cookieName: string);
```