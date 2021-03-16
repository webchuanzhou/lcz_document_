<!--
 * @Author: your name
 * @Date: 2021-03-16 11:33:35
 * @LastEditTime: 2021-03-16 11:34:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\optimization\vue.md
-->
## Vue 性能优化
computed 里面的函数是可以接收一个 this 参数的 这样就不会在组件刷新时重复获取 getter 了，以前从来没注意过这些。
```html
  computed: {
    a () { return 1 },
    b ({ a }) {
        return a + 10
    }
  }
```