<!--
 * @Author: your name
 * @Date: 2021-03-12 10:07:21
 * @LastEditTime: 2022-04-12 09:42:01
 * @LastEditors: lcz
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\wx.md
-->

## 坑 1.文件大小

文件总体大小要在 2MB 以下
图片要放在第三方静态服务器上（建议），或者转成 base64（文件太大打开卡）

## 坑 2.微信授权登录

```js
  改版以后不能直接授权，需要引导用户点击授权

  1. 进入页面需要判断用户是否授权
  onLoad() {
    var _this = this;
    uni.getSetting({
      success(res) {
        console.log(res,22)
        if (!res.authSetting['scope.userInfo']) {
          _this.isAuth = false;
          console.log("当前未授权");
        }else{
          _this.isAuth = true;
          console.log("当前授权");
        }
      }
    })
  }

  2.以按钮的形式引导授权
  <button  class="buttonSubmit padding0" open-type="getUserInfo" @getuserinfo="formSubmit" >登录</button>

  3.如果已授权可以拿到用户名头像等
  formSubmit(e){
      var _this = this;
      if (!this.isAuth) {
        _this.getUserInfo.username = e.detail.userInfo.nickName; //用户名
        _this.getUserInfo.avatarUrl = e.detail.userInfo.avatarUrl; //头像
        _this.isAuth = true;
        _this.toLogin()
      } else {
        this.toLogin()
      }
    },

  4.登录 拿到code 微信授权登录 -》内部接口登录

  //授权登录提交
			toLogin(){
				var _this = this;
				if (this.temp.account == '') {
					return uni.showToast({
						title: '请输入账号',
						duration: 2000,
						icon: "none"
					})
				}
				if (this.temp.password == '') {
					return uni.showToast({
						title: '请输入登录密码',
						duration: 2000,
						icon: "none"
					})
				}
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						//js_code可以给后台获取unionID或openID作为用户标识
						_this.getUserInfo.js_code = loginRes.code;
						console.log(_this.getUserInfo.js_code, 222)
						_this.login();
					},
					fail(res) {

					}
				})
			},

  5.内部接口实现最终登录
  async login() {
    const res = await this.$requestApi({
      url: '/Corp/WXLogin',
      method: 'POST',
      data: {
        account: this.temp.account,
        pwd: this.temp.password,
        code: this.getUserInfo.js_code,
        headImg: this.getUserInfo.avatarUrl,
        nickName: this.getUserInfo.username
      }
    })
    uni.setStorage({
      key: 'token',
      data: res.data.response,
      success: function() {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  }

```

## 坑 3.微信支付

```js
    //微信小程序支付 provider, timeStamp, nonceStr, packages, signType, paySign,success,fail
		wxPay({ commit },res){
			return new Promise((resolve, reject) => {
				let pay_info = JSON.parse(res.data.pay_info)
				var _this = this;
				uni.requestPayment({
					provider:'wxpay',
					timeStamp:pay_info.timeStamp,
					nonceStr:pay_info.nonceStr,
					package: pay_info.package,
					signType:pay_info.signType,
					paySign:pay_info.paySign,
					success(res) {
						resolve(res);
					},
					fail(err) {
						reject(err)
						console.log('微信支付失败:'+err)
					}
				});
			})
		},
```

## 手机号登录 授权头像与名称

> 项目来自墨菲国际

