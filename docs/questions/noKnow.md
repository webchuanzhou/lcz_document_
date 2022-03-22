<!--
 * @Author: your name
 * @Date: 2022-03-22 20:35:16
 * @LastEditTime: 2022-03-22 21:54:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lcz_document/docs/questions/noKnow.md
-->

# 阿里 3.15

## for in 与 Object.keys 哪个能访问到原型链

- for in 可以访问到
- object.keys 是 es8 推出的,它的封装必定干了啥事情,比如 object.create(null)就访问不到原型链(个人理解)

## git merge 与 git rebase 的区别

- git merge <branch> 合并指定分支到当前分支
- git rebase <basebranch> <topicbranch> 即提取在<topicbranch>上的补丁和修改，然后在<basebranch>的基础上应用一次。
- git merge 在大项目中分支比较多会比较杂乱
- git rebase 合并后会在同一条链上比较清晰

## Http1.0/Http1.1/Http2.0 这三个版本的主要区别

- HTTP1.0 每建立一次 TCP 连接，只提供一次 request 请求和 response 请求，一次请求结束后，自动断开 TCP 连接,弊端：连接无法复用，每次请求都要经历三次握手和慢启动
- 支持持续长连接(Response Headers 头中出现 Connection:keep-alive)，添加了请求流水线串行化单线程处理可以同时在一个 TCP 连接上发送多个请求，但是只有响应是有顺序的，只有上一个请求完成后，下一个才能响应，并且后续任务仍然受到头部阻塞的影响
- 采用多路复用，大幅度提升了 web 心梗，在与 HTTP/1.1 语义完全兼容的基础上，进一步减少了网络延迟和传输的安全性，支持明文传输，消息头压缩，二进制分帧 xxxxx
- WebSocket 是 HTML5 中的协议，本质上是基于 TCP,先通过 HTTP/HTTPS 协议发起一条特殊 HTTP 请求进行握手后创建一个用于交换数据的 TCP 连接，也是支持长连接的.WebSocket 是由 HTTP 先发起的，然后在转为 WebSocket。当然在 HTML5 规范下还有 SSE（Server-Sent Events，服务器推送事件）这种方式比长轮询（Long Polling)更高效，需要使用 EventSource 对象。

## anmation 动画用什么会影响性能

- layout 相关的属性，则会触发重新布局，导致渲染和绘制所需要的时间将会更长,避免 width, height, margin, padding, border, display, top, right, bottom ,left, position, float, overflow
- transform(其中的 translate, rotate, scale), color, background 等
- transform: translate3d(0, 0, 0);开 GPU 加速

## 如何修改远端分支名字

- git branch -m 原分支名 现分支名

## 如何查看端口被占用

- lsof -i linux(我谢谢那个面试官)

# 蚂蚁金服 3.22

## 堆内存与栈内存

- 栈内存主要用于存储各种基本类型的变量 ,线性排列的空间,小单元大小基本相等
- 堆内存主要存储各种引用类型
- 栈算简单存储,(数据大小已知)会自动释放, 堆算复杂存储(数据大小未知),不会自动释放
- null 虽然是引用数据类型但是大小是空 所以存在栈中

  ![区别](../assets/dui.png)

> 区别

- 栈优点:存取速度比较快
- 缺点:必须确定生存周期, 什么时候进去与释放
- 堆优点:创建对象是为了反复使用

## 栈溢出 和堆溢出

- 栈溢出 递归,出现一条长长的链
- 堆溢出 循环 new 对象

## flex 布局中 flex:1 和 flex:auto 的区别

- flex 是 flex-grow、flex-shrink、flex-basis , 默认值是 0 1 auto
  > 列 2 1 0% , 2 1 auto witdh:100px, 1 1 200px
  > flex-grow 是 5 份 , 2/5,2/5,1/5 ,实际占用宽度是 0 100px 200px = 300px ,当父元素 600px 子元素就是 0+120px,120px+100px,
  > 60px + 200px
- auto 就是拿取 item 的宽度
- 在 flex:1 时在尺寸不足时会优先最小化尺寸，flex:auto 在尺寸不足时优先最大化内容尺寸。

## 柯里化

- 就是闭包

```js
// 普通的add函数
function add(x, y) {
  return x + y
}

// Currying后
function curryingAdd(x) {
  return function (y) {
    return x + y
  }
}

add(1, 2) // 3
curryingAdd(1)(2) // 3
```

- 1.好处参数复用

```jsx
// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
  return reg.test(txt)
}

check(/\d+/g, 'test') //false
check(/[a-z]+/g, 'test') //true

// Currying后
function curryingCheck(reg) {
  return function (txt) {
    return reg.test(txt)
  }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1') // true
hasNumber('testtest') // false
hasLetter('21212') // false
```

- 2. 提前确认
- 3. 延迟运行 bind 实现原理

## 继承的实现方式(后续补充)

## git 回滚
* 不过这种覆盖是不可逆的，之前的提交记录都没有了。所以平时开发中尽量注意，避免使用reset。
* reset 回滚 revert还原
```js
git reset --hard HEAD^ 回退到上个版本
git reset --hard HEAD~3 回退到前3次提交之前，以此类推，回退到n次提交之前
git reset --hard commit_id 退到/进到，指定commit的哈希码（这次提交之前或之后的提交都会回滚）
git revert //用法同上
```
* reset会舍弃原来的分支,revert不会舍弃原来的提交记录，而是生成了一次新的提交。