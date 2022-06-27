<!--
 * @Description:
 * @Autor: lcz
 * @Date: 2022-06-12 15:30:22
 * @LastEditors: lcz
 * @LastEditTime: 2022-06-27 14:24:27
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

## Video 或者 URL 播放第三方地址

xml 配置

```xml
<property key="urlExpression" type="expression" required="false">
    <caption>Video URL</caption>
    <description>The web address of the video: YouTube, Vimeo, Dailymotion or MP4.</description>
    <returnType type="String"/>
</property>
```

## textTemplate 模版

选择字段模版

```xml
<property key="videoUrl" type="textTemplate" required="false">
    <caption>Video URL</caption>
    <description>The web address of the video: YouTube, Vimeo, Dailymotion or MP4.</description>
</property>
```

## dataSource + textTemplate 文本模版选择

```xml
 <propertyGroup caption="Data Source">
  <propertyGroup caption="Data source">
      <property key="data" type="datasource" isList="true">
          <caption>Data source</caption>
          <description/>
      </property>
      <property key="title" type="textTemplate" dataSource="data" required="false">
          <caption>Title</caption>
          <description/>
      </property>
      <property key="description" type="textTemplate" dataSource="data" required="false">
          <caption>Description</caption>
          <description/>
      </property>
      <property key="timeIndication" type="textTemplate" dataSource="data" required="false">
          <caption>Time Indication</caption>
          <description />
      </property>
  </propertyGroup>
</propertyGroup>
```

## mendix xml 是 icon 图标 或者 事件

```jsx
import { ActionValue, WebIcon } from 'mendix'
export interface BasicItemType {
  icon?: WebIcon;
  action?: ActionValue;
}
```

## mendix 绑定事件执行方式

```jsx
const confirm = useCallback(() => {
  return props.confirm?.canExecute && props.confirm?.execute()
}, [props.confirm])
```
