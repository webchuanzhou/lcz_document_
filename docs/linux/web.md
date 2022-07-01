<!--
 * @Description: 
 * @Autor: lcz
 * @Date: 2022-06-30 21:18:00
 * @LastEditors: lcz
 * @LastEditTime: 2022-07-01 09:55:27
-->
## 查看当前文件夹路径
* pwd

## mac前往ssh
cd ~/.ssh

## 去往根目录
* cd /

## pem文件存储在.ssh 目录下

## 文件上传到服务器

* scp -i  developer@dev.hz.bjdv.com.pem -P 56622 -r /Users/lichuanzhou/mrzhou/dtzl/dfjyAdmin/admin-ui/admin-ui  developer@dev.hz.bjdv.com:/data/miniapp

* -r 后面跟的是当前本地代码地址 
* developer@dev.hz.bjdv.com:/data/miniapp 服务器代码地址

## 文件删除
* 当前目录下 rm -fr admin-ui

## 目录下打成压缩包
* 当前目录下 tar -zcvf admin-ui.tar.gz admin-ui
* 上传到服务器
## 服务器上解压

* tar -zxvf admin-ui.tar.gz

## 服务器登陆方式
* ssh -i developer@dev.hz.bjdv.com.pem -p 56622 developer@dev.hz.bjdv.com