```vue
<template>
  <wechat-browser>
    <!-- #ifdef MP-WEIXIN -->
    <u-navbar
      title="手机登录"
      :background="background"
      :title-color="'#FFFFFF'"
      :back-icon-color="'#FFFFFF'"
    ></u-navbar>
    <!-- #endif -->
    <view class="main allCenter">
      <image :src="`${oss}/userLogo.png`" mode="aspectFill" class="loginLogo"></image>
      <view class="padd">
        <u-form :model="form" ref="uForm" :error-type="['message']" label-width="200">
          <u-form-item prop="phone" label="手机号码">
            <u-input v-model="form.phone" type="number" placeholder="请输入手机号码" />
          </u-form-item>
          <u-form-item prop="code" label="验证码：">
            <u-input v-model="form.code" placeholder="请输入验证码" />
            <u-button slot="right" size="mini" @click="getCode">{{ codeTips }}</u-button>
          </u-form-item>
        </u-form>
        <!-- open-type="getUserInfo" @getuserinfo="formSubmit" -->
        <button type="default" class="recommenderBtn bgColor" @click="formSubmit">确定</button>
      </view>
      <u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
    </view>
  </wechat-browser>
</template>

<script>
import common from '@/mixin/common.js'
export default {
  mixins: [common],
  data() {
    return {
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            // 可以单个或者同时写两个触发验证方式
            trigger: ['change', 'blur'],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // this.$u.test.mobile()就是返回true或者false的
              return this.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur'],
          },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            // 可以单个或者同时写两个触发验证方式
            trigger: ['change', 'blur'],
          },
          {
            min: 4,
            message: '验证码不能小于4位数',
            trigger: 'change',
          },
        ],
      },
      form: {
        phone: '',
        code: '',
      },
      codeTips: '',
      invitationCode: '',
    }
  },
  methods: {
    // e
    formSubmit() {
      // let { nickName , avatarUrl , gender } = e.detail.userInfo
      let _this = this
      // console.log(nickName , avatarUrl , gender,22333)
      this.$refs.uForm.validate(valid => {
        if (valid) {
          console.log('验证通过')
          if (this.requestLocked) {
            return this.$u.toast('请勿重复提交')
          }
          this.requestLocked = true

          uni.getUserProfile({
            desc: '登录',
            success: ({ userInfo }) => {
              let { nickName, avatarUrl, gender } = userInfo

              uni.login({
                provider: 'weixin',
                success(loginRes) {
                  //js_code可以给后台获取unionID或openID作为用户标识
                  let data = {
                    nickName,
                    avatarUrl,
                    gender,
                    wxAuthCode: loginRes.code,
                    phone: _this.form.phone,
                    phoneCode: _this.form.code,
                  }
                  if (_this.invitationCode) {
                    data.invite_code = _this.invitationCode
                  }
                  // console.log(data,22)
                  // loginRes.code
                  _this.$u
                    .post('/api/App/Member/WxPhoneLogin', data)
                    .then(res => {
                      const { Token } = res.response
                      _this.$store.dispatch('setToken', Token).then(() => {
                        _this.requestLocked = false
                        uni.setStorage({
                          key: 'token',
                          data: Token,
                          success: function () {
                            uni.switchTab({
                              url: '/pages/index/home',
                            })
                          },
                        })
                      })
                    })
                    .catch(err => {
                      _this.requestLocked = false
                      _this.$u.toast(err.data.msg)
                      console.log(err)
                    })
                },
                fail(res) {
                  _this.requestLocked = false
                  console.log('授权失败:' + res)
                },
              })
            },
            fail: () => {
              _this.$u.toast('取消授权')
              _this.requestLocked = false
            },
          })
        } else {
          console.log('验证失败')
        }
      })
    },
    async getCode() {
      let { form } = this
      if (this.$refs.uCode.canGetCode) {
        if (!this.$u.test.mobile(form.phone)) {
          return this.$u.toast('请输入正确的手机号!')
        }
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码',
          mask: true,
        })
        const [err, res] = await this.$to(this.$u.get('/api/App/Sms/SendLoginSms', { phone: form.phone }))
        uni.hideLoading()
        if (err) {
          return this.$u.toast(err)
        }
        this.$u.toast('验证码已发送')
        // 通知验证码组件内部开始倒计时
        this.$refs.uCode.start()
      } else {
        this.$u.toast('倒计时结束后再发送')
      }
    },
    codeChange(text) {
      this.codeTips = text
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  onLoad(e) {
    if (e.scene) this.invitationCode = e.scene
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: calc(100vh - 88rpx - var(--status-bar-height));
  background: url($oss + '/userBg.png') no-repeat;
  background-size: 100%;
  position: relative;
  .padd {
    padding: 0 50rpx;
    box-sizing: border-box;
  }
  .loginLogo {
    width: 285rpx;
    height: 351rpx;
    vertical-align: middle;
    position: relative;
    top: -100rpx;
  }
  .recommenderBtn {
    @include submitRed(600rpx, #414942);
    margin: 100rpx auto 0;
  }
}
</style>
```

