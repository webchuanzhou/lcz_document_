/*
 * @Author: your name
 * @Date: 2021-10-13 10:58:14
 * @LastEditTime: 2021-10-27 10:37:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\questions\js.js
 */
class SqQueue {
  constructor(length) {
    this.queue = new Array(length + 1)
    //队头
    this.first = 0
    //队尾
    this.last = 0
    //当前队列⼤⼩
    this.size = 0
  }
  enQueue(item) {
    //判断队尾+ 1是否为队头
    //如果是就代表需要扩容数组
    // % this.queue.length是为了防⽌数组越界
    if (this.first === (this.last + 1) % this.queue.length) {
      this.resize(this.getLength() * 2 + 1)
    }
    this.queue[this.last] = item
    this.size++
    this.last = (this.last + 1) % this.queue.length
  }
  deQueue() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    let r = this.queue[this.first]
    this.queue[this.first] = null
    this.first = (this.first + 1) % this.queue.length
    this.size--
    // 判断当前队列⼤⼩是否过⼩
    // 为了保证不浪费空间， 在队列空间等于总⻓度四分之⼀时
    // 且不为 2 时缩⼩总⻓度为当前的⼀半
    if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
      this.resize(this.getLength() / 2)
    }
    return
    r
  }
  getHeader() {
    if (this.isEmpty()) {
      throw Error('Queue is empty')
    }
    return this.queue[this.first]
  }
  getLength() {
    return this.queue.length - 1
  }
  isEmpty() {
    return this.first === this.last
  }
  resize(length) {
    let q = new Array(length)
    for (let i = 0; i < length; i++) {
      q[i] = this.queue[(i + this.first) % this.queue.length]
    }
    this.queue = q
    this.first = 0
    this.last = this.size
  }
}
