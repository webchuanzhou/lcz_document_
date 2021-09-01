<!--
 * @Author: your name
 * @Date: 2021-09-01 16:56:46
 * @LastEditTime: 2021-09-01 17:12:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\reactAntdAdmin.md
-->
## 动态路由
路由文件路由注册
```html
  import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "@/views/layout";
import Login from "@/views/login";
// import Dashboard from "@/views/dashboard";
import error from "@/views/error/404";
import { getRouterFun } from "@/store/actions";
class Router extends React.Component {
  
  getRouer = ()=>{
    const {getRouterFun} = this.props;
    return new Promise((resolve, reject) => {
      getRouterFun().then(res=>{
        resolve()
      }).catch(error=>{
        setTimeout(()=>{
          this.getRouer();
        },5000)
      })
    })
  }
  
  render() {
    const { token,router } = this.props;
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/error/404" component={error} />
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login" />;
              } else {
                if(Object.keys(router).length>0){
                  return <Layout />
                }else{
                  this.getRouer().then((res)=>{
                    return <Layout />
                  })
                }
              }
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect((state) => ({...state.user,router:state.router}),{getRouterFun})(Router);
```
动态获取到路由存储到redux 2个变量  一个是一维数组 注册组件 一个是树形结构菜单渲染
```html
export const getRouterFun = () => dispatch => {
	return new Promise((resolve, reject) => {
		getRouter()
		  .then(response => {
					let data = response.data;
					let NewArr = [];
					let newRouter = ziduanUpdate(data)
					getNewArr(newRouter, NewArr)
					dispatch(setUserRouter(newRouter))
					console.log('请求成功222',newRouter, NewArr)
					dispatch(setUserComponentRegister(NewArr))
					resolve(data)
		  })
		  .catch(error => {
		    reject(error)
		  })
	})
}
```
渲染请求后加载的组件
```html
  import React from 'react'
import { Redirect, withRouter, Route, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Layout } from 'antd'
import { getMenuItemInMenuListByProperty } from '@/utils'
import asyncComponent from '@/hoc/asyncComponent'
const { Content } = Layout

const getPageTitle = (menuList, pathname) => {
  let title = '商城'
  let item = getMenuItemInMenuListByProperty(menuList, 'path', pathname)
  if (item) {
    title = `${item.title} - 商城`
  }
  return title
}

const LayoutContent = props => {
  const { location, routeList, router } = props
  const { pathname } = location
  return (
    <DocumentTitle title={getPageTitle(router, pathname)}>
      <Content style={{ height: 'calc(100% - 100px)' }}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={500}
            classNames='fade'
            exit={false}
          >
            <Switch location={location}>
              <Redirect exact from='/' to='/dashboard' />
              {routeList.map(route => {
                // console.log(route,2222211)
                return (
                  <Route
                    exact
                    component={asyncComponent(() =>
                      import(`@/views${route.component}`)
                    )}
                    key={route.path}
                    path={route.routing}
                  />
                )
              })}
              {routeList.length > 0 ? <Redirect to='/error/404' /> : null}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  )
}
export default connect(state => ({
  ...state.user,
  router: state.router,
  routeList: state.component,
}))(withRouter(LayoutContent))

```
## 工程化引入
```html
  const files = require.context('.', false, /.js$/)
const hooks = {}
files.keys().forEach(key => {
  if (key === './index.js') return
  Object.assign(hooks, {
    [key.replace(/^\.\/(.*?)\.js$/, '$1')]: files(key).default,
  })
})

module.exports = hooks
```

## 异步加载高阶组件
```html
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

## table 统一高阶组件
```html
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
          this.fetchData()
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
          this.fetchData()
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
            this.fetchData()
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