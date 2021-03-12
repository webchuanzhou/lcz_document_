<!--
 * @Author: your name
 * @Date: 2021-03-12 10:14:12
 * @LastEditTime: 2021-03-12 11:38:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\app.md
-->
## 1. 兼容ios 和安卓高度不够问题
  App.vue 文件
```html
  onLaunch: function() {
    // #ifdef APP-PLUS
      plus.screen.lockOrientation("portrait-primary"); 
    // #endif
  }
```

## 2. 后台超过3分钟，退出登录操作
  App.vue 文件
```html

  import Vue from 'vue'
	var time = ''
  export default {
    onLaunch: function() {
      
    },
    onShow: function() {
		 	const threeTime = 180000  //3 分钟 ;
			//  const threeTime = 11111111111111  //3 分钟 ;
			if(+new Date() - time > threeTime){
				uni.removeStorage({
					key:'token',
					success(){
						uni.navigateTo({
							// url:'/pages/login/auth?type=time'
							url:'/pages/login/auth'
						})
					}
				})
			}
			// console.log('App Show',+new Date() - time)
		},
		onHide: function() {
			time = +new Date();
			// console.log('App Hide',time)
		}
  }
```

## 3. 配置全局的公共样式
  App.vue 文件

```html
  <style lang="scss">
	/*每个页面公共css */
	page{
		// background: #000000;
		background:url('static/start.png') no-repeat #000000;
		background-size: 100%;
		// position: relative;
		// z-index: -1;
		// background-size: cover;
		
	}
	
	// uni-tabbar {
	// 	.uni-tabbar { // tab背景
	// 		background-color: #000000!important; // tab背景色
	// 		background-image: linear-gradient(180deg, rgba(151, 16, 8, 0.53) 0%, rgba(151, 16, 8, 0) 100%);!important; // tab背景图片，也可以是渐变色，背景色和背景图片最多选择一个进行设置
	// 		.uni-tabbar-border { // tabBar上边框
	// 			background-color: transition!important; // tabBar上边框的颜色
	// 		}
	// 	}
	// }
</style>

```

## 4. 配置页面
pages.json
```html
  基础页面
  {
    "path": "pages/wallet/ImportPage", // 路径
    "style": {
      "navigationBarTitleText": "导入DAC钱包", //标题
      "app-plus": {
        "bounce": "none",  //页面回弹效果 none
        "titleNView": {
          "backgroundColor":"#000000",
          // "backgroundImage":"/static/tabbar/top.png",
          "backButton":{
            "color":"#F6514F"
          }
        }
      }
    }
  },
  
  自定义图标页面
  {
    "path": "pages/pool/pool",
    "style": {
      "navigationBarTitleText": "能量池",
      "app-plus": {
        "bounce": "none",  //页面回弹效果 none
        "titleNView": {
          "backgroundColor":"#000000",
          // "backgroundImage":"/static/tabbar/top.png",
          "backButton":{
            "color":"#F6514F"
          },
          "buttons": [{
            "text": "\ue7af",
            "fontSrc": "/static/uni.ttf",
            "fontSize": "22px",
            "color": "#D33224"
          }]
        }
      }
    }
  },
```

