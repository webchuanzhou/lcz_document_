/*
 * @Author: lcz
 * @Date: 2021-06-15 10:18:23
 * @LastEditTime: 2021-06-15 11:35:01
 * @LastEditors: Please set LastEditors
 * @Description: ts test
 * @FilePath: \lcz_document\docs\testPage\test.ts
 */
let anyNumber: any = 1
let anyBoolean: any = true
let antString: any = 'string1'
let number: number = 6
let string: string = 'hello world'
let flag: boolean = true
let arr: number[] = [1, 2]
//方法中不返回值用 void;
function hello(): void {
  console.log(111)
}
let nullVar: null = null
let undeVar: undefined = undefined

function funcString(): string {
  return 'str'
}
// console.log(funcString())

function add(x: number, y: number): number {
  return x + y
}
// console.log(add(1,2))

function srtfun(x: string, y?: string): string {
  if (y) {
    return x + y
  } else {
    return x
  }
}
console.log(srtfun('hello', 'ererer'))
console.log(srtfun('hello'))
// console.log(srtfun('hello','ererer','231'));
var val: string | number
val = 'hello'
// console.log(val)
val = 12
// console.log(val)

interface person {
  age: number
}

interface child extends person {
  name: string
}

var user = <child>{
  age:15,
  name:'lcz'
}
// console.log(user)

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