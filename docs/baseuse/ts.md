<!--
 * @Author: lcz
 * @Date: 2021-06-15 10:14:57
 * @LastEditTime: 2021-12-22 16:53:18
 * @LastEditors: Please set LastEditors
 * @Description: ts base
 * @FilePath: \lcz_document\docs\baseuse\ts.md
-->

## 基础类型检测
```js
  let anyNumber: any = 1;
  let anyBoolean: any = true;
  let antString: any = 'string1';
  let number: number = 6;
  let string: string = 'hello world';
  let flag: boolean = true;
  let arr: number[] = [1,2];
  //方法中不返回值用 void;
  function hello():void{
    console.log(111)
  }
  let nullVar :null = null;
  let undeVar :undefined = undefined;
```

## 函数
```js
  //例子 ：函数后带返回类型
  function function_name(val):return_type{
    return val
  }

  function funcString():string{
    return 'str'
  }

  //参数验证例子

  function add(x: number,y: number):number{
    return x + y
  }
  console.log(add(1,2))

  //参数太少 传入过多 会报错
  function srtfun(x: string,y?: string):string{
    if(y){
      return x + y
    }else{
      return x
    }
  }
  console.log('hello','ererer');
  console.log('hello');
  console.log('hello','ererer','231');

  //默认参数
  function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
  } 
  calculate_discount(1000) 
  calculate_discount(1000,0.30)
  
  //剩余参数
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }
  
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

## 数组
```js
//数组
var multi:number[] = [1,2,3,23,24,25]  
//多维数组
var multi:number[][] = [[1,2,3],[23,24,25]]  
```

## 联合类型
```js
  var val:string|number
  val = 'hello'
  console.log(val)
  val = 12
  console.log(val)
```

## 接口
```js
  //定义接口
  interface IPerson{
    first:string,
    last:string,
    sayHi: ()=>string
  }
  //实列
  var construc: IPerson = {
    first:'string',
    last:'string',
    sayHi:():string=>{
      return '12313'
    }
  }

  //联合类型接口
  interface runOption{
    program:string,
    command:string[]|string|(()=>string)
  }
  
  var options:RunOptions = {program:"test1",commandline:"Hello"}; 
  console.log(options.commandline)  
  
  
  options = {program:"test1",commandline:["Hello","World"]}; 
  console.log(options.commandline[0]); 
  console.log(options.commandline[1]);  
  
  
  options = {program:"test1",commandline:()=>{return "**Hello World**";}}; 
  
  var fn:any = options.commandline; 
  console.log(fn());

  //索引加类型
  interface indexType{
    [index:string]:number
  }
```

## 单继承
```js
  interface person{
    age:number
  }

  interface child extends person{
    name:string
  }

  var user = <child>{
    age:15,
    name:'lcz'
  }
  console.log(user)
```

## 多继承
```js
  interface person1{
    name:string
  }
  interface person2{
    age:number
  }
  interface childs extends person1,person2{
    lick:string
  }
  var users = <childs>{
    name:'lcz',
    age:25,
    lick:'打游戏'  
  }
  console.log(users)
```

## 类ts查看站点 https://www.runoob.com/typescript/ts-class.html