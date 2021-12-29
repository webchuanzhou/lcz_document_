<!--
 * @Author: your name
 * @Date: 2021-12-29 10:06:49
 * @LastEditTime: 2021-12-29 16:38:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \lcz_document\docs\study\pano2vr.md
-->
# 基础版Demo 参考地址 http://120.27.230.230:8089/
>文件包在百度网盘

> 优点
1. 制造全景Vr效果快， 只要全景图+热点就能实现基础的换场景
2. 如需定制样式也快

> 缺点
1. 不能在同个场景种点击热点切换视角
2. 需要挂载到服务器上才能访问

## 720云 https://720yun.com/t/53vkblfes1w?scene_id=87154739#scene_id=87154739
> 普通版制作

> 市场上的应用（杭州购房通）小程序

> 优点
1. 有模板套用，只要全景图+热点就行，效率比上面的更快，有模板样式 不需自定义
2. 不需要挂载到服务器，挂在第三方网站（720云）上

> 缺点
1. 不能在同个场景种点击热点切换视角
2. 有小广告 和产品LOGO （除非买会员版）

### 以上2种方式均在uni-app 微信小程序，android 与 ios 上测试过（通过）

> 贝壳选房小程序 Vr的实现
> 贝壳的技术本质是定点VSLAM技术，严格意义上不属于VR的层面。
> VSLAM技术框架详述 (https://www.cnblogs.com/slamtec/p/9706557.html) (不是一般人学的，要学very very 久 不能速度成)