document.title = "分析Promise的业务场景";
console.log("分析Promise的业务场景.js");

// 1.Promise中有三个状态，Pending（进行中）、Fulfilled（已成功），Rejected（已失败）。Promise外部无法改变这三种状态，并且Promise的状态一旦改变就不会
// 再变。

// 2.实例化一个Promise需要传入一个executor函数，业务代码在executor函数中执行，除此之外，executor函数接收两个参数resolve和reject。resolve和reject是
// Promise构造函数的内置函数。
new Promise((resolve, reject) => {
    //... 业务代码
})

// 3.在executor函数中业务代码执行成功，调用resolve函数，把Promise的状态变为已成功，另外通过参数把业务代码的执行成功的结果传递到Promise中。
// 4.在executor函数中业务代码执行失败，调用reject函数，把Promise的状态变为已失败，另外通过参数把业务代码的执行失败的原因传递到Promise中。
// 5.实例方法then的第一个参数是业务代码执行成功的回到函数，第二个参数是业务代码执行失败的回调函数，当业务代码执行完毕后，会根据执行结果调用对应的回调函数，且这些回调函数接收业务代码的执行结果作为参数。
// 6.通过实例方法catch来添加业务代码执行失败的回调函数。

