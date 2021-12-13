<!--
 * @Author: lcz
 * @Date: 2021-06-11 17:16:35
 * @LastEditTime: 2021-12-13 10:44:17
 * @LastEditors: Please set LastEditors
 * @Description: uni-app多端开发
 * @FilePath: \lcz_document\docs\project\uniMore.md
-->

## 16.//图片上传

可能会遇见的问题：安卓返回图片路径小写，ios 返回图片路径后缀大写，后端不兼容上传大小写报错

```js

  uni.chooseImage({
    count:1,
      success: (chooseImageRes) => {
          // 获取的格式是数组，多选会同时返回，单选只返回一项
          const tempFilePaths = chooseImageRes.tempFilePaths;
      console.log(chooseImageRes)
      uni.showLoading({
          title: '加载中'
      });
      this.$store.dispatch('upload',tempFilePaths).then(res=>{
        console.log(res,23131)
        uni.hideLoading();
        if(res.code !='0'){
          this.form.avatar = res.data.url;
          this.updateUserInfo();
        }
      })
      }
  });

	upload({ commit },tempFilePaths){
			return new Promise((resolve, reject) => {
				// 若多选，需循环调用uni.uploadFile ，因微信小程序只支持单文件上传
				// console.log(tempFilePaths[0],222)
				let file = tempFilePaths[0]
				// // #ifdef APP-PLUS
				// 	let suffix = file.substring(file.lastIndexOf(".")+1).toLowerCase();
				// 	let arr = file.split('.');
				// 	arr[arr.length-1] = '.' + suffix
				// 	file = arr.join('')
				// 	console.log(file)
				// // #endif
				uni.uploadFile({
				    url: configs.BASE_URL + '/image/upload', //仅为示例，非真实的接口地址
				    filePath: file,
				    name: 'file',
					header: {
						// 'Content-Type': 'multipart/form-data',
						Authorization: uni.getStorageSync('token'),
					},
				    // formData: {
				    //     'user': 'test'  // 上传附带参数
				    // },
				    success: (uploadFileRes) => {
				        // 根据接口具体返回格式   赋值具体对应url
						let data = JSON.parse(uploadFileRes.data);
						if(data.code =='0'){
							uni.showToast({
								title:data.message,
								icon:'none'
							})
						}
						resolve(data)
				    },
					fail:(e) => {
						reject(e)
					}
				});
			})
		},
```

## 左滑 右滑促发事件

```vue
<template>
  <view>
    <view class="left-side" @touchstart.stop="handleStart" @touchend.stop="handleEnd" v-if="leftDrag"></view>
    <view class="right-side" @touchstart.stop="handleStart" @touchend.stop="handleEnd" v-if="rightDrag"></view>
  </view>
</template>

<script>
export default {
  props: {
    leftDrag: {
      type: Boolean,
      default: true,
    },
    rightDrag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      startPosX: 0,
      direction: 'left',
      platform: uni.getSystemInfoSync().platform.toLowerCase(),
      windowWidth: uni.getSystemInfoSync().windowWidth,
    }
  },
  methods: {
    handleStart(e) {
      if (!e.touches) {
        return
      }
      this.startPosX = e.touches[0].clientX
      this.direction = this.startPosX > this.windowWidth / 2 ? 'right' : 'left'
      console.log('start')
    },
    handleEnd(e) {
      if (!e.changedTouches || !e.changedTouches[0]) {
        return
      }
      // let pages = getCurrentPages(),
      //     page = pages[pages.length - 1];
      // if (!page) {
      //     return;
      // }
      let x = e.changedTouches[0].clientX
      const offset = x - this.startPosX
      const canDrag = (this.direction == 'left' && offset >= 50) || (this.direction == 'right' && offset <= -50)
      if (canDrag) {
        this.startPosX = 0
        this.$emit('slider', this.direction)
        // uni.navigateBack();
      }
    },
  },
}
</script>

<style lang="scss">
@mixin pos {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 80rpx;
  opacity: 0.01;
  // opacity: 1;
  z-index: 10;
  // background:red;
}
.left-side {
  @include pos;
  left: 0;
}
.right-side {
  @include pos;
  right: 0;
}
</style>
```

> 使用

```html
<slider-page :left-drag="true" :right-drag="true" @slider="sliderMethod" />
```

```js
sliderMethod(position) {
	const firstId = this.tabList[0]?.Id ?? null;
	const lastId = this.tabList[this.tabList.length - 1]?.Id ?? null;
	if (position == 'left' && lastId && this.currentTab.Id == lastId) return;
	if (position == 'right' && firstId && this.currentTab.Id == firstId) return;
	const numberType = position == 'left' ? '1' : "-1";
	let obj = Object.assign({}, this.currentTab)
	const findIndex = this.tabList.findIndex((el,Index) => (el.Id == obj.Id))
	if (this.tabList[findIndex + Number(numberType)]) {
		this.currentTab = this.tabList[findIndex + Number(numberType)];
		this.clearData();
	}
}
```

## 验证码发送组件封装

