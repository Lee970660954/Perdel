document.title = "实例方法then值穿透的实现";
console.log("实例方法then值穿透的实现.js");

// 1.实例方法then中没有传入参数时，后面的then依旧可以得到之前实例方法then返回的值，实现值的穿透。
const Pending = Symbol("Pending");// 进行中
const Fulfilled = Symbol("Fulfilled");// 已成功
const Rejected = Symbol("Rejected");// 已失败
const handleValue = (promise, x, resolve, reject) => {
    // 循环引用，自己等待自己完成，会出错，用reject传递出错误原因
    if (promise === x) {
        return reject(new TypeError("检测到Promise的链式循环引用"))
    }
    // 确保只传递出去一次值
    let once = false;
    if ((x !== null && typeof x === "object") || typeof x === "function") {
        let then = x.then;
        // 判断x是不是Promise
        if (typeof then === "function") {
            then.call(x, y => {
                if (once) return;
                once = true;
                handleValue(promise, y, resolve, reject);
            }, z => {
                if (once) return;
                once = true;
                reject(z);
            })
        } else {
            // 如果x是个普通对象，直接调用resolve；
            resolve(x);
        }
    } else {
        // 如果x是个原始值，直接调用resolve；
        resolve(x);
    }
}
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
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
        onRejected = typeof onRejected === "function" ? onRejected : err => { throw err };
        const promise = new Promise((resolve, reject) => {
            if (this.status === Fulfilled) {
                if (onFulfilled && typeof onFulfilled === "function") {
                    setTimeout(() => {
                        const x = onFulfilled(this.value);
                        handleValue(promise, x, resolve, reject);
                    }, 0)
                }
            }
            if (this.status === Rejected) {
                if (onRejected && typeof onRejected === "function") {
                    setTimeout(() => {
                        const x = onRejected(this.reason);
                        handleValue(promise, x, resolve, reject);
                    }, 0)
                }
            }
            if (this.status === Pending) {
                if (onFulfilled && typeof onFulfilled === "function") {
                    this.onFulfilled.push(() => {
                        setTimeout(() => {
                            const x = onFulfilled(this.value);
                            handleValue(promise, x, resolve, reject);
                        }, 0)
                    })
                }
                if (onRejected && typeof onRejected === "function") {
                    this.onRejected.push(() => {
                        setTimeout(() => {
                            const x = onRejected(this.reason);
                            handleValue(promise, x, resolve, reject);
                        }, 0)
                    })
                }
            }

        })
        return promise;
    }
}

const test = new Promise((resolve, reject) => {
    // resolve("执行成功");
    // reject("执行失败");
    setTimeout(() => {
        resolve("执行成功");
    }, 1000)
})
test
.then()
.then(res => {
    console.log("res1", res);
    // return "then1";
    // return test;
    const test2 = new Promise((resolve, reject) => {
        // resolve("执行成功2");
        // reject("执行失败2");
        setTimeout(() => {
            resolve("执行成功2");
        }, 1000)
    })
    return test2;
}, err => {
    console.log("err1", err);
})
.then(res => {
    console.log("res2", res);
}, err => {
    console.log("err2", err);
})