## 微信小程序 手机号与头像一起授权登录

> 项目来自:墨菲国际

```vue
<template>
  <wechat-browser>
    <view class="main allCenter">
      <image :src="`${oss}/userLogo.png`" mode="aspectFill" class="loginLogo"></image>
      <!-- #ifdef MP-WEIXIN -->
      <!-- <button  class="loginSubmit" open-type="getPhoneNumber" @getphonenumber="formSubmit" @click="getUserProfile()">微信授权登录</button> -->
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <button class="loginSubmit" @click="h5Login">微信授权登录</button>
      <!-- #endif -->
      <button class="loginSubmit" @click="goPhoneLogin">手机验证码登录</button>
      <view class="fixedBottom">
        <!-- <u-checkbox v-model="checked" shape="circle" size="24rpx" active-color="#000000"> -->
        <text class="item">登录即表明同意</text>
        <text class=" item xieyi" @click="toPage('../../user/pages/user/agreement')">《用户协议》</text>
        <text class="item">和</text>
        <text class="item xieyi" @click="toPage('../../user/pages/user/privacy')">《隐私政策》</text>
        <!-- </u-checkbox> -->
      </view>
    </view>
  </wechat-browser>
</template>

<script>
import common from '@/mixin/common.js'
import configs from '@/common/config.js'
export default {
  data() {
    return {
      checked: false,
      invitationCode: '',
      loginInfo: {
        encryptedData: '',
        iv: '',
        loginCode: '',
      },
      userInfo: {},
    }
  },
  mixins: [common],
  methods: {
    //去手机登录
    goPhoneLogin() {
      this.toPage(`./phoneLogin?scene=${this.invitationCode}`)
    },
    //H5 授权登录
    h5Login() {
      let { checked } = this
      let { appid, redirect_uri } = configs
      if (!checked) {
        return this.errMessage('请同意用户协议！')
      }
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=login&connect_redirect=1#wechat_redirect`
    },

    //获取绑定手机需要的params
    formSubmit(e) {
      let _this = this
      // // 不允许授权
      if (e.detail.errMsg !== 'getPhoneNumber:ok') {
        return
      }
      let { encryptedData, iv } = e.detail
      _this.loginInfo.encryptedData = encryptedData
      _this.loginInfo.iv = iv
      _this.login()
    },
    //获取用户信息
    getUserProfile() {
      let _this = this
      uni.getUserProfile({
        desc: '登录',
        success: ({ userInfo }) => {
          // let { nickName , avatarUrl , gender } = userInfo
          _this.userInfo = userInfo
          _this.login()
        },
        fail: () => {
          _this.$u.toast('取消授权')
        },
      })
    },
    //正式登录
    login() {
      let _this = this
      let { nickName, avatarUrl, gender } = _this.userInfo
      let { loginCode, encryptedData, iv } = this.loginInfo
      console.log(nickName, loginCode, encryptedData, iv, '232323222111')
      if (!nickName || !loginCode || !encryptedData || !iv) {
        return false
      }
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      //js_code可以给后台获取unionID或openID作为用户标识
      let data = {
        nickName,
        avatarUrl,
        gender,
        wxAuthCode: loginCode,
        encryptedData,
        iv,
      }
      if (_this.invitationCode) {
        data.invite_code = _this.invitationCode
      }
      // console.log(data,22)
      // loginRes.code
      _this.$u
        .post('/api/App/Member/WxMiniLogin', data)
        .then(res => {
          uni.hideLoading()
          const { Token } = res.response
          _this.$store.dispatch('setToken', Token).then(() => {
            uni.setStorage({
              key: 'token',
              data: Token,
              success: function () {
                uni.switchTab({
                  url: '/pages/index/home',
                })
              },
            })
          })
        })
        .catch(err => {
          uni.hideLoading()
          this.$u.toast(err.data.msg)
          console.log(err)
        })
    },
  },
  onLoad(e) {
    if (e.scene) this.invitationCode = e.scene
    let _this = this
    uni.login({
      provider: 'weixin',
      success(loginRes) {
        _this.loginInfo.loginCode = loginRes.code
        // console.log(_this.loginInfo.loginCode,22222)
      },
      fail(res) {
        console.log('授权失败:' + res)
      },
    })
  },
}
</script>

