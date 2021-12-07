<!--
 * @Author: your name
 * @Date: 2021-12-03 11:07:53
 * @LastEditTime: 2021-12-03 11:33:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\study\vue3.md
-->
## teleport 传送门实现
基本是实现模态框弹出效果                            
/public/index.html 文件下设置锚点来防止文件内容
```html
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    //先行定义一个锚点
    <div id="modal"></div>
    <!-- built files will be auto injected -->
  </body>
```
定义子组件 设置为Modal.vue
```vue
<template>
  <teleport to="#modal">
      <div id="center" v-if="isOpen">
          <h2><slot>this is a modal</slot></h2>
          <button class="btn2" @click="buttonClick">Close</button>
      </div>
    </teleport>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    //父组件的数据需要通过props把数据传给子组件，props的取值可以是数组也可以是对象
    props: {
        isOpen: Boolean,
    },
    //子组件向父组件传递数据
    //使用emits，更明确的显示组件的自定义事件有哪些
    emits: {
        'close-modal': null
    },
    //props对应props的内容
    //context名字可以自定义，只要上下对应即可，用来触发emit的内容
    setup(props, context){
        const buttonClick = () => {
            context.emit('close-modal')
        }
        return{
            buttonClick
        }
    }
})
</script>

<style>
#center{
    width:200px;
    height:200px;
    border:2px solid rgb(105, 165, 56);
    text-align: center;
    border-radius: 2px;
    margin: 50px auto 0;
}
.btn2{
  background: #1971c9;
  border:none;
  padding: 8px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
</style>
```
父组件定义
```vue
<template>
    <button class="btn1" @click="openModal">打开模态框</button>
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose">
      My Modal!!!
    </modal>
</template>

<script lang="ts">
import { ref, defineComponent} from 'vue'
import Modal from './components/Modal.vue'

export default defineComponent({
  name: 'App',
  components: {
    Modal
  },
  setup(){
    //添加响应式对象控制是否显示
    const modalIsOpen = ref(false)
    //打开模态框事件
    const openModal = () => {
      modalIsOpen.value = true
    }
    //关闭模态框事件
    const onModalClose = () => {
      modalIsOpen.value = false
    }
   
    return{
      modalIsOpen,
      openModal,
      onModalClose
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d4c6b;
  margin-top: 60px;
}
.btn1{
  background: #1971c9;
  border:none;
  padding: 16px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
</style>
```

## Suspense发起多个异步请求(后期Api可能会改变)
用途是异步请求时 接口未相应展示Loading 效果
>注意:如果使用 Suspense ，要返回一个 promise 而不是一个对象。
子组件1
```vue
<template>
  <h1>{{result}}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    //使用Suspense需要返回一个对象
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          result: '10000'
        })
      }, 3000)
    })
  }
})
</script>
```
子组件2
```vue
<template>
  <img :src="result && result.message">
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
export default defineComponent({
  async setup() {
    const rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      result: rawData.data
    }
  }
})
</script>
```
父组件
```vue
<template>
  <div id="app">
    <Suspense>
      <template #default>
        <async-show />
        <dog-show />
      <template #fallback>
        <h1>Loading !...</h1>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { onErrorCaptured } from 'vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'

export default {
  name: 'App',
  components: {
    AsyncShow,
    DogShow
  },
  setup() {
    //错误抓取
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
    return{
        error
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 6rem;
}
</style>
```
![展示效果](../assets/images/suspense.awebp)


# 以下不一定用到 （了解）
## shallowReactive 与 shallowRef
shallowReactive浅层次的响应式,它就是只把第一层的数据变为响应式，深层的数据不会变为响应式,shallowRef如果定义的是基本类型的数据，那么它和ref是一样的不会有什么改变，但是要是定义的是对象类型的数据，那么它就不会进行响应式，之前我们说过如果ref定义的是对象，那么它会自动调用reactive变为Proxy,但是要是用到的是shallowRef那么就不会调用reactive去进行响应式。
> shallowReactive：只处理对象最外层属性的响应式（浅响应式）。 
> shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
```js
let person = shallowReactive({
 name:'大理段氏',
 age:10,
 job:{
   salary:20
 }
})
let x = shallowRef({
 y:0
})
```

##  readonly 与 shallowReadonly
readonly是接收了一个响应式数据然后重新赋值，返回的数据就不允许修改（深层只读），shallowReadonly却只是浅层只读（第一层只读，其余层可以进行修改）
```js
  names=readonly(names)
  names=shallowReadonly(names)
```

## toRaw 与 markRaw
toRaw其实就是将一个由reactive生成的响应式对象转为普通对象。如果是ref定义的话，是没有效果的（包括ref定义的对象）如果在后续操作中对数据进行了添加的话，添加的数据为响应式数据，当然要是将数据进行markRaw操作后就不会变为响应式，可能大家会说，不就是和readonly一样吗？那肯定不一样咯，readonly是根本没办法改，但markRaw是不转化为响应式，但是数据还会发生改变。

```html
<template>
  <div class="home">
    <h1>当前姓名:{{names.name}}</h1>
    <h1>当前年龄:{{names.age}}</h1>
    <h1>当前薪水:{{names.job.salary}}K</h1>
    <h1 v-if="names.girlFriend">女朋友：{{names.girlFriend}}</h1>
    <button @click="names.name+='!'">点击加!</button>
    <button @click="addAges">点击加一</button>
    <button @click="addSalary">点击薪水加一</button>
    <button @click="add">添加女朋友</button>
    <button @click="addAge">添加女朋友年龄</button>
  </div>
</template>

<script>
import {reactive,toRaw,markRaw} from 'vue'
export default {
  name: 'Home',
  setup(){
    let names=reactive({
      name:'老伍',
      age:23,
      job:{
        salary:10
      }
    })
    function addAges(){
      names.age++
      console.log(names)
    }
    function addSalary(){
      let fullName=toRaw(names)
      fullName.job.salary++
      console.log(fullName)
    }
    function add(){
      let girlFriend={sex:'女',age:40}
      names.girlFriend=markRaw(girlFriend)
    }
    function addAge(){
      names.girlFriend.age++
      console.log(names.girlFriend.age)
    }
    return {
      names,
      add,
      addAge,
      addAges,
      addSalary
    }
  }
}
</script>

```

## 响应式判断
```js
import {ref, reactive,readonly,isRef,isReactive,isReadonly,isProxy } from 'vue'
export default {
  name:'App',
  setup(){
    let fullName = reactive({name:'小唐',price:'20k'})
    let num = ref(0)
    let fullNames = readonly(fullName)
    console.log(isRef(num))
    console.log(isReactive(fullName))
    console.log(isReadonly(fullNames))
    console.log(isProxy(fullName))
    console.log(isProxy(fullNames))
    console.log(isProxy(num))
    return {}
  }
}
```