<!--
 * @Author: your name
 * @Date: 2021-09-28 16:57:27
 * @LastEditTime: 2021-10-12 17:19:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\H5WX_JS_SDK.md
-->
文档参考地址
```html
https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
```
## 1.weixin-js-sdk 包安装

npm i weixin-js-sdk

## 2.vconsole H5 页面调试

npm i vconsole
main.js

```html
import Vconsole from "vconsole"; 
if (process.env.NODE_ENV === "development") { 
  const vConsole = new Vconsole(); 
}
```

## 3.路由守卫文件
```html
  /*
 * @Author: lcz
 * @Date: 2021-05-27 14:59:59
 * @LastEditTime: 2021-09-27 15:20:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3\src\permission.js
 */
import router from "@router";
const whiteList = ["/login"]; // 不重定向白名单
import { Toast } from "vant";
import store from "./store";
import { getCookie, setCookie, removeCookie } from "@/utils/auth";
import { getJSSDK } from "@/api/wx";
import { wexin } from "@/utils/wechat";
import { qrCodeExchange } from "@/api/user";

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  //存储积分码
  if (location.href.includes("codeNo")) {
    const codeNo = location.href.split("?")[1].split("=")[1];
    setCookie("codeNo", codeNo);
  }
  //是否登录
  if (getCookie("token")) {
    store
      .dispatch("common/setUserInfo")
      .then(res => {
        // 拉取用户信息
        next();
      })
      .catch(err => {
        store.dispatch("user/LayOut").then(() => {
          Toast.fail(err || "登录失效");
          setTimeout(() => {
            next({ path: "/login" });
          }, 2000);
        });
      });
    //获取微信配置信息
    if (!store.getters.wxConfig) {
      getJSSDK({ url: location.href.split("#")[0] }).then(res => {
        wexin(res.data);
      });
    }
    //存在积分条形码的code
    if (getCookie("codeNo")) {
      const codeNo = getCookie("codeNo");
      qrCodeExchange({ codeNo })
        .then(res => {
          if (res.code == 200) {
            Toast.success("积分兑换成功");
          }
          removeCookie("codeNo");
        })
        .catch(err => {
          Toast.fail("积分兑换失败");
          console.log("积分兑换失败:" + err);
        });
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

router.afterEach(() => {});
```

## 4.微信SDK文件封装
```html
  /*
 * @Author: lcz
 * @Date: 2021-09-26 15:42:58
 * @LastEditTime: 2021-09-28 17:09:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \aoteman\src\utils\wechatPay.js
 */
import wx from "weixin-js-sdk";
import store from "@/store";
import { Toast } from "vant";

//微信config
export function wexin(data) {
  return new Promise((resolve, reject) => {
    //后台传入数据
    let { appId, timestamp, nonceStr, signature } = data;
    //验证微信环境
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ["chooseWXPay", "scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      store.dispatch("user/WxConfig", true);
      resolve();
    });
    wx.error(function (res) {
      store.dispatch("user/WxConfig", false);
      reject({
        configFail: res
      });
      // config信息验证失败会执行error函数
    });
  });
}

//微信支付
export function wexinPay(data) {
  return new Promise((resolve, reject) => {
    let { timestamp, nonceStr, paySign, signType } = data;
    wx.ready(function () {
      if (!store.getters.wxConfig) {
        Toast.fail("微信config获取失败:请刷新页面");
        reject({
          payFail: "微信config获取失败:请刷新页面"
        });
      } else {
        wx.chooseWXPay({
          timestamp: timestamp, //支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, //支付签名随机串，不长于32位
          package: data.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: signType, //签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, //支付签名
          success: function (res) {
            resolve(res);
          },
          fail: function (res) {
            //失败回调函数
            reject({
              payFail: res
            });
          }
        });
      }
    });
  });
}

//微信扫一扫
export function wexinScan() {
  return new Promise((resolve, reject) => {
    wx.ready(function () {
      if (!store.getters.wxConfig) {
        Toast.fail("微信config获取失败:请刷新页面");
        reject({
          payFail: "微信config获取失败:请刷新页面"
        });
      } else {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            resolve(res.resultStr);
          }
        });
      }
    });
  });
}

```

## 5.vant list componentApi封装(可优化)

```html
import { reactive, toRefs } from "vue";

export default function (api) {
  //列表数据
  let state = reactive({
    list: [],
    loading: false,
    finished: false,
    requestList: {
      PageIndex: 1,
      PageSize: 10
    }
  });
  //列表加载方法
  const onLoad = () => {
    const { requestList } = state;
    api({ ...requestList })
      .then(res => {
        const { data, totalCount } = res.data;
        state.list = [...state.list, ...data];
        state.loading = false;
        state.requestList.PageIndex += 1;
        if (state.list.length >= totalCount) {
          state.finished = true;
        }
      })
      .catch(err => {
        console.log("列表获取失败:" + err);
      });
  };
  return {
    ...toRefs(state),
    onLoad
  };
}

```

## 6.滑动内置浏览器上下部分白边
```html
<template>
  <div class="scroll">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    //禁止浏览器内部下拉穿透白色  .vue 需要设置min-height:110vh;
    let overscroll = function (el) {
      el.addEventListener("touchstart", function () {
        let top = el.scrollTop,
          totalScroll = el.scrollHeight,
          currentScroll = top + el.offsetHeight;
        //If we're at the top or the bottom of the containers
        //scroll, push up or down one pixel.
        //
        //this prevents the scroll from "passing through" to
        //the body.
        if (top === 0) {
          el.scrollTop = 1;
        } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1;
        }
      });
      el.addEventListener("touchmove", function (evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if (el.offsetHeight < el.scrollHeight) {
          evt._isScroller = true;
        }
      });
    };
    overscroll(document.querySelector(".scroll"));
    document.body.addEventListener("touchmove", function (evt) {
      //In this case, the default behavior is scrolling the body, which
      //would result in an overflow.  Since we don't want that, we preventDefault.
      if (!evt._isScroller) {
        evt.preventDefault();
      }
    });
  }
};
</script>
<style lang="scss">
.scroll {
  position: absolute;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
```

## 域名回调的坑 本地可以 发布后不行。。
本人使用的是Node.env.回调域名 ->字符串形式，跳转会被转义，导致回调域名匹配不成功
- - -
${process.env.VUE_APP_RETURN_URL} 不可为字符串
```js
  location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_APPID}&redirect_uri=${process.env.VUE_APP_RETURN_URL}&response_type=code&scope=snsapi_userinfo&state=login&connect_redirect=1#wechat_redirect`;
```