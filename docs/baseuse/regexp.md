<!--
 * @Author: your name
 * @Date: 2021-11-02 10:18:52
 * @LastEditTime: 2021-11-02 10:23:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\baseuse\regexp.md
-->

| 元字符 | 描述                                          |
| ------ | --------------------------------------------- |
| .      | 查找单个字符，除了换行和行结束符              |
| \w     | 查找单词字符                                  |
| \W     | 查找非单词字符                                |
| \d     | 查找数字                                      |
| \D     | 查找非数字字符                                |
| \s     | 查找空白字符                                  |
| \S     | 查找非空白字符                                |
| \b     | 匹配单词边界                                  |
| \B     | 匹配非单词边界                                |
| \0     | 查找 NUL 字符                                 |
| \n     | 查找换行符                                    |
| \f     | 查找换页符                                    |
| \r     | 查找回车符                                    |
| \t     | 查找制表符                                    |
| \v     | 查找垂直制表符                                |
| \xxx   | 查找以八进制数 xxxx 规定的字符                |
| \xdd   | 查找以十六进制数 dd 规定的字符                |
| \uxxxx | 查找以十六进制 xxxx 规定的 Unicode 字符       |
| n+     | 匹配任何包含至少一个 n 的字符串               |
| n\*    | 匹配任何包含零个或多个 n 的字符串             |
| n?     | 匹配任何包含零个或一个 n 的字符串             |
| n{x}   | 匹配包含 x 个 n 的序列的字符串                |
| n{x,y} | 匹配包含最少 x 个、最多 y 个 n 的序列的字符串 |
| n{x,}  | 匹配包含至少 x 个 n 的序列的字符串            |
| ^      | 匹配开头，在多行检测中，会匹配一行的开头      |
| $      | 匹配结尾，在多行检测中，会匹配一行的结尾      |

> 列子
> 1、. 匹配任意除换行符“\n”外的字符；
> 2、*表示匹配前一个字符 0 次或无限次；
> 3、?表示前边字符的 0 次或 1 次重复
> 4、+或*后跟？表示非贪婪匹配，即尽可能少的匹配，如*？重复任意次，但尽可能少重复；
> 5、 .*? 表示匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。
> 如：a.\*?b 匹配最短的，以 a 开始，以 b 结束的字符串。如果把它应用于 aabab 的话，它会匹配 aab 和 ab。