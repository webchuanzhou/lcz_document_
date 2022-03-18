<!--
 * @Author: your name
 * @Date: 2021-07-12 19:40:11
 * @LastEditTime: 2022-03-18 17:47:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lcz_document/docs/study/git.md
-->
## 找回checkout丢失的代码 前提是要有commit提交记录
```js
    git branch // 查看当前分支
    git reflog // 查看所有操作记录 找到提交的id号
    git checkout  xxxx  //切换分支
    xxxx：记录id  列 1903830
    git checkout -b temp   //创建分支temp
    git checkout master    //git merge temp 合并temp分支切换到master分支
    git merge temp         //合并temp分支
    git branch -d temp     //删除temp分支
    git fetch 将本地分支与远程保持同步
```

## 从当前分支创建新的分支
```js
    git checkout master  //切换分支
    git pull //拉去代码
    git checkout -b newMaster //从当前分支创建一个新分支
    git push origin newMaster // 把新建的分支push到原创仓库
    git branch --set-upstream-to=origin/newMaster // 本地关联远程
    git pull // 拉取测试
    git fetch // 本地同步远程分支
```

## git 拉取远端分支到本地
```js
    git fetch origin 分支
```

## 删除远端分支
```js
git push origin --delete 分支
```