## 5. 语言包配置
```html
  App端可以兼容第三方语言包

  npm i vue-i18n 安装依赖
  
  文件结构目录

```
![Image text](https://gitee.com/webchuanzhou/lcz_document/raw/master/docs/assets/app/lan1.png)
i18n.js
```html
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
let i18nLocal = 'zh'
try {
    const value = uni.getStorageSync('language');
    if (value) {
        i18nLocal = value
    }
} catch (e) {
    // error
}
const i18n = new VueI18n({
    locale:  i18nLocal, 
	silentFallbackWarn:true,
    messages
})
Vue.prototype._i18n = i18n;
Vue.prototype.$i18nMsg = function(){  
    return i18n.messages[i18n.locale]  
}  
export default i18n

```
main.js 中注入
```
import i18n from './i18n/i18n';
const app = new Vue({
	i18n,
	store,
    ...App
})
```
页面中使用需要在mixin中混入

```html
  computed: {
		i18n() {
			return this.$i18nMsg()
		}
	},

  //修改tabbar
  uni.setTabBarItem({
    index: 0,
    text: this.i18n['376'],
  })
```

## 6. 二维码生成坑
部分组件引入生成二维码 ios 可行 安卓不可行  
最终觉得引入第三方SDK包
参考根目录下的 applugin->ercode
```html
  import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'

  async make() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.address,
					size: 140,
					margin: 5,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H
				  }).then(res => {
					  console.log(res)
				  })
			}

```

## 7. ios 安卓 发布参考文档
香蕉云 安卓证书生成
yunedit.com/update/androidzhengshu/list

ios tf上架
https://blog.csdn.net/qtb58/article/details/105163258


发布
https://appstoreconnect.apple.com/


ios构建版本加急
https://developer.apple.com/contact/app-store/?topic=expedite

安卓包加固
https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fms%2Findex

安卓包加固后签名APP
http://www.jisuxz.com/down/66524.html

## 8. 强制App 竖屏
App.vue
```html
  onLaunch: function() {
			// 竖屏 
			// #ifdef APP-PLUS
				plus.screen.lockOrientation("portrait-primary"); 
				setTimeout(() => {
					plus.navigator.closeSplashscreen();
				}, 2400);
			// #endif
			console.log('onLaunch')
			this.AdminParams();
		},
```

## 9. 版本更新 强制更新与确认更新
App.vue
```html
  //是否有版本更新
			VersionUpdate(){
				if(process.env.NODE_ENV == 'production'){
					//安卓Ios 版本号
					var version = plus.runtime.version;
					//判断平台跟版本号
					if(uni.getSystemInfoSync().platform == 'android' && this.userKeyGetObj("Android_Version") && version != this.userKeyGetObj("Android_Version")['value']){
						//是否需要强制更新
						var url = encodeURI(this.userKeyGetObj("Android_UpdateFile")['value'])
						if(this.userKeyGetObj("Android_IsForceUpdate")['value'] == '1'){
							plus.runtime.openURL(url,function(res){
							})
							// this.doUpData(url);
						}else if(this.userKeyGetObj("Android_IsForceUpdate")['value'] == '0'){
							uni.showModal({
								title: "发现新版本",
								content: "确认下载更新",
								success: (res) => {
									if (res.confirm == true) {//当用户确定更新，执行更新
										plus.runtime.openURL(url,(error)=>{
											console.log(error)
										})
										// this.doUpData(url);
									}
								}
							})
						}
					}else if(uni.getSystemInfoSync().platform == 'ios' && this.userKeyGetObj("IOS_Version") && version != this.userKeyGetObj("IOS_Version")['value']){
						var url = encodeURI(this.userKeyGetObj("IOS_UpdateFile")['value'])
						if(this.userKeyGetObj("IOS_IsForceUpdate")['value'] == '1'){
							plus.runtime.openURL(url,function(res){
							})
							// this.doUpData(url);
						}else if(this.userKeyGetObj("IOS_IsForceUpdate")['value'] == '0'){
							uni.showModal({
								title: "发现新版本",
								content: "确认下载更新",
								success: (res) => {
									if (res.confirm == true) {//当用户确定更新，执行更新
										plus.runtime.openURL(url,function(res){
										})
										// this.doUpData(url);
									}
								}
							})
						}
					}
				}
			},

  //直接下载远程包更新
			doUpData(url) {
			    uni.showLoading({
			        title: '更新中……'
			    })
			    uni.downloadFile({//执行下载
			        url: url, //下载地址
			        success: downloadResult => {//下载成功
			            uni.hideLoading();
			            if (downloadResult.statusCode == 200) {
			                uni.showModal({
			                    title: '',
			                    content: '更新成功，确定现在重启吗？',
			                    confirmText: '重启',
			                    confirmColor: '#EE8F57',
			                    success: function(res) {
			                        if (res.confirm == true) {
			                            plus.runtime.install(//安装
			                                downloadResult.tempFilePath, {
			                                    force: true
			                                },
			                                function(res) {
			                                    utils.showToast('更新成功，重启中');
			                                    plus.runtime.restart();
			                                }
			                            );
			                        }
			                    }
			                });
			            }
			        }
			    });
			}
```

## 10. 启动页 图片或视频配置
需要manifest.json中 App模块配置中开启视频播放功能
```html
  <template>
	<view class="main" :style="{height:QHeight+'px'}">
		<!-- <image class="image" src="/static/start2.png" mode="" :style="{height:QHeight+'px'}"></image> -->
		<!-- <image src="../../static/logo.png" mode="logo" class="logo"></image> -->
		<!-- muted="true"  -->
		<video 
			class="image" 
			autoplay="true" 
			src="../../static/animation.mp4" 
			show-center-play-btn="false" 
			:style="[{height:QHeight+'px'}]"
			controls="false" 
			enable-progress-gesture="false" 
			show-play-btn="false" 
			id="myVideo" 
			object-fit="fill"
		></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: 9,
				QHeight: 0,
			}
		},
		methods: {
			//定时任务
			Qtime(timeS) {
				let timeStart = setInterval(() => {
					timeS--;
					if (timeS == 0) {
						clearInterval(timeStart);
						uni.getStorage({
							key: 'accountList',
							success: (res) => {
								uni.navigateTo({
									url: '/pages/login/auth'
								})
							},
							fail: (res) => {
								uni.reLaunch({
									url: '/pages/wallet/createWallet'
								})
							}
						})
					}
				}, 1000)
			}
		},
		onReady() {
			// var videoContext = uni.createVideoContext('myVideo',this);
			// videoContext.requestFullScreen();
		},
		onLoad() {
			//获取可用窗口高度
			uni.getSystemInfo({
				success: (res) => {
					//视频的高
					let height = res.windowHeight - uni.upx2px(0);
					this.QHeight = height;
				}
			})
			this.Qtime(this.time)
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		position: relative;

		.image {
			width: 100%;
		}

		// #myVideo /deep/ .uni-video-video{
		// 	object-fit: fill !important;
		// }
	}
</style>

```

## 11.视频坑
```html
 ios与安卓中视频用的是原生Video ,是属于顶级标签，无论如何修改z-index 都无效
 如果遇到弹框组件
 弹出组件先摧毁视频，关闭组件在重置视频文件才行

 如何在顶级Video 加图片 与 文字  需要参考文档
 实现方式不一
 <video 
    :src="videoSrc" 
    class="imageVideo" 
    enable-progress-gesture="false" 
    show-play-btn="false" 
    autoplay="true"   
    show-center-play-btn="false" 
    muted="true"  
    controls="false"
    id="videoWallet"
    @pause="startVideo"
    @ended="startVideo"
  >
    <cover-image class="controls-play img xingzuoCenter" :src="xzImg"></cover-image>
  </video>
  <!-- 主动开启视频方法 -->
  startVideo(){
    this.videoContext.play();
  }

  onReady() {
			this.videoContext = uni.createVideoContext('videoWallet')
			setTimeout(()=>{
				this.noShan = true
			},1000)
  },
```

## 12. aes + rsa  请求加密
npm i encryptlong  安装依赖
参考根目录下的 applugin->aesrsa
使用如下
```html
import {aesAddEncrypt} from '@/config/aesEncryption.js'
//包裹需要加密的参数
aesAddEncrypt(options.data)
```

## 13.海报分享
辗转反侧 本来想要html2canvas 但是兼容性不好，最终决定使用canvas合成，但是必需要是2张图 需要ui配合，如果需要写入文案什么的比较懒麻烦，最终还是1张图与二维码的合成实现
```html
  2个html标签
  1个展示在页面中
  <view style="height:936rpx;width:100%;margin-bottom:60rpx;">
    <canvas style="height: 100%;width: 100%;backgroundColor: #000000" canvas-id="firstCanvas"></canvas>
  </view>
  1个隐藏在别的位置用于保存分享
  <view style="height:1362rpx;width:100%;margin-bottom:60rpx;position: absolute;left:-19999px;top:-19999px;">
    <canvas style="height: 100%;width: 100%;backgroundColor: #000000;" canvas-id="twoCanvas" ></canvas>
  </view>
  方法也写了2个方法，为啥不写一个，原因是 ios与安卓的坑，只生成一次的false，ios走了 安卓不走，
  还有业务的奇葩需求  展示的图跟分享的图是2个图片尺寸比列
  methods: {
			//复制
			copy(value) {
				var _this = this;
				uni.setClipboardData({
					data: value,
					success: function() {
						//复制成功
						uni.showToast({
							title: _this.i18n['364'],
							icon: 'none'
						});
					}
				});
			},
			save() {
				var _this = this;
				//分享小图1
				// uni.canvasToTempFilePath({
				// 	x: 0,
				// 	y: 0,
				// 	width: uni.upx2px(630),
				// 	height: uni.upx2px(936),
				// 	destWidth: uni.upx2px(630),
				// 	destHeight: uni.upx2px(936),
				// 	canvasId: 'firstCanvas',
				// 	success: function(res) {
				// 		uni.saveImageToPhotosAlbum({
				// 			filePath: res.tempFilePath,
				// 			success: function() {
				// 				//保存成功
				// 				uni.showToast({
				// 					icon: 'none',
				// 					title: _this.i18n['365']
				// 				})
				// 			}
				// 		});
				// 	},
				// 	fail(e) {
				// 		console.log(e);
				// 		//保存失败
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: _this.i18n['366']
				// 		})
				// 	}
				// });
				//分享长图
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: uni.upx2px(630),
					height: uni.upx2px(1362),
					destWidth: uni.upx2px(630),
					destHeight: uni.upx2px(1362),
					canvasId: 'twoCanvas',
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								//保存成功
								uni.showToast({
									icon: 'none',
									title: _this.i18n['365']
								})
							}
						});
					},
					fail(e) {
						console.log(e);
						//保存失败
						uni.showToast({
							icon: 'none',
							title: _this.i18n['366']
						})
					}
				});
			},
			qrR(path, type = '') {
				let that = this;
				let ctx = uni.createCanvasContext('firstCanvas',this);
				uni.getImageInfo({
					src: that.cover,
					success(res) {
						ctx.drawImage(res.path, 0, 0, uni.upx2px(630), uni.upx2px(936));
						ctx.fillStyle = '#FFFFFF';
						ctx.fillRect(uni.upx2px(205), uni.upx2px(680), uni.upx2px(220), uni.upx2px(220));
						ctx.drawImage(path, uni.upx2px(215), uni.upx2px(690), uni.upx2px(200), uni.upx2px(200));
						ctx.draw()
					}
				});
			},
			qrRdownLoad(path){
				let that = this;
				let ctx = uni.createCanvasContext('twoCanvas',this);
				uni.getImageInfo({
					src: that.cover2,
					success(res) {
						ctx.drawImage(res.path, 0, 0, uni.upx2px(630), uni.upx2px(1362));
						ctx.fillStyle = '#FFFFFF';
						ctx.fillRect(uni.upx2px(205), uni.upx2px(1000), uni.upx2px(220), uni.upx2px(220));
						ctx.drawImage(path, uni.upx2px(215), uni.upx2px(1010), uni.upx2px(200), uni.upx2px(200));
						ctx.draw()
					}
				});
			},
			async make() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.val,
					size: 100,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H
				}).then(res => {
					this.qrR(res)
					this.qrRdownLoad(res)
					// console.log(res)
					// console.log(222)
				})
			}
		},
  onLoad() {
			this.make();
		}
```