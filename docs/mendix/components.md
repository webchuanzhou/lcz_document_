<!--
 * @Description:
 * @Autor: lcz
 * @Date: 2022-06-12 15:30:22
 * @LastEditors: lcz
 * @LastEditTime: 2022-06-23 09:53:01
-->

- node --version
- npm --version
- yo --version //npm install yo -g
- npm install @mendix/generator-widget -g //mendix 脚手架生成器
- npm 上很多包版本用不了,不兼容 这是用 node:14.13.1
- "@mendix/pluggable-widgets-tools": "^8.0.5" 参考了 github 上的版本号

# 下面参考地址

https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/carousel-web/src/components/Carousel.tsx

## mendix dataSource 状态是否 loading

```jsx
import { ValueStatus } from 'mendix'
return props.dataSource?.status !== ValueStatus.Available ? 'loading components' : 'your components'
```

## dataSource xml 文件绑定数据源

```xml
<propertyGroup caption="Data Source">
  <property key="dataSource" type="datasource" isList="true" required="false">
      <caption>Data source</caption>
      <description />
  </property>
  <property key="content" type="widgets" dataSource="dataSource" required="false">
      <caption>Content</caption>
      <description />
  </property>
</propertyGroup>
```

## dataSource props map 循环

```jsx
import {  GUID, ObjectItem } from "mendix";
props.dataSource?.items?.map((item: ObjectItem) => ({
  id: item.id as GUID,
  content: props.content?.get(item)
})) ?? []

```

## 事件绑定触发

- ps: 需要 xml 配置 onClickAction,type 为 action

```jsx
import { useCallback } from 'react'
import { executeAction } from '@mendix/piw-utils-internal'

function xxx() {
  const onClick = useCallback(() => executeAction(props.onClickAction), [props.onClickAction])
  return <el onClick={onClick}></el>
}
```

## TS 定义数组对象

```ts

import { ReactNode } from "react";
import { GUID } from "mendix";
export interface {
  onClick?: () => void;
  items: Array<{ id: GUID; content?: ReactNode }>;
}
```