<style lang="scss" scoped>
@import 'uview-ui/index.scss';
.main {
  width: 100vw;
  height: 100vh;
  background: url($oss + '/userBg.png') no-repeat;
  background-size: 100%;
  position: relative;
  .loginLogo {
    width: 380rpx;
    height: 468rpx;
    vertical-align: middle;
    position: relative;
    top: -100rpx;
  }
  .loginSubmit {
    width: 552rpx;
    @include fh(32rpx, 44rpx);
    font-weight: 500;
    color: #ffffff;
    padding: 28rpx;
    box-sizing: border-box;
    background: url($oss + '/user/userBtn2.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 34rpx;
  }
  .fixedBottom {
    position: absolute;
    bottom: 150rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 552rpx;
    // #ifdef MP-WEIXIN
    /deep/ .uicon-checkbox-mark {
      top: -6rpx !important;
    }
    // #endif
    .item {
      @include fh(20rpx, 28rpx);
      color: #000000;
      position: relative;
      top: -4rpx;
    }
    .xieyi {
      color: #2c85c9;
    }
  }
}
</style>
```

## 封装省市区三级联动
> 每个联动选择后请求数据

```vue
  <template>
	<uni-popup ref="popup" type="bottom">
		<view class="popup">
			<view class="picker-btn">
				<view class="left" @click="cancel">取消</view>
				<view class="right" @click="confirm">确定</view>
			</view>
			<picker-view :indicator-style="indicatorStyle" :value="valueArr" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in province" :key="index">{{item.Name}}</view>
				</picker-view-column>
				<picker-view-column v-if="province[valueArr[0]]">
					<view class="item" v-for="(item,index) in province[valueArr[0]].children" :key="index">{{item.Name}}</view>
				</picker-view-column>
				<picker-view-column v-if="province[valueArr[0]]">
					<view class="item" v-for="(item,index) in province[valueArr[0]].children[valueArr[1]].children" :key="index">{{item.Name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		data(){
			return {
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				valueArr: [0, 0, 0], // 用于判断当前滑动的是哪一列
				province: [], // 数据列表
			}
		},
		methods:{
			//区请求
			async initLoadArea() {
				const [err , res] = await this.$to(
					this.$u.get('/api/App/Home/GetRegionList',{parent_code:0})
				)
				if(err){ return this.$u.toast(err) }
				this.province = res.response;
				this.loadCity(this.province[0].Code)
			},
			//市
			async loadCity(parentId) {
				const [err , res] = await this.$to(
					this.$u.get('/api/App/Home/GetRegionList',{parent_code: parentId})
				)
				if(err){ return this.$u.toast(err) }
				if (this.province[this.valueArr[0]].children === undefined) {
					this.$set(this.province[this.valueArr[0]], 'children', [])
					res.response.forEach(item => {
						this.province[this.valueArr[0]].children.push(item)
					})
					this.loadArea(this.province[this.valueArr[0]].children[this.valueArr[1]].Code)
				}
			},
			//加载区
			async loadArea(parentId) {
				const params = {
					parent_id: parentId
				}
				const [err , res] = await this.$to(
					this.$u.get('/api/App/Home/GetRegionList',{parent_code: parentId})
				)
				if(err){ return this.$u.toast(err) }
				// this.area = res.data;
				if (this.province[this.valueArr[0]].children[this.valueArr[1]].children === undefined) {
					this.$set(this.province[this.valueArr[0]].children[this.valueArr[1]], 'children', [])
					res.response.forEach(item => {
						this.province[this.valueArr[0]].children[this.valueArr[1]].children.push(item)
					})
				}
			},
			//知道滑动的是哪块
			bindChange(e) {
				console.log(e,222)
				const val = e.detail.value;
				if (this.valueArr[0] !== val[0]) {
					this.loadCity(this.province[val[0]].Code)
				} else if (this.valueArr[1] !== val[1]) {
					this.loadArea(this.province[val[0]].children[val[1]].Code)
				}
				this.valueArr = val
			},
			open(){
				this.$refs.popup.open();
			},
			cancel() {
				this.$refs.popup.close();
			},
			confirm(){
				let {valueArr , province} = this;
				let provinces = province[valueArr[0]]
				let city = provinces.children[valueArr[1]]
				let area = city.children[valueArr[2]]
				this.$emit('result',{provinces,city,area})
				this.cancel();
			},
		},
		mounted(){
			this.initLoadArea();
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		height: fit-content;
		width: 100%;
		background: #fff;
	}
	
	.picker-btn {
		display: flex;
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		background: #fff;
		font-size: 34upx;
		z-index: 1;
		border-bottom: 1rpx solid #f8f8f8;
	
		.left {
			flex: 1;
			color: #0076FF;
			padding-left: 40upx;
			box-sizing: border-box;
		}
	
		.right {
			flex: 1;
			text-align: right;
			padding-right: 40upx;
			color: #FE4533;
			box-sizing: border-box;
		}
	}
	
	picker-view {
		width: 100%;
		height: 500rpx;
		display: relative;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
	}
</style>

```

## 图片裁剪框
pictureTailor.vue 组件
```vue
<template>
	<view class="picture-tailor" :class="{'picture-tailor-show':isShow}">
		<movable-area class="picture-area">
			<movable-view class="picture-view" :style="{width:img_width/img_scaling+'px',height:img_height/img_scaling+'px'}"
			 direction="all" :x="offsetX" :y="offsetY" scale="true" :scale-min="scaleMin" @change="movableChange" @scale="movableScale">
				<image :style="{width:img_width/img_scaling+'px',height:img_height/img_scaling+'px'}" :src="pictureSrc"></image>
			</movable-view>
		</movable-area>
		<view class="select-box"></view>
		<button class="button-view" @click="createImg">完成</button>
		<canvas canvas-id="picture-canvas" class="canvas-view" v-if="imgShow"></canvas>
	</view>
</template>

<script>
	let tailorSize = 240; // 需要截取的尺寸240x240px，此变量要和样式中的240px和120px相对应，120px为此变量的一半，若要修改成其他值一定要一一对应
	let newOffsetX = 0; // 拖动缩放完成后的X轴偏移量
	let newOffsetY = 0; // 拖动缩放完成后的Y轴偏移量

	export default {
		name: "picture-tailor",
		props: {
			// 图片路径
			pictureSrc: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				offsetX: 0, // 图像初始化的X轴偏移量
				offsetY: 0, // 图像初始化的Y轴偏移量
				img_width: 0, // 图片真实宽度
				img_height: 0, // 图片真实高度
				img_scaling: 1, //图片初始化缩放比例
				scale: 1, // 拖动缩放完成后的图片缩放比例
				scaleMin: 0.5, // 最小缩放值
				isShow: false,
				imgShow:true
			};
		},
		watch: {
			pictureSrc() {
				this.getImgInfo();
			},
			isShow() {
				console.log(this.isShow, 1122)
			}
		},
		methods: {
			// 显示组件
			show() {
				this.isShow = true;
			},
			// 隐藏组件
			hide() {
				this.isShow = false;
			},
			// 初始化图片
			getImgInfo() {
				uni.getImageInfo({
					src: this.pictureSrc,
					success: (res) => {
						// 图片宽高
						this.img_width = res.width;
						this.img_height = res.height;
						// 屏幕可用宽高
						let sysInfo = uni.getSystemInfoSync();
						let windowWidth = sysInfo.windowWidth;
						let windowHeight = sysInfo.windowHeight;

						// 计算初始缩放比和最小缩放值
						if (this.img_width < tailorSize || this.img_height < tailorSize) { // 当图片宽或高小于240px时
							let count = this.img_width <= this.img_height ? this.img_width : this.img_height;
							this.img_scaling = count / tailorSize;
							this.scaleMin = 1;
						} else if (this.img_width > windowWidth && this.img_width <= this.img_height) { // 当图片宽度大于屏幕宽度并且图片宽度小于图片高度时
							this.img_scaling = this.img_width / windowWidth;
							this.scaleMin = tailorSize / windowWidth;
						} else {
							let count = this.img_width <= this.img_height ? this.img_width : this.img_height;
							this.scaleMin = tailorSize / count;
						}

						// 计算图片居中显示时的偏移量
						this.offsetX = -(this.img_width / this.img_scaling / 2 - tailorSize / 2);
						this.offsetY = -(this.img_height / this.img_scaling / 2 - tailorSize / 2);
						// 获取新的偏移量
						newOffsetX = this.offsetX;
						newOffsetY = this.offsetY;
					}
				})
			},
			// 计算拖动偏移量
			movableChange(e) {
				newOffsetX = e.detail.x
				newOffsetY = e.detail.y
			},
			// 计算缩放比例和偏移量
			movableScale(e) {
				newOffsetX = e.detail.x
				newOffsetY = e.detail.y
				this.scale = e.detail.scale;
			},
			// 截取图片
			createImg() {
				var _this = this;
				let ctx = uni.createCanvasContext("picture-canvas", _this);
				ctx.drawImage(this.pictureSrc, newOffsetX, newOffsetY, this.img_width /
					this.img_scaling * this.scale,
					this.img_height / this.img_scaling * this.scale);
					ctx.draw(false, () => {
						setTimeout(() => {
							uni.canvasToTempFilePath({
								// 截取图片尺寸
								destWidth: tailorSize / 2,
								destHeight: tailorSize / 2,
								canvasId: "picture-canvas",
								success: (res) => {
									console.log(res.tempFilePath)
									// this.imgShow = false;
									this.hide();
									this.$emit("createImg", res.tempFilePath)
									// setTimeout(()=>{
									// 	this.imgShow = true;
									// },100)
								},
								fail: (err) => {
									console.log(err, 22)
								}
							},_this);
						}, 200)
					}, _this);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.picture-tailor {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		transform: translateX(100%);
		transition: all 200ms ease;
		visibility: hidden;
		z-index: 999;
	}

	.picture-tailor-show {
		transform: translateY(0) !important;
		visibility: visible;
	}

	/* 拖动域的位置和大小 */
	.picture-tailor .picture-area {
		width: 240px;
		height: 240px;
		position: absolute;
		/* 使其居中定位 */
		top: calc(50% - 120px);
		left: calc(50% - 120px);
	}

	/* 拖动控件的大小 */
	.picture-area .picture-view {
		min-width: 240px;
		min-height: 240px;
	}

	/* 中间选择框的大小，本意是视觉上模拟拖动域 */
	.select-box {
		position: absolute;
		top: calc(50% - 120px);
		left: calc(50% - 120px);
		width: 240px;
		height: 240px;
		box-sizing: border-box;
		// border-radius: 50%;
		border: #FFFFFF 1px solid;
		pointer-events: none;
	}

	.button-view {
		position: absolute;
		bottom: 20px;
		right: 20px;
		width: 60px;
		background-color: #007AFF;
		font-size: 14px;
		color: #FFFFFF;
	}

	/* 画布大小，画布大小就是截取的原始大小 */
	.canvas-view {
		width: 240px;
		height: 240px;
		visibility: hidden;
		position: relative;
		top:-9999999rpx;
		left:-999999rpx;
	}
</style>

```
use
```vue
<template>
<picture-tailor ref="pictureTailor" :pictureSrc="photoSrc" @createImg="createImg"></picture-tailor>
</template>
//createImg 上传图片获取临时地址的方法 createImg(e)
// _this.$refs.pictureTailor.show();
```

## 拍照截屏框内容
scan-frame.vue 页面文件
```vue
<template>
	<view>
		<camera :device-position="devicePosition" flash="auto" @error="error" style="width: 100%; height: 100vh;">
			<cover-view class="controls" style="width: 100%;height: 100%;">
				<cover-image src="../../static/back.png" class="scan-back" @click="navigateBack"
					:style="{'top':backTop}"></cover-image>
				<cover-image src="../../static/camera_module_front.png" class="scan-img"></cover-image>
				<cover-view class="btnCamera" @click="takePhoto">拍照</cover-view>
				<cover-view class="btnJt" @click="deviceUpdate">切换镜头</cover-view>
			</cover-view>
		</camera>

		<!-- <view class="scan-text">请将XXX放置白色框内</view> -->
		<!-- <button type="primary" @click="takePhoto">拍照</button> -->
		<!-- <image mode="widthFix" class="photos-box" :src="src"></image> -->
		<canvas canvas-id="picture-canvas" class="canvas-view"></canvas>
		<!-- <image :src="iii" mode="" style="width:400rpx;height: 400rpx;" v-if="iii"></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				iii: '',
				devicePosition: 'back',
				statusBarHeight: 0,
				isLock: false
			}
		},
		computed: {
			backTop({
				statusBarHeight
			}) {
				return statusBarHeight * 2 + 26 + 'rpx'
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack()
			},
			//切换镜头
			deviceUpdate() {
				const {
					devicePosition
				} = this;
				this.devicePosition = devicePosition == 'back' ? 'front' : 'back'
			},
			// 截取图片
			createImg() {
				var _this = this;
				let ctx = uni.createCanvasContext("picture-canvas", _this);
				const SystemInfo = uni.getSystemInfoSync()
				ctx.drawImage(this.src, 0, 0, SystemInfo.windowWidth, SystemInfo.windowHeight);

				ctx.draw(false, () => {
					uni.canvasToTempFilePath({
						// 截取图片尺寸
						x: SystemInfo.windowWidth / 2 - uni.upx2px(200),
						y: SystemInfo.windowHeight / 2 - uni.upx2px(200),
						width: uni.upx2px(400),
						height: uni.upx2px(400),
						canvasId: "picture-canvas",
						success: (res) => {
							console.log(res.tempFilePath)
							this.isLock = false
							this.$store.dispatch('savePhoto', res.tempFilePath).then(() => {
								this.navigateBack();
							})
							// this.iii = res.tempFilePath;
							// setTimeout(()=>{
							// 	this.imgShow = true;
							// },100)
						},
						fail: (err) => {
							this.isLock = false
							console.log(err, 22)
						}
					}, _this);
				}, _this);
			},
			takePhoto() {
				// this.camera = false;
				if (this.isLock) {
					return false
				}
				this.isLock = true
				setTimeout(() => {
					const ctx = uni.createCameraContext();
					ctx.takePhoto({
						quality: 'high',
						success: (res) => {
							this.src = res.tempImagePath
							this.createImg();
						},
						fail: () => {
							this.isLock = false
						}
					});
				}, 100)

			},
			error(e) {
				console.log(e.detail);
			}
		},
		onLoad() {
			let _this = this;
			wx.getSystemInfo({
				success: function(res) {
					_this.statusBarHeight = res.statusBarHeight; //这就是状态栏的高度
				},
			});
		}
	}
</script>

<style lang="scss" scoped>
	.scan-back {
		width: 20rpx;
		height: 36rpx;
		position: absolute;
		left: 30rpx;
	}

	.btnJt {
		position: absolute;
		left: 30rpx;
		bottom: 40rpx;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		background-color: #007AFF;
		font-size: 14px;
		color: #FFFFFF;
		border-radius: 16rpx;
	}

	.scan-img {
		opacity: 0.4;
		width: 400rpx;
		height: 400rpx;

	}

	.btnCamera {
		position: absolute;
		right: 30rpx;
		bottom: 40rpx;
		padding: 20rpx 40rpx;
		box-sizing: border-box;
		background-color: #007AFF;
		font-size: 14px;
		color: #FFFFFF;
		border-radius: 16rpx;
	}

	.controls {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.scan-text {
		font-size: 20px;
		text-align: center;
		line-height: 60upx;
	}

	.canvas-view {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: -9999rpx;
		left: -99999rxp;
	}
</style>

```