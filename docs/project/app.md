<!--
 * @Author: your name
 * @Date: 2021-03-12 10:14:12
 * @LastEditTime: 2021-03-12 10:53:11
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

  新建文件夹i18n
  ![Image text](../../assets/app/lan1.png)
```