<!--
 * @Author: your name
 * @Date: 2021-03-16 15:57:51
 * @LastEditTime: 2021-03-16 16:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\despise.md
-->
## 1.大型整数相加
JS 中整数的最大安全范围可以查到是：9007199254740991
```html
  let a = "9007199254740991";
  let b = "1234567899999999999"
  function add(a,b){
    //获取ab 最大长度
    let maxLength = Math.max(a.length,b.length);
    //用0去补齐长度
    a = a.padStart(maxLength , 0);//"0009007199254740991"
    b = b.padStart(maxLength , 0);//"1234567899999999999"
    let t = 0;
    let f = 0; //余量
    let num = '';
    for(var i = maxLength-1;i>=0;i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      num= t%10 + num
    }
    if(f == 1){
      mun = '1' + mum
    }
    return num
  }
  add(a,b)
```