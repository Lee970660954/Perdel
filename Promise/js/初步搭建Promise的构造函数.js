document.title = "初步搭建Promise的构造函数";
console.log("初步搭建Promise的构造函数.js");

// 1.在Promise构造函数外部用Symbol来创建三个状态Pending（进行中）、Fulfilled（已成功）和Rejected（已失败）。
// 2.Promise是个类，在ES6中用Class语法创建。
// 3.Promise构造函数接收executor函数作为参数，并且在其中执行executor函数。
// 4.Promise构造函数中有resolve和reject内置方法，并作为参数传递给executor函数。
// 5.设置实例属性status来存储状态。
// 6.内置函数resolve可以把状态变为已成功，内置函数reject可以把状态变为已失败，且一旦状态改变就不会再变。

const Pending = Symbol("Pending");// 进行中
const Fulfilled = Symbol("Fulfilled");// 已成功
const Rejected = Symbol("Rejected");// 已失败
class Promise {
    constructor (executor) {
        this.status = Pending;// 存储Promise的状态
        const resolve = () => {
            // 只有当状态为Pending才会改变，保证一旦状态改变就不会再变。
            if (this.status === Pending) {
                this.status = Fulfilled;
            }
        };
        const reject = () => {
            // 只有当状态为Pending才会改变，保证一旦状态改变就不会再变。
            if (this.status === Pending) {
                this.status = Rejected;
            }
        }
        executor(resolve, reject);
    }
}

const test = new Promise((resolve, reject) => {
    console.log("test", resolve, reject);
})