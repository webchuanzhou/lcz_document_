<!--
 * @Author: lcz
 * @Date: 2021-03-11 17:58:48
 * @LastEditTime: 2021-03-11 18:05:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\jsString.md
-->
## 1.字符方法
```html
  /* 
  charAt方法和charCodeAt方法都接收一个参数，基于0的字符位置 
  charAt方法是以单字符字符串的形式返回给定位置的那个字符 
  charCodeAt方法获取到的不是字符而是字符编码 
   */
    var str="hello world"; 
    console.log(str.charAt(1));//e 
    console.log(str.charCodeAt(1));//101 
    //还可以使用方括号加数字索引来访问字符串中特定的字符 
    console.log(str[1]);//e 
```

## 2.concat方法
```html
    var str="hello "; 
    var res=str.concat("world"); 
    console.log(res);//hello world 
    console.log(str);//hello  这说明原来字符串的值没有改变 
    var res1=str.concat("nihao","!"); 
    console.log(res1);//hello nihao!  说明concat方法可以接收任意多个参数 
    //虽然concat方法是专门用来拼接字符串的，但是实践中我们使用最多的还是加操作符+，因为其简易便行 
```

## 3.slice方法、substring方法、substr方法
```html
  /* 
    slice方法：第一个参数指定子字符串开始位置，第二个参数表示子字符串最后一个字符后面的位置 
    substring方法：第一个参数指定子字符串开始位置，第二个参数表示子字符串最后一个字符后面的位置 
    substr方法：第一个参数指定子字符串开始位置，第二个参数表示返回的字符个数 
    这三个方法都会返回被操作字符串的一个子字符串，都接收一或两个参数 
    如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。这些方法也不会修改字符串本身，只是返回一个基本类型的字符串值 
     */
    var str="hello world"; 
    console.log(str.slice(3));//lo world 
    console.log(str.substring(3));//lo world 
    console.log(str.substr(3));//lo world 
    console.log(str.slice(3,7));//lo w  7表示子字符串最后一个字符后面的位置  简单理解就是包含头不包含尾 
    console.log(str.substring(3,7));//lo w 
    console.log(str.substr(3,7));//lo worl 7表示返回7个字符 
  
    console.log(str.slice(3,-4));//lo w  -4+11=7表示子字符串最后一个字符后面的位置  简单理解就是包含头不包含尾 
    console.log(str.substring(3,-4));//hel  会转换为console.log(str.substring(3,0)); 
    //此外由于这个方法会将较小数作为开始位置，较大数作为结束位置，所以相当于调用console.log(str.substring(0,3)); 
    console.log(str.substr(3,-4));//""空字符串 
    console.log(str.substring(3,0)); 
```

## 4.indexOf lastIndexOf
```html
  /* 
    indexOf方法和lastIndexOf方法都是从一个字符串中搜索给定的子字符串，然后返回子字符串的位置，如果没有找到，则返回-1 
    indexOf方法是从字符串的开头向后搜索子字符串，lastIndexOf方法正好相反 
    这两个方法都可以接收两个参数：要查找的子字符串和查找的位置 
     */
    var str="hello world"; 
    console.log(str.indexOf("o"));//4 
    console.log(str.lastIndexOf("o"));//7 
    console.log(str.indexOf("o",6));//7 
    console.log(str.lastIndexOf("o",6));//4 
```

## 5.trim方法
```html
  /* 
    trim方法用来删除字符串前后的空格 
     */
    var str="   hello world   "; 
    console.log('('+str.trim()+')');//(hello world) 
    console.log('('+str+')');//(   hello world   ) 
```

## 6.toLowerCase toUpperCase()
```html
   var str="HELLO world"; 
    console.log(str.toLowerCase());//hello world 
    console.log(str.toUpperCase());//HELLO WORLD 
```

## 7.match search 
```html
   /* 
  match方法：只接受一个参数，由字符串或RegExp对象指定的一个正则表达式 
  search方法：只接受一个参数，由字符串或RegExp对象指定的一个正则表达式 
  search方法返回字符串中第一个匹配项的索引，如果没有匹配项，返回-1 
   */
  var str="cat,bat,sat,fat"; 
  var pattern=/.at/; 
  var matches=str.match(pattern); 
  console.log(matches.index);//0 
  console.log(matches[0]);//cat 
  console.log(pattern.lastIndex);//0 
  //lastIndex表示开始搜索下一个匹配项的字符位置，从0算起 
  var pos=str.search(/at/); 
  console.log(pos);//1 1表示at字符串在原来字符串中第一次出现的位置 
```

## 8.replace
```html
    var str="cat,bat,sat,fat"; 
    var res=str.replace("at","one");//第一个参数是字符串，所以只会替换第一个子字符串 
    console.log(res);//cone,bat,sat,fat 
  
    var res1=str.replace(/at/g,"one");//第一个参数是正则表达式，所以会替换所有的子字符串 
    console.log(res1);//cone,bone,sone,fone 
```

## 9.split
```html
  /* 
  split方法是基于指定的字符，将字符串分割成字符串数组 
  当指定的字符为空字符串时，将会分隔整个字符串 
   */
    var str="red,blue,green,yellow"; 
    console.log(str.split(","));//["red", "blue", "green", "yellow"] 
    console.log(str.split(",",2));//["red", "blue"]  第二个参数用来限制数组大小 
    console.log(str.split(/[^\,]+/));// ["", ",", ",", ",", ""] 
    //第一项和最后一项为空字符串是因为正则表达式指定的分隔符出现在了子字符串的开头，即"red"和"yellow" 
    //[^...] 不在方括号内的任意字符  只要不是逗号都是分隔符 
```