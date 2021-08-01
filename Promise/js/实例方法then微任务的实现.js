document.title = "实例方法then微任务的实现";
console.log("实例方法then微任务的实现.js");

// 1.原生的Promise是V8引擎提供的微任务，我们无法还原V8引擎的实现，所以这里使用setTimeout模拟异步。
// 2.如果想要实现Promise的微任务，可以mutationObserver替代setTimeout来实现微任务。
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
                setTimeout(() => {
                    onFulfilled(this.value);
                }, 0)
            }
        }
        if (this.status === Rejected) {
            if (onRejected && typeof onRejected === "function") {
                setTimeout(() => {
                    onRejected(this.reason);
                }, 0)
            }
        }
        if (this.status === Pending) {
            if (onFulfilled && typeof onFulfilled === "function") {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        onFulfilled(this.value);
                    }, 0)
                })
            }
            if (onRejected && typeof onRejected === "function") {
                setTimeout(() => {
                    
                }, 0)
                this.onRejected.push(() => {
                    setTimeout(() => {
                        onRejected(this.reason);
                    }, 0)
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