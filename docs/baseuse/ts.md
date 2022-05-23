<!--
 * @Author: lcz
 * @Date: 2021-06-15 10:14:57
 * @LastEditTime: 2022-05-12 18:05:52
 * @LastEditors: lcz
 * @Description: ts base
 * @FilePath: \lcz_document\docs\baseuse\ts.md
-->

## 基础类型检测

```js
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
```

## 函数

```js
//例子 ：函数后带返回类型
function function_name(val): return_type {
  return val
}

function funcString(): string {
  return 'str'
}

//参数验证例子

function add(x: number, y: number): number {
  return x + y
}
console.log(add(1, 2))

//参数太少 传入过多 会报错
function srtfun(x: string, y?: string): string {
  if (y) {
    return x + y
  } else {
    return x
  }
}
console.log('hello', 'ererer')
console.log('hello')
console.log('hello', 'ererer', '231')

//默认参数
function calculate_discount(price: number, rate: number = 0.5) {
  var discount = price * rate
  console.log('计算结果: ', discount)
}
calculate_discount(1000)
calculate_discount(1000, 0.3)

//剩余参数
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}

let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie')
```

## 数组

```js
//数组
var multi: number[] = [1, 2, 3, 23, 24, 25]
//多维数组
var multi: number[][] = [
  [1, 2, 3],
  [23, 24, 25],
]
```

## 联合类型

```js
var val: string | number
val = 'hello'
console.log(val)
val = 12
console.log(val)
```

## 接口

```js
//定义接口
interface IPerson {
  first: string;
  last: string;
  sayHi: () => string;
}
//实列
var construc: IPerson = {
  first: 'string',
  last: 'string',
  sayHi: (): string => {
    return '12313'
  },
}

//联合类型接口
interface runOption {
  program: string;
  command: string[] | string | (() => string);
}

var options: RunOptions = { program: 'test1', commandline: 'Hello' }
console.log(options.commandline)

options = { program: 'test1', commandline: ['Hello', 'World'] }
console.log(options.commandline[0])
console.log(options.commandline[1])

options = {
  program: 'test1',
  commandline: () => {
    return '**Hello World**'
  },
}

var fn: any = options.commandline
console.log(fn())

//索引加类型
interface indexType {
  [index: string]: number;
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

## 类 ts 查看站点 https://www.runoob.com/typescript/ts-class.html

# ts 2022-05-10

- array

```tsx
let num: number[] = [1, 2, 3]
let num: Array<number> = [1, 2, 3] //Array<number> 范型语法
```

- 枚举
- 数字枚举

```tsx
enum Dire {
  NORTH,
  SOUTH,
  EAST,
}
let direName: Dire = Dire[0] // 'NORTH'
let index: Dire = Dire['NORTH'] // 0 //支持反向
```

默认值

```tsx
enum Dire {
  NORTH = 'NORTH',
  SOUTH,
  EAST,
}
```

- 用 unknown 代替 key ,unknown 的值赋值给其他类型的变量时

```tsx
let value1: unknown = value // OK
let value2: any = value // OK
let value3: boolean = value // Error
let value4: number = value // Error
let value5: string = value // Error
let value6: object = value // Error
let value7: any[] = value // Error
let value8: Function = value // Error
```

- 元组 tupleType ,基本数组中的 value 都是某一种基础数据类型,数组中不是同一种数据类型时,就要使用 ts 中的元组

```tsx
let abc: [string, number] = ['1', 2]
let abc: [string, number] = [2, '1'] //就会报错
```

- 类型断言 ! 过滤掉 null 与 undefined 实际留下基础数据类型

- 可辨识的联合类型
- 接口定义(可辨识)

```tsx
enum CarTransmission {
  Automatic = 200,
  Manual = 300,
}

interface Motorcycle {
  vType: 'motorcycle' // discriminant
  make: number // year
}

interface Car {
  vType: 'car' // discriminant
  transmission: CarTransmission
}

interface Truck {
  vType: 'truck' // discriminant
  capacity: number // in tons
}
```

- 联合

```tsx
type Vehicle = Motorcycle | Car | Truck
```

- 类型守卫

```tsx
const EVALUATION_FACTOR = Math.PI

function evaluatePrice(vehicle: Vehicle) {
  return vehicle.capacity * EVALUATION_FACTOR
}

const myTruck: Truck = { vType: 'truck', capacity: 9.5 }
evaluatePrice(myTruck)
//以上会报错
//Property 'capacity' does not exist on type 'Vehicle'.
//Property 'capacity' does not exist on type 'Motorcycle'.
function evaluatePrice(vehicle: Vehicle) {
  switch (vehicle.vType) {
    case 'car':
      return vehicle.transmission * EVALUATION_FACTOR
    case 'truck':
      return vehicle.capacity * EVALUATION_FACTOR
    case 'motorcycle':
      return vehicle.make * EVALUATION_FACTOR
  }
}
```

- 类型别名

```tsx
type Message = string | string[]
```

- 交叉类型

```tsx
type PartialPointX = { x: number }
type Point = PartialPointX & { y: number }
let point: Point = {
  x: 1,
  y: 1,
}
```

- Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?

```tsx
type Partial<T>{
  [P in keyof T]?:T[P]
}
```

##  深入理解 TypeScript 
* 参考地址 https://jkchao.github.io/typescript-book-chinese/typings/overview.html#%E4%BA%A4%E5%8F%89%E7%B1%BB%E5%9E%8B

### 交叉类型 也就是合并
```ts
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = extend({ a: 'hello' }, { b: 42 });

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;
```