```vue
<template>
  <div class="sendBox" :class="[{ disabled: isTimeout || dontcanclick }, { jb: jb }]">
    <!-- 秒 点击获取-->
    <span v-if="isTimeout" class="color2" :class="{ color: !jb }">{{ timeout }}秒</span>
    <span v-else @click="sendCode" class="color2" :class="{ color: !jb }">{{ name }}</span>
  </div>
</template>
<script>
import mixin from '@/mixin/common/common'

export default {
  name: 'send',
  mixins: [mixin],
  props: {
    //名字
    name: {
      type: String,
      default: '获取验证码',
    },
    //能否点击
    dontcanclick: {
      type: Boolean,
      default: false,
    },
    //手机号
    phone: {
      type: String,
      default: '',
    },
    //发生验证类型
    type: {
      type: String,
      default: '',
    },
    //请求地址api
    url: {
      type: String,
      default: '',
    },
    isTimeDown: {
      type: Boolean,
      default: false,
    },
    //是否渐变
    jb: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeout: 0,
      requestLocked: false,
    }
  },
  computed: {
    isTimeout: function () {
      return this.timeout > 0
    },
  },
  methods: {
    countDown: function () {
      var _this = this
      function tick() {
        _this.timeout--
        if (_this.timeout > 0) {
          setTimeout(tick, 1000)
        }
      }
      tick()
    },
    async sendCode() {
      // validate()
      if (this.requestLocked) {
        return uni.showToast({
          title: '请勿重复提交',
          duration: 2000,
          icon: 'none',
        })
      }
      if (this.phone == '') {
        return uni.showToast({
          title: '手机号不能为空',
          duration: 2000,
          icon: 'none',
        })
      }
      let data = {
        phone: this.phone,
      }
      this.requestLocked = true
      const [err, res] = await this.$to(
        this.$requestApi({
          url: this.url,
          method: 'get',
          data,
        })
      )
      this.requestLocked = false
      if (err) return
      this.timeout = 60
      this.countDown()
      //验证码发送成功
      uni.showToast({
        title: '验证码发送成功',
        duration: 2000,
        icon: 'none',
      })
    },
  },
  mounted() {
    if (this.isTimeDown) {
      this.timeout = 60
      this.countDown()
    }
  },
}
</script>
<style lang="scss">
.sendBox {
  text-align: center;
  width: 162rpx;
  position: absolute;
  right: 24rpx;
  display: inline-block;
  font-size: 24rpx;
  bottom: 26rpx;
  line-height: 34rpx;
  padding: 7rpx;
  box-sizing: border-box;
  @include bColorDeg(rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.9), 360deg);
  border-radius: 24rpx;
  .color {
    @include fColorDeg(rgba(39, 233, 247, 1), rgba(53, 80, 220, 1), 118deg);
  }
  .color2 {
    color: #ffffff !important;
  }
}
.sendBox.jb {
  @include bColorDeg(rgba(39, 233, 247, 1), rgba(53, 80, 220, 1), 136deg);
}
.sendBox.disabled {
  cursor: no-drop;
}
</style>
```

## 密码输入弹出框
```vue
<template>
	<view class="password-box">
		<!-- <view class="password-item" @tap="show"> -->
		<view class="password-item">
			<view class="password-item-char" v-for="i in items" :key="i">
				<view class="password-item-char__dot" v-if="password[i] || password[i] === 0"></view>
			</view>
		</view>
		<input type="number" class="inputHide" :style="{'font-size':platform=='ios'?'0rpx':'1rpx'}" v-model="passwords" maxlength="6">
	</view>
</template>

<script>
	export default {
		data(){
			return {
				items: [0, 1, 2, 3, 4, 5],
				passwords:'',
				password: [],
				platform: ''
			}
		},
		watch:{
			passwords(){
				this.password = this.passwords.split('');
			}
		},
		methods:{
			
		},
		mounted(){
			// #ifdef APP-NVUE
				this.platform = uni.getSystemInfoSync().platform
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.password-box {
		height: 90upx;
		text-align: center;
		box-sizing: border-box;
		position: relative;
		.inputHide{
			width: 500upx;
			position: absolute;
			height: 100%;
			left:0;
			top:0;
			z-index: 0;
			background:transparent;
			color:transparent;
			text-indent:-9999rpx;
		}
		.password-item {
			height: 100%;
			// border: 1px solid #6A7AB3;
			border: 1rpx solid rgba(39, 233, 247, 1);
			border-radius: 15upx;
			width: 500upx;
			margin: 0 auto;
			box-shadow: 0 0 3px rgba(39, 233, 247, .6);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			&-char {
				width: 16.66666666%;
				height: 90upx;
				// border-right: 1px solid rgba(107, 246, 201, .21);
				line-height: 90upx;
				text-align: center;
				position: relative;
				&::after{
					content: '';
					width: 2rpx;
					height: 62rpx;
					// @include bColor(rgba(107, 246, 201, .8),rgba(255, 190, 83, .8),159deg);
					background:rgba(39, 233, 247, 1);
					position: absolute;
					top:16rpx;
					right:0;
				}
				&:last-child::after{
					width: 0;
				}
				// &:last-child {
				// 	border-right: none;
				// }
				&__dot {
					height: 90upx;
					color:#333333;
					&:after {
						content: '●';
					}
				}
			}
		}
	}
</style>

```
> 使用
```html
<password ref="password1"/>
```