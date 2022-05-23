<!--
 * @Description:
 * @Autor: lcz
 * @Date: 2022-05-23 11:19:11
 * @LastEditors: lcz
 * @LastEditTime: 2022-05-23 11:22:20
-->

## 晶体数字

```vue
<template>
  <view class="digit-wrapper" :class="{ default: !value }">
    <i class="segment-1" :class="{ select: showBlock(1) }"></i>
    <i class="segment-2" :class="{ select: showBlock(2) }"></i>
    <i class="segment-3" :class="{ select: showBlock(3) }"></i>
    <i class="segment-4" :class="{ select: showBlock(4) }"></i>
    <i class="segment-5" :class="{ select: showBlock(5) }"></i>
    <i class="segment-6" :class="{ select: showBlock(6) }"></i>
    <i class="segment-7" :class="{ select: showBlock(7) }"></i>
  </view>
</template>
<script>
export default {
  name: 'unidreamLED',
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
  },
  computed: {
    blockArr({ value }) {
      if (value) {
        //key 代表数字 value代表要展示的块
        const number = {
          0: [1, 2, 3, 4, 5, 6],
          1: [2, 3],
          2: [1, 2, 4, 5, 7],
          3: [1, 2, 3, 4, 7],
          4: [2, 3, 6, 7],
          5: [1, 3, 4, 6, 7],
          6: [3, 4, 5, 6, 7],
          7: [1, 2, 3],
          8: [1, 2, 3, 4, 5, 6, 7, 8],
          9: [1, 2, 3, 6, 7],
        }
        return number[value]
      } else {
        return []
      }
    },
    showBlock({ blockArr }) {
      return index => {
        return blockArr.includes(index)
      }
    },
  },
  data() {
    return {}
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.digit-wrapper {
  height: 104rpx;
  width: 78rpx;
  margin: 0px 5rpx;
  position: relative;
  [class*='segment-'] {
    width: 39rpx;
    height: 13rpx;
    background: rgba(157, 97, 251, 0.3);
    color: rgba(157, 97, 251, 0.3);
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    &::before {
      content: '';
      height: 0px;
      width: 0px;
      border-width: 6.5rpx;
      border-style: solid;
      border-right-color: initial;
      border-left-color: rgba(0, 0, 0, 0);
      border-top-color: rgba(0, 0, 0, 0);
      border-bottom-color: rgba(0, 0, 0, 0);
      display: block;
      left: -12rpx;
      position: absolute;
    }
    &::after {
      content: '';
      height: 0px;
      width: 0px;
      border-width: 6.5rpx;
      border-style: solid;
      border-left-color: initial;
      border-right-color: rgba(0, 0, 0, 0);
      border-top-color: rgba(0, 0, 0, 0);
      border-bottom-color: rgba(0, 0, 0, 0);
      display: block;
      right: -12rpx;
      position: absolute;
    }
  }
  .segment-1 {
    transform: translateZ(0px) translateX(-50%);
    margin-left: 50%;
  }
  .segment-2 {
    transform: translateZ(0px) translateX(25%) translateY(175%) rotate(90deg);
    left: auto;
    right: 0px;
    top: 4rpx;
  }
  .segment-3 {
    transform: translateZ(0px) translateX(25%) translateY(525%) rotate(90deg);
    left: auto;
    right: 0px;
    top: 12rpx;
  }
  .segment-4 {
    transform: translateZ(0px) translateX(-50%);
    margin-left: 50%;
    bottom: -8rpx;
    top: auto;
  }
  .segment-5 {
    transform: translateZ(0px) translateX(-25%) translateY(525%) rotate(90deg);
    left: 0px;
    top: 12rpx;
  }
  .segment-6 {
    transform: translateZ(0px) translateX(-25%) translateY(175%) rotate(90deg);
    left: 0px;
    top: 4rpx;
  }
  .segment-7 {
    transform: translateZ(0px) translateX(-50%) translateY(-50%);
    margin-left: 50%;
    top: calc(50% - -4rpx);
  }
  [class*='segment-'].select {
    background: rgba(157, 97, 251, 1);
    color: rgba(157, 97, 251, 1);
  }
}
.digit-wrapper.default {
  .segment-7 {
    background: rgba(157, 97, 251, 1);
    color: rgba(157, 97, 251, 1);
  }
}
</style>
```
