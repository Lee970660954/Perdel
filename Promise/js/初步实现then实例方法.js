document.title = "初步实现then实例方法";
console.log("初步实现then实例方法.js");

// 1.then实例方法中调用回调函数时，要把executor函数中业务代码的执行结果作为参数传递进去，所以要新增实例属性来存储业务代码的执行结果。
// 2.执行成功的结果通过内置方法resolve的参数传入，执行失败的原因通过内置方法reject的参数传入。
// 3.用发布/订阅设计模式来控制then实例方法中回调函数的执行时机，从而实现Promise的executor函数具有异步操作的情况。
const Pending = Symbol("Pending");// 进行中
const Fulfilled = Symbol("Fulfilled");// 已成功
const Rejected = Symbol("Rejected");// 已失败
class Promise {
    constructor (executor) {
        this.status = Pending;// 存储Promise的状态
        this.value = undefined;// 存储executor函数中业务代码执行成功的结果
        this.reason = undefined;// 存储executor函数中业务代码执行失败的原因
        this.onFulfilled = [];// executor函数中业务代码执行成功后回调函数的集合
        this.onRejected = [];// executor函数中业务代码执行失败后回调函数的集合
        const resolve = value => {
            // 只有当状态为Pending才会改变，保证一旦状态改变就不会再变。
            if (this.status === Pending) {
                this.status = Fulfilled;
                this.value = value;
                this.onFulfilled.forEach(fn => fn());
            }
        };
        const reject = reason => {
            // 只有当状态为Pending才会改变，保证一旦状态改变就不会再变。
            if (this.status === Pending) {
                this.status = Rejected;
                this.reason = reason;
                this.onRejected.forEach(fn => fn());
            }
        }
        executor(resolve, reject);
    }
    then (onFulfilled, onRejected) {
        if (this.status === Fulfilled) {
            if (onFulfilled && typeof onFulfilled === "function") {
                onFulfilled(this.value);
            }
        }
        if (this.status === Rejected) {
            if (onRejected && typeof onRejected === "function") {
                onRejected(this.reason);
            }
        }
        if (this.status === Pending) {
            if (onFulfilled && typeof onFulfilled === "function") {
                this.onFulfilled.push(() => {
                    onFulfilled(this.value);
                })
            }
            if (onRejected && typeof onRejected === "function") {
                this.onRejected.push(() => {
                    onRejected(this.reason);
                })
            }
        }
    }
}

const test = new Promise((resolve, reject) => {
    resolve("执行成功");
    // reject("执行失败");
    // setTimeout(() => {
    //     resolve("执行成功");
    // }, 1000)
})
test.then(res => {
    console.log("res", res);
}, err => {
    console.log("err", err);
})
