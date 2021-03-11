<!--
 * @Author: lcz
 * @Date: 2021-03-11 15:53:41
 * @LastEditTime: 2021-03-11 16:25:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\directive.md
-->
# 基本常用指令
## 元素外点击关闭元素
```html
//新建clickOutside.js
export const clickOutside = {
    // 初始化指令
    bind(el, binding, vnode) {
		function clickHandler(e) {
			// 这里判断点击的元素是否是本身，是本身，则返回
			if (el.contains(e.target)) {
				return false;
			}
			// 判断指令中是否绑定了函数
			if (binding.expression) {
			// 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
				binding.value(e);
			}
		}
		// 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
		el.__vueClickOutside__ = clickHandler;
		document.addEventListener('click', clickHandler);
    },
    update() {},
    unbind(el, binding) {
		// 解除事件监听
		document.removeEventListener('click', el.__vueClickOutside__);
		delete el.__vueClickOutside__;
    },
};
### 使用方式:
import {clickOutside} from '@/directive/clickOutside';
directives:{clickOutside},
<el v-click-outside="func"></el>
```
## 限制输入小数位数
```html
//新建enterNumber.js
  export default Vue => {
  Vue.directive('enterNumber', {
    bind(el, binding, vnode) {
      let input = vnode.elm.children[0]
      // 解決中文输入法导致v-model无法同步的情况发生 keydown
      input.addEventListener('compositionstart', () => {
        vnode.inputLocking = true
      })
      input.addEventListener('compositionend', () => {
        vnode.inputLocking = false
        // 通知v-model更新 输入结束通知更新
        input.dispatchEvent(new Event('input'))
      })
      input.addEventListener('input', () => {
        if (vnode.inputLocking) {
          return
        }
        let oldValue = input.value
        let newValue = input.value
        if (binding.value == '0') {
          newValue = newValue.replace(/[^\d]/g, '')
        }
        if (binding.value == '2') {
          //先把非数字的都替换掉，除了数字和.
          newValue = newValue.replace(/[^\d.]/g, '')
          //必须保证第一个为数字而不是.
          newValue = newValue.replace(/^\./g, '')
          //保证.只出现一次，而不能出现两次以上
          newValue = newValue
            .replace('.', '$#$')
            .replace(/\./g, '')
            .replace('$#$', '.')
          newValue = newValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        }
        // newValue = newValue.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
        if (newValue) {
          let arr = newValue.split('.')
          newValue = Number(arr[0]) + (arr[1] === undefined ? '' : '.' + arr[1]) // 去掉开头多余的0
        }
        // 判断是否需要更新，避免进入死循环
        if (newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input')) // 通知v-model更新
        }
      })
      // input 事件无法处理小数点后面全是零的情况 因为无法确定用户输入的0是否真的应该清除，如3.02。放在blur中去处理
      input.addEventListener('blur', () => {
        let oldValue = input.value
        let newValue = input.value
        if (newValue) {
          newValue = Number(newValue).toString()
        }
        // 判断是否需要更新，避免进入死循环
        if (newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input')) // 通知v-model更新
        }
      })
    }
  })
}

//全局 引入使用
import enterNumber from '@/directive/enterNumber'
Vue.use(enterNumber)

使用方式
<!-- 'num' 表示小数位数 0表示为整数 -->
<el v-enter-number='num'><el/>

```

## 图片加载失败展示默认图片
```html
<!-- 新建errImg.js -->
let imageIsExist = function (url) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function () {
            if (this.complete == true) {
                // console.log('资源加载');
                resolve(true);
                img = null;
            }
        }
        img.onerror = function () {
            // console.log('资源error', img);
            resolve(false);
            img = null;
        }
        img.src = url;
    })
};

export default (Vue) => {
    Vue.directive('errImg', 
        async function (el, binding) {
            //获取图片地址
            let imgURL = el.src;
            let defaultURL = binding.value;
            if (imgURL) {
                let exist = await imageIsExist(imgURL);
                if (!exist) {
                    el.setAttribute('src', defaultURL);
                }else{
                    el.setAttribute('src', imgURL);
                }
            }else{
                el.setAttribute('src', defaultURL);
            }
        },
    );
}

//全局 引入使用
import errImg from '@/directive/errImg'
Vue.use(errImg)

使用方式
<!-- defaultLogo 默认图片路径 -->
<el v-err-img="defaultLogo"><el/>
```

## 动态绑定新值与老值对比添加状态

```html
<!-- 新建立 oldNumber.js -->
  export default (Vue)=>{
    Vue.directive('oldNumber', {
        bind:function (el,binding) {
            //绑定参数
            el.innerHTML = binding.value
        },
        inserted: function (el,binding) {
            //插入
            el.innerHTML = binding.value
        },
        update: function (el,binding) {
            //更新参数
            el.dataset.oldNum = binding.oldValue
            el.innerHTML = binding.value
            let status = ''
            if( Number(binding.oldValue) < Number(binding.value)){
                status = 'rise'
            }else if(Number(binding.oldValue) > Number(binding.value)){
                status = 'down'
            }else{
                status = 'noUpdate'
            }
            el.dataset.class = status
        },
        
    });
}

绑定方式同上
import oldNumber from '@/directive/oldNumber' //data上动态添加旧值
Vue.use(oldNumber)
使用方式
<!-- val 新值 老值自动记录 -->
<el v-old-number="val"><el/>
```

