<!--
 * @Description: 
 * @Autor: lcz
 * @Date: 2022-06-05 10:00:29
 * @LastEditors: lcz
 * @LastEditTime: 2022-06-05 10:01:48
-->
## scss for循环
```scss
@for $i from 1 to 15 {
  .font-#{$i * 2 + 10} {
    font-size: (10rpx + 2rpx * $i);
  }
  .margin {
    &-top-#{$i * 2 + 2} {
      margin-top: (2rpx + 2rpx * $i);
    }
    &-bottom-#{$i * 2 + 2} {
      margin-bottom: (2rpx + 2rpx * $i);
    }
    &-left-#{$i * 2 + 2} {
      margin-left: (2rpx + 2rpx * $i);
    }
    &-right-#{$i * 2 + 2} {
      margin-right: (2rpx + 2rpx * $i);
    }
  }
}
```