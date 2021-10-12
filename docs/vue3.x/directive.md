<!--
 * @Author: lcz
 * @Date: 2021-06-11 17:27:18
 * @LastEditTime: 2021-10-12 17:23:25
 * @LastEditors: Please set LastEditors
 * @Description: vue3.x 指令封装
 * @FilePath: \lcz_document\docs\vue3.x\directive.md
-->
# 常用指令
全局注册
```js
  import focus from '@directive/focus' //聚焦
  import placeholderBlock from '@directive/placeholderBlock' //占位符
  const event = {
    focus,
  }
  const directiveHandler = {
    install(app) {
      Object.keys(event).forEach((key) => app.use(event[key]))
    },
  }
  export default directiveHandler

  main.js
  import directiveAll from '@directive'
  app.use(directiveAll)
```

## 元素外点击操作
```js
export default (app) => {
  app.directive('outside', {
    mounted(el,binding) {
      function clickHandler(e) {
        if (el.contains(e.target)) {
          return false
        }
        // 判断是否绑定了函数
        if (typeof binding.value === "function") {
          binding.value(e)
        }
      }
      document.addEventListener('click', clickHandler)
    },
    unmounted(el) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueClickOutside__)
    },
  })
}

```

## 拷贝copy
```js
import { Toast } from 'vant'
export default (app) => {
  app.directive('copy', {
    mounted(el, { value }) {
      el.$value = value
      el.handler = () => {
        if (!el.$value) {
          // 值为空的时候，给出提示。可根据项目UI仔细设计
          Toast.fail('无复制内容')
          return
        }
        // 动态创建 textarea 标签
        const textarea = document.createElement('textarea')
        // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
        textarea.readOnly = 'readonly'
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        // 将要 copy 的值赋给 textarea 标签的 value 属性
        textarea.value = el.$value
        // 将 textarea 插入到 body 中
        document.body.appendChild(textarea)
        // 选中值并复制
        textarea.select()
        const result = document.execCommand('Copy')
        if (result) {
          Toast.success('复制成功')
        }
        document.body.removeChild(textarea)
      }
      // 绑定点击事件，就是所谓的一键 copy 啦
      el.addEventListener('click', el.handler)
    },
    updated(el, { value }) {
      el.$value = value
    },
    unmounted(el) {
      el.removeEventListener('click', el.handler)
    },
  })
}

```

## 输入限制
```js
export default (app) => {
  app.directive('enterNumber', {
    beforeMount(el, binding, vnode) {
      //直接使用input输入
      let input = vnode.el
      // 使用指令输入
      // let input = vnode.elm.children[0]
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
          newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
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
    },
  })
}

```

## 检测图片是否加载成功
```js
  let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image()
    img.onload = function () {
      if (this.complete == true) {
        // console.log('资源加载');
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      // console.log('资源error', img);
      resolve(false)
      img = null
    }
    img.src = url
  })
}

export default (app) => {
  app.directive('errImg', {
    async beforeMount(el, binding) {
      let imgURL = el.src
      let defaultURL = binding.value
      if (imgURL) {
        let exist = await imageIsExist(imgURL)
        if (!exist) {
          el.setAttribute('src', defaultURL)
        } else {
          el.setAttribute('src', imgURL)
        }
      } else {
        el.setAttribute('src', defaultURL)
      }
    },
  })
}
```

## 聚焦
```js
  export default (app) => {
  app.directive('focus', {
    mounted(el, { value }) {
      el.$value = value
      if (typeof el.$value == 'boolean' && el.$value) {
        el.focus()
      }
    },
    updated(el, { value }) {
      el.$value = value
      if (typeof el.$value == 'boolean' && el.$value) {
        el.focus()
      }else{
        el.blur();
      }
    },
  })
}
```

## 图片懒加载
```js
import common from '@/componentApi/commConfig' //拿取默认展示图片
let timer = null // 创建一个监听器
let observer = new IntersectionObserver((entries) => {
  // entries是所有被监听对象的集合
  entries.forEach((entry) => {
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      // 当被监听元素到临界值且未加载图片时触发。
      !entry.target.isLoaded && showImage(entry.target, entry.target.data_src)
    }
  })
})
function showImage(el, imgSrc) {
  const img = new Image()
  img.src = imgSrc
  img.onload = () => {
    el.src = imgSrc
    el.isLoaded = true
  }
}
export default (app) => {
  app.directive('lazyImg', {
    beforeMount(el, binding) {
      clearTimeout(timer) // 初始化时展示默认图片
      let { defaultImg } = common()
      el.src = defaultImg // 将需要加载的图片地址绑定在dom上
      el.data_src = binding.value
      observer.observe(el)
    },
    updated(el, binding) {
      el.isLoaded = false
      el.data_src = binding.value
    },
    beforeUnmount(_, __, ___) {
      timer = setTimeout(() => {
        console.log(2131)
        // vm.$on('hook:beforeDestroy', () => {
        observer.disconnect()
        // })
      }, 20)
    },
  })
}
```

## 块占用 
```js
  function randomString(e) {
  e = e || 27
  var t = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM',
    a = t.length,
    n = ''
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

/**
 * @description: 随机生成展位颜色
 * @param {*}
 * @return {*} 0~255
 */
function colorNumber() {
  return Math.floor(Math.random() * 255)
}

export default (app) => {
  app.directive('placeholderBlock', {
    beforeMount(el, { value }) {
      const TYPE = String(value).indexOf('x') > -1 ? 'block' : 'text'
      switch (TYPE) {
        case 'block':
          let [width, height] = value.split('x')
          el.style.width = width + 'px'
          el.style.height = height + 'px'
          el.style.background = `rgb(${colorNumber()},${colorNumber()},${colorNumber()})`
          break
        case 'text':
          let text = randomString(value)
          el.innerHTML = text
          break
        default:
          console.log('default')
      }
    },
  })
}

```