## 滚动加载
```html
  <!-- zInfiniteScroll.js -->
  export default (Vue)=>{
    Vue.directive('zInfiniteScroll', { 
        bind(el, binding) {
            let target = el;
            if (el.getAttribute('data-scrollTarget')) {
                target = el.querySelector(el.getAttribute('data-scrollTarget'));
            }
            target.addEventListener('scroll', e => {
                const busy = el.getAttribute('data-infiniteScrollDisabled') ? false : true;
                const distance = el.getAttribute('data-infiniteScrollDistance')
                    ? Number.parseInt(el.getAttribute('data-infiniteScrollDistance'), 10)
                    : 100;
                if (!busy && e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < distance) {
                    el.setAttribute('data-infiniteScrollDisabled', true);
                    binding.value(e);
                }
            });
        }
    })
}
 <!-- zInfiniteScrollDisabled.js -->
 export default (Vue)=>{
    Vue.directive('zInfiniteScrollDisabled', { 
        bind(el, binding) {
            el.setAttribute('data-infiniteScrollDisabled', binding.value);
        },
        update(el, binding) {
            el.setAttribute('data-infiniteScrollDisabled', binding.value);
        },
    })
}
 <!-- zInfiniteScrollDistance.js -->
 export default (Vue)=>{
    Vue.directive('zInfiniteScrollDistance', { 
        bind(el, binding) {
            el.setAttribute('data-infiniteScrollDistance', binding.value);
        },
        update(el, binding) {
            el.setAttribute('data-infiniteScrollDistance', binding.value);
        },
    })
}
import zInfiniteScroll from '@/directive/InfiniteScroll/zInfiniteScroll' //滚动加载
import zInfiniteScrollDisabled from '@/directive/InfiniteScroll/zInfiniteScrollDisabled' //加载禁用
import zInfiniteScrollDistance from '@/directive/InfiniteScroll/zInfiniteScrollDistance' //滚动底部距离
Vue.use(zInfiniteScroll)
Vue.use(zInfiniteScrollDisabled)
Vue.use(zInfiniteScrollDistance)
使用方式
<!-- scroll 函数 disabled 禁止加载 distance 加载个数-->
<el v-z-infinite-scroll="getList"
    v-z-infinite-scroll-disabled="listLoading || dataCount <= list.length"
    v-z-infinite-scroll-distance="10"
><el/>
<!-- getList函数中包含判断来阻断更新 -->
if(this.listLoading || this.dataCount <= this.list.length){
    return false;
}
<!-- css样式要固定高度 -->
.listBox{
    height: calc(50vh - 110px);
    position: relative;
    max-height: calc(50vh - 110px);
    overflow-y: scroll;
    &::-webkit-scrollbar{
        width:1px;
    }
    &::-webkit-scrollbar-track{
        background: #1D2442;
        border-radius:1px;
    }
    &::-webkit-scrollbar-thumb{
        background: #E6B04D;
        border-radius:3px;
    }
}
```

## loading指令
```html
  <!-- loading文件夹
    -index.js
    -loading.vue
  -->
  index.js
  import Vue from 'vue'
  import Loading from './loading.vue'

  const Mask = Vue.extend(Loading)
  const toggleLoading = (el, binding) => {
      if (binding.value) {
          Vue.nextTick(() => {
              // 控制loading组件显示
              el.instance.visible = true
              // 插入到目标元素
              insertDom(el, el, binding)
          })
      } else {
          el.instance.visible = false
      }
  }
    
  const insertDom = (parent, el) => {
      parent.appendChild(el.mask)
  }
    
  export default {
      bind: function (el, binding, vnode) {
          const mask = new Mask({
              el: document.createElement('div'),
              data () {}
          })
          el.instance = mask
          el.mask = mask.$el
          el.maskStyle = {}
          binding.value && toggleLoading(el, binding)
      },
      update: function (el, binding) {
          if (binding.oldValue !== binding.value) {
              toggleLoading(el, binding)
          }
      },
      unbind: function (el, binding) {
          el.instance && el.instance.$destroy()
      }
  }

  loading.vue

<template>
    <div v-show="visible" class="load">
        <div class="loading-box">
            <div class="loading"></div>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "zloading",
        data() {
            return {
                visible: false
            }
        }
    }
</script>
<style scoped lang="scss">
    .load{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        z-index: 2000;
        background:rgba(0, 0, 0, .28);
        .loading-box {
            position: absolute;
            left: 50%;
            top: 40%;
            height: 60px;
            width: 60px;
            margin-left: -30px;
            z-index: 2000;
            .loading{
                display: inline-block;
                height: 30px;
                width: 30px;
                border-radius: 50%;
                border: 4px solid #ffffff;
                border-bottom-color: transparent;
                -webkit-animation: loading 0.75s linear infinite;
                animation: loading 0.75s linear infinite;
                // 位置相关
                margin: 6px;
                vertical-align: middle;
            }
            @-webkit-keyframes loading {
                0% { -webkit-transform: rotate(0deg); }
                50% { -webkit-transform: rotate(180deg); }
                100% { -webkit-transform: rotate(360deg); }
            }
            @keyframes loading {
                0% { -webkit-transform: rotate(0deg); }
                50% { -webkit-transform: rotate(180deg); }
                100% { -webkit-transform: rotate(360deg); }
            }
        }
    }
</style>

<!-- 引入注册指令 -->
import Loading from '@/directive/loading/index.js'
export default {
	install (Vue) {
		Vue.directive('zloading', Loading)
	}
}

//注册全局指令
import zloading from '@/utils/loading' // loading 指令
Vue.use(zloading)

//使用
<el v-zloading="loading"></el>

```