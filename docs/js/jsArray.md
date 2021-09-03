<!--
 * @Author: your name
 * @Date: 2021-03-11 18:06:32
 * @LastEditTime: 2021-09-02 16:20:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\jsArray.md
-->
## 1.join
```html
  join，就是把数组转换成字符串，然后给他规定个连接字符，默认的是逗号(  ，)
  var arr = [1,2,3];
  console.log(arr.join()); 　　　　// 1,2,3
  console.log(arr.join("-")); 　　// 1-2-3
  console.log(arr); 　　　　　　　　// [1, 2, 3]（原数组不变）
```

## 2.push pop
```html
    push():  把里面的内容添加到数组末尾，并返回修改后的长度。
    pop()：移除数组最后一项，返回移除的那个值，减少数组的length。
    var arr = ["Lily","lucy","Tom"];
    var count = arr.push("Jack","Sean");
    console.log(count); 　　　　　　　　　　// 5
    console.log(arr); 　　　　　　　　　　　// ["Lily", "lucy", "Tom", "Jack", "Sean"]
    var item = arr.pop();
    console.log(item); 　　　　　　　　　　 // Sean
    console.log(arr); 　　　　　　　　　　  // ["Lily", "lucy", "Tom", "Jack"]
```

## 3.shift unshift
```html
  shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。
  unshift:将参数添加到原数组开头，并返回数组的长度 。
  var arr = ["Lily","lucy","Tom"];
    var count = arr.unshift("Jack","Sean");
    console.log(count); 　　　　　　　　　　　　　　// 5
    console.log(arr); 　　　　　　　　　　　　　　　//["Jack", "Sean", "Lily", "lucy", "Tom"]
    var item = arr.shift();
    console.log(item); 　　　　　　　　　　　　　　// Jack
    console.log(arr); 　　　　　　　　　　　　　　 // ["Sean", "Lily", "lucy", "Tom"]
```

## 4.sort
```html
  sort()：将数组里的项从小到大排序
  var arr1 = ["a", "d", "c", "b"];
  console.log(arr1.sort()); 　　　　　　　　　　// ["a", "b", "c", "d"]
  sort()方法比较的是字符串，没有按照数值的大小对数字进行排序，要实现这一点，就必须使用一个排序函数

  function sortNumber(a,b)
  {
  　　return a - b
  }
  arr = [13, 24, 51, 3]; console.log(arr.sort()); 　　　　　　　　　　// [13, 24, 3, 51] 
  console.log(arr.sort(sortNumber)); 　　　　// [3, 13, 24, 51](数组被改变)
```

## 5.reverse
```html
  reverse()：反转数组项的顺序。
  var arr = [13, 24, 51, 3];
  console.log(arr.reverse()); 　　　　　　　　//[3, 51, 24, 13]
  console.log(arr); 　　　　　　　　　　　　　　//[3, 51, 24, 13](原数组改变)
```

## 6.concat
```html
  concat() ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本。
  var arr = [1,3,5,7];
  var arrCopy = arr.concat(9,[11,13]);
  console.log(arrCopy); 　　　　　　　　　　　　//[1, 3, 5, 7, 9, 11, 13]
  console.log(arr); 　　　　　　　　　　　　　　// [1, 3, 5, 7](原数组未被修改)
```

## 7.slice
```html
  var arr = [1,3,5,7,9,11];
  var arrCopy = arr.slice(1);
  var arrCopy2 = arr.slice(1,4);
  var arrCopy3 = arr.slice(1,-2);
  var arrCopy4 = arr.slice(-4,-1);
  console.log(arr); 　　　　　　　　　　　　　　//[1, 3, 5, 7, 9, 11](原数组没变)
  console.log(arrCopy); 　　　　　　　　　　　 //[3, 5, 7, 9, 11]
  console.log(arrCopy2); 　　　　　　　　　　　//[3, 5, 7]
  console.log(arrCopy3); 　　　　　　　　　　　//[3, 5, 7]
  console.log(arrCopy4); 　　　　　　　　　　　//[5, 7, 9]
  arrCopy只设置了一个参数，也就是起始下标为1，所以返回的数组为下标1（包括下标1）开始到数组最后。 

　　arrCopy2设置了两个参数，返回起始下标（包括1）开始到终止下标（不包括4）的子数组。 

　　arrCopy3设置了两个参数，终止下标为负数，当出现负数时，将负数加上数组长度的值（6）来替换该位置的数，因此就是从1开始到4（不包括）的子数组。 

　　arrCopy4中两个参数都是负数，所以都加上数组长度6转换成正数，因此相当于slice(2,5)。
```

## 8.splice
```html
  splice()：删除、插入和替换。
删除：指定 2 个参数：要删除的第一项的位置和要删除的项数。
　　　　书写格式：arr.splice( 1 , 3  )
插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。
　　　　书写格式：arr.splice(  2,0,4,6  )
替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。
  var arr = [1,3,5,7,9,11];
  var arrRemoved = arr.splice(0,2);
  console.log(arr); 　　　　　　　　　　　　　　　//[5, 7, 9, 11]
  console.log(arrRemoved); 　　　　　　　　　　　//[1, 3]
  var arrRemoved2 = arr.splice(2,0,4,6);
  console.log(arr); 　　　　　　　　　　　　　　　// [5, 7, 4, 6, 9, 11]
  console.log(arrRemoved2); 　　　　　　　　　　// []
  var arrRemoved3 = arr.splice(1,1,2,4);
  console.log(arr); 　　　　　　　　　　　　　　　// [5, 2, 4, 4, 6, 9, 11]
  console.log(arrRemoved3); 　　　　　　　　　　//[7]
```

