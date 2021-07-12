<!--
 * @Author: your name
 * @Date: 2021-07-12 19:40:11
 * @LastEditTime: 2021-07-12 19:42:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lcz_document/docs/study/git.md
-->
## 找回checkout丢失的代码 前提是要有commit提交记录
```html
    git branch // 查看当前分支
    git reflog // 查看所有操作记录 找到提交的id号
    git checkout  xxxx  //切换分支
    xxxx：记录id  列 1903830
    git checkout -b temp   //创建分支temp
    git checkout master    //git merge temp 合并temp分支切换到master分支
    git merge temp         //合并temp分支
    git branch -d temp     //删除temp分支
```