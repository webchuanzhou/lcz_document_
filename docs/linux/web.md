<!--
 * @Description: 
 * @Autor: lcz
 * @Date: 2022-06-30 21:18:00
 * @LastEditors: lcz
 * @LastEditTime: 2022-07-01 11:01:53
-->
# tar 压缩解压
> 必须选
* -c 压缩
* -x 解压
* -t 查看备份内容
> 辅选
* -z gzip 压缩或者解压
* -j bzip2 压缩或者解压
* -v 解压或者压缩过程
* -f 压缩解压后的名字
> xx 名称 xxx 目录
> tar -czvf xx xxx 压缩
> tar -xzvf xx 解压

# scp命令
* -i 从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。
* -P 是指定数据传输用到的端口号
* -r 递归复制整个文件

## 服务器登陆方式
* ssh -i developer@dev.hz.bjdv.com.pem -p 56622 developer@dev.hz.bjdv.com


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