## 9.indexOf lastIndexOf
```html
  var arr = [1,3,5,7,7,5,3,1];
  console.log(arr.indexOf(5)); 　　　　　　//2
  console.log(arr.lastIndexOf(5)); 　　　 //5
  console.log(arr.indexOf(5,2)); 　　　　 //2
  console.log(arr.lastIndexOf(5,4)); 　　//2
  console.log(arr.indexOf("5")); 　　　　 //-1
```

## 10. forEach
```html
  forEach()：对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
  var arr = [1, 2, 3, 4, 5];
  arr.forEach(function(x, index, a){
  console.log(x + '|' + index + '|' + (a === arr));
  });
  // 输出为：
  // 1|0|true
  // 2|1|true
  // 3|2|true
  // 4|3|true
  // 5|4|true
```

## 11. map
```html
  map()：指“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
  var arr = [1, 2, 3, 4, 5];
  var arr2 = arr.map(function(item){
  return item*item;
  });
  console.log(arr2); 　　　　　　　　//[1, 4, 9, 16, 25]
```

## 12. filter
```html
  filter()：“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var arr2 = arr.filter(function(x, index) {
    return index % 3 === 0 || x >= 8;
  }); 
  console.log(arr2); 　　　　　　　　//[1, 4, 7, 8, 9, 10]
```

## 13. every
```html
  every()：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。
  var arr = [1, 2, 3, 4, 5];
  var arr2 = arr.every(function(x) {
  return x < 10;
  }); 
  console.log(arr2); 　　　　　　　　//true
  var arr3 = arr.every(function(x) {
  return x < 3;
  }); 
  console.log(arr3); 　　　　　　　　// false
```

## 14. some
```html
  some()：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。
  var arr = [1, 2, 3, 4, 5];
  var arr2 = arr.some(function(x) {
  return x < 3;
  }); 
  console.log(arr2); 　　　　　　　　//true
  var arr3 = arr.some(function(x) {
  return x < 1;
  }); 
  console.log(arr3); 　　　　　　　　// false
```

## 15.类数组转数组
```html
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    let data = [].slice.call(arrayLike)  //es5 
    let data = Array.from(arrayLike)  //es6
    // ['a', 'b', 'c']
    
    
```

## 16.Array.of()用于将一组值，转换为数组
```html
    Array.of(3,1,8) //[3,1,8]
```

## 17.find 找到及返回 不继续找
```html
    console.log(array.find(el=>(el == 2)))
```

## 18.findIndex 找到就返回下标，没找到就返回-1
```html
    console.log([1, 2, 3].findIndex(element => element > 2)) //2
    console.log([1, 2, 3].findIndex(element => element > 3)) // -1
```

## 19.Flat数组扁平化
```html
    let arr = [1,2,3,4,[1,2,3,4,[2,3,4]]]
    arr.flat()
    //[1, 2, 3, 4, 1, 2, 3, 4, Array(3)]
    arr.flat().flat()
    //[1, 2, 3, 4, 1, 2, 3, 4, 2, 3, 4]
    arr.flat(Infinity)
    //[1, 2, 3, 4, 1, 2, 3, 4, 2, 3, 4]
    et arr = [[1,2,3,4],[2,3,4,5],[3,4,5],[6,7,8,[1,3,4]]]
    arr.flat(Infinity)
    //[1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6, 7, 8, 1, 3, 4]
```

## 20.flatMap结合
```html
    let arr= [1,2,3,4,5]
    arr.flatMap((el)=>([el,el*2]))
    //[1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

## 21.entries对象转二维数组
```html
    let obj = {
        key1:'13',
        key2:'24',
        key3:'36'
    }
    Object.entries(obj)
    //[[key1,'13'], [key2,'24'], [key3,'36']] 转回对象
    Object.fromEntries([[key1,'13'], [key2,'24'], [key3,'36']])

    //对象转数组对象
    let c  = Object.entries(obj).map(el=>{
        let [a,b] = el;
        return {[a]:b}
    })
    [{key1: '13'},{key2: '24'},{key3: '36'}]
```

## 22. Array.from
```html
  Array.from({ length: 3 });
  // [ undefined, undefined, undefined ]
  // 第二个参数可传递一个回调函数
  Array.from(ary, (item, index) => `${item}777`) // => ["姜姒777", "徐扶墙777"]

  // 取出name属性值
  const ary = [
    { name: 'jack', age: 56 },
    { name: 'pony', age: 50 },
    { name: 'coderljw', age: 23 }
  ]
  Array.from(ary, ({name}) => name)
```

## 23.reduce(callback, initValue) & reduceRight(callback, initValue)
```html
  onst ary = [1, 2, 3, 4, 5]

  // 神奇的reduce，第二个参数为初始值，不传时会拿第零个元素作为初始值
  // total：上一个回调函数的返回值；current：当前项的值；currentIndex：当前项的索引；
  ary.reduce((total, current, currentIndex) => total + current) // => 15
  ary.reduce((total, current, currentIndex) => total + current, 7) // => 22

  // 与reduce类似，不过从最后一项开始累加，不传初始值时会拿最后一个元素作为初始值
  ary.reduceRight((total, current, currentIndex) => total + current) // => 15

  // 在空数组上调用 reduce 或 reduceRight 且未提供初始值，会导致类型错误（使用时最好写上初始值哟！）
  [].reduce((total, current, currentIndex) => total + current) // Uncaught TypeError: Reduce of empty array with no initial value
```