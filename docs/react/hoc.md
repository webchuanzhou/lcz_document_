<!--
 * @Author: lcz
 * @Date: 2021-12-14 18:11:09
 * @LastEditTime: 2021-12-14 18:14:07
 * @LastEditors: Please set LastEditors
 * @Description: hoc封装
 * @FilePath: \lcz_document\docs\react\hoc.md
-->

## asyncComponent 异步组件加载 hoc

```jsx
import React from 'react'
const asyncComponent = loadComponent =>
  class AsyncComponent extends React.Component {
    constructor(...args) {
      super(...args)
      this.state = {
        Component: null,
      }
      this.hasLoadedComponent = this.hasLoadedComponent.bind(this)
    }
    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return
      }
      loadComponent()
        .then(module => (module.default ? module.default : module))
        .then(Component => {
          this.setState({
            Component,
          })
        })
        .catch(error => {
          /*eslint-disable*/
          console.error('cannot load Component in <AsyncComponent>')
          /*eslint-enable*/
          throw error
        })
    }
    hasLoadedComponent() {
      return this.state.Component !== null
    }
    render() {
      const { Component } = this.state

      return Component ? <Component {...this.props} /> : null
    }
  }
export default asyncComponent
```

> 使用

```jsx
import asyncComponent from '@/hoc/asyncComponent'
;<Switch location={location}>
  <Redirect exact from='/' to='/dashboard' />
  {routeList.map(route => {
    // console.log(route,2222211)
    return (
      <Route
        exact
        component={asyncComponent(() => import(`@/views${route.component}`))}
        key={route.path}
        path={route.routing}
      />
    )
  })}
  {routeList.length > 0 ? <Redirect to='/error/404' /> : null}
</Switch>
```

## table Hoc 封装

```jsx
import React, { Component } from 'react'
import { message, Modal } from 'antd'

const tableHoc = WrappedComponent =>
  class tableHoc extends Component {
    state = {
      _isMounted: false,
      list: [],
      total: 0,
      loading: false,
      listQuery: {
        current: 1,
        size: 10,
      },
      modalVisible: false,
      modalLoading: false,
    }
    /**
     * @description: 数据更新方法
     * @param {*}
     * @return {*}
     */
    updateState = (value, callBack) => {
      callBack
        ? this.setState({ ...value }, () => {
            callBack()
          })
        : this.setState({ ...value })
    }
    /**
     * @description: 分页方法
     * @param {*}
     * @return {*}
     */
    changePage = (current, size) => {
      this.setState(
        state => ({
          listQuery: {
            ...state.listQuery,
            current,
          },
        }),
        () => {
          this.fetchData(this.instanceComponent.state.listApi)
        }
      )
    }
    changePageSize = (current, size) => {
      this.setState(
        state => ({
          listQuery: {
            ...state.listQuery,
            current: 1,
            size,
          },
        }),
        () => {
          this.fetchData(this.instanceComponent.state.listApi)
        }
      )
    }

    /**
     * @description: Input过滤方法
     * @param {*}
     * @return {*}
     */
    filterFieldInputChange = (type, callback, e) => {
      let value = e.target.value
      callback && callback({ [type]: value })
    }

    /**
     * @description: Select过滤方法
     * @param {*}
     * @return {*}
     */
    filterFieldSelectChange = (type, callback, e) => {
      callback && callback({ [type]: e })
    }

    /**
     * @description: 删除方法
     * @param {*}
     * @return {*}
     */

    handleDelete = (requestApi, params) => {
      Modal.confirm({
        title: '删除',
        content: '确定要删除吗?',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            const res = await requestApi(params)
            message.success('删除成功')
            this.fetchData(this.instanceComponent.state.listApi)
          } catch (err) {
            console.log('删除失败:' + err)
          }
        },
      })
    }

    /**
     * @description: 列表请求
     * @param {*}
     * @return {*}
     */
    fetchData = async requestApi => {
      const { listQuery } = this.state
      await this.setState({ loading: true })
      let data = {
        ...listQuery,
        ...this.instanceComponent.state.requestParams,
      }
      try {
        const response = await requestApi(data)
        const list = response.data.list
        const total = response.data.totalSize
        await this.setState({ loading: false, list, total })
      } catch (err) {
        await this.setState({ loading: false })
      }
    }

    render() {
      const {
        updateState,
        changePage,
        changePageSize,
        filterFieldInputChange,
        filterFieldSelectChange,
        handleDelete,
        fetchData,
      } = this
      const props = {
        ...this.props,
        ...this.state,
        updateState,
        changePage,
        changePageSize,
        filterFieldInputChange,
        filterFieldSelectChange,
        handleDelete,
        fetchData,
      }
      return <WrappedComponent {...props} ref={instanceComponent => (this.instanceComponent = instanceComponent)} />
    }
  }
export default tableHoc
```
