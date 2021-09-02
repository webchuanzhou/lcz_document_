<!--
 * @Author: your name
 * @Date: 2021-03-15 10:48:31
 * @LastEditTime: 2021-09-02 16:03:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\js\base.md
-->
## 基础类型判断
```html
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const isMap = (val) => toTypeString(val) === '[object Map]';
    const isSet = (val) => toTypeString(val) === '[object Set]';
    const isDate = (val) => val instanceof Date;
    const isFunction = (val) => typeof val === 'function';
    const isString = (val) => typeof val === 'string';
    const isSymbol = (val) => typeof val === 'symbol';
    const isObject = (val) => val !== null && typeof val === 'object';
    const isArray = Array.isArray;
    const isPromise = (val) => {
        return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
```
