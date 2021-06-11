<!--
 * @Author: your name
 * @Date: 2021-03-12 10:07:21
 * @LastEditTime: 2021-06-11 17:16:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\wx.md
-->
## 坑 1.文件大小
  文件总体大小要在2MB以下
  图片要放在第三方静态服务器上（建议），或者转成base64（文件太大打开卡）

## 坑 2.微信授权登录
```html
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
```html
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