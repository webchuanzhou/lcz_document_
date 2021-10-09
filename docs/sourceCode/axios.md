<!--
 * @Author: lcz
 * @Date: 2021-10-09 10:08:32
 * @LastEditTime: 2021-10-09 10:08:32
 * @LastEditors: Please set LastEditors
 * @Description: axios 源码
 * @FilePath: \lcz_document\docs\sourceCode\axios.md
-->


## axios源码
特点-下
1.从浏览器生成xmlhttprequest从node.js生成http请求
2.支持Promise API拦截请求和响应转换
3.请求和响应数据取消请求自动转换
transformData( config.data, config.headers, config.transformRequest )；
transformData( response.data, response.headers,config.transformResponse );
（返回的格式会JSON.parse（））解析
4.JSON数据客户端支持防止XSRF（CSRF）
检查是否为标准浏览器， 是 添加xsrf请求头

取消请求 要拿到axios里面的取消token，获取source（）方法，在调用接口取消，
原理是执行了 request.abort(); 

//定义适配器，判断是在服务器环境还是浏览器环境
//通过判断XMLHttpRequest和process这两个全局变量来判断程序的运行环境的，从而在不同的环境提供不同的http请求模块，实现客户端和服务端程序的兼容，
支持promise
获取默认配置->连接拦截器中间健->添加头部请求拦截->底部响应拦截->执行promise里面的请求拦截->请求->响应拦截->返回请求的数据
