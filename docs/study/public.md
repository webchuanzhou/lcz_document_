<!--
 * @Author: lcz
 * @Date: 2021-06-16 22:58:29
 * @LastEditTime: 2021-07-01 11:17:14
 * @LastEditors: Please set LastEditors
 * @Description: 发布
 * @FilePath: /lcz_document/docs/study/public.md
-->
测试更新
# 准备
1.一台linux服务器

```html
  命令行：
  ls：查看目录
  cd  /xx :进入目录
  cd .. :返回上一页目录
```

## 1.链接linux 服务器
打开终端
```html
  ssh root@公网ip
  输入密码
```
## 2.安装docket
参考：https://www.cnblogs.com/renleiblog/p/13329935.html
```html
  ps：安装不成功的话去除sudo 
  //安装所需的包
  sudo yum install -y yum-utils device-mapper-persistent-data lvm2
  //添加阿里yum源，速度飞快
  sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  //安装最新版本的Docker CE（社区版）
  //按两次Y确认
  sudo yum install docker-ce
  //设置开机启动
  sudo systemctl enable docker
  //启动Docker
  systemctl start docker
  //查看版本
  docker -v
```

## 3.ftp配置
参考：https://www.cnblogs.com/MC-zhouyongli/p/13760949.html

通过把文件传到ftp中的/home目录下
```
  1.运行以下命令安装 vsftpd。

  yum install -y vsftpd

  2.运行以下命令打开及查看etc/vsftpd
  cd /etc/vsftpd
  ls
  说明：
  /etc/vsftpd/vsftpd.conf 是核心配置文件。
  /etc/vsftpd/ftpusers 是黑名单文件，此文件里的用户不允许访问 FTP 服务器。
  /etc/vsftpd/user_list  是白名单文件，是允许访问 FTP 服务器的用户列表。
  /etc/vsftpd/vsftpd_conf_migrate.sh  是vsftpd操作的一些变量和设置

  3.运行以下命令设置开机自启动。

  systemctl enable vsftpd

  4.运行以下命令启动 FTP 服务。

  systemctl start vsftpd

  5.运行以下命令查看 FTP 服务端口。

  netstat -antup | grep ftp
```
![Image text](https://gitee.com/webchuanzhou/lcz_document/raw/master/docs/assets/app/ftp1.png)
```html
  6.创建连接用户和密码,执行下面的命令

　　创建用户:useradd ama  注:ama是用户名

　　设计用户密码: passwd ama 注:给用户ama设置密码,设置的密码必须是包含大小写,数字,特殊字符,长度大于等于8
```
```html
  7.修改vsftp(/etc/vsftpd/vsftpd.conf)的配置文件
　　a.运行vim vsftpd.conf。
　　b.按键 “i” 进入编辑模式。
　　c.将是否允许匿名登录 FTP 的参数修改为anonymous enable=NO。
　　d.将是否允许本地用户登录 FTP 的参数修改为local_enable=YES。
　　e.按键 “Esc” 退出编辑模式，然后按键“：wq” 保存并退出文件。
```
![Image text](https://gitee.com/webchuanzhou/lcz_document/raw/master/docs/assets/app/ftp2.png)
```html
  8.重启服务,执行下面的命令:
  systemctl restart vsftpd

  9.给服务器添加安全组(使用的是阿里云服务器),如下图显示:

  添加端口号21

  10.打开ftp链接 然后上传就可以了
```


## 4.使用docker安装nginx镜像
```html
  //查看nginx版本
  docker search nginx
  //安装下载
  docker pull nginx
  //查看下载的镜像
  docker images
```

## 5.开始部署
参考：https://www.cnblogs.com/renleiblog/p/13329935.html
1.把打包完的文件上传到服务器/home下面
2.创建Dockerfile 与打包的dist同一级目录

```html
vi Dockerfile
//拷贝以下代码到Dockerfile文件里面 按i编辑
FROM nginx:latest
MAINTAINER webchuanzhou@163.com
COPY dist/ /usr/share/nginx/html/  

然后按ESC使用 :wq 这是保存并退出的意思

```
接下来就是创建自己的镜像
```html
// 创建 docker-vue就是镜像的名字 要注意后面有一个点，别忘掉了~ 要在dockerfile目录下
  docker build -t docker-vue .

//删除镜像
docker rmi -f xxx
xxx:镜像id

// 通过命令docker images来查看镜像，一个刚才创建的，一个是之前pull的nginx镜像。
  docker images

//有了镜像，我们再创建容器
docker run -d --name xx -p 8080:80 xxx
d：代表后台启动
--name xx：这是创建的容器名称。
-p 8080:80: 是将nginx的80映射到你服务器的8080端口(注意你服务器的端口是否开放8080，其他端口也可以)。
xxx：是刚刚创建的镜像名称。


//查看运行中的容器
docker ps

// docker 运行容器 指定端口
docker run -d -p 8080:80 xx:XXX
xx： 代表容器名称 
XXX： 带表标签

// docker 停止关闭容器
docker stop xxx
xxx：容器id

// docker 强制停止容器
docker kill xxx
xxx：容器id

//容器停止退出
exit

//容器不停止退出
chrt + p + q

//删除容器
docker rm xxx
xxx:容器id

//进入容器
docker exec -it xxx /bin/bash
-it:交互模式
xxx:容器id
//进入容器后开启新的终端，可以在里面操作

或者

docker attach xxx
xxx:容器id
//下面进去的话会正在执行代码


```
