// const say = require('./a')
// const  object = {
//    name:'《React进阶实践指南》',
//    author:'我不是外星人'
// }
// console.log('我是 b 文件')
// module.exports = function(){
//     return object
// }

const say = require('./a')
const  object = {
   name:'《React进阶实践指南》',
   author:'我不是外星人'
}
console.log('我是 b 文件')
console.log('打印 a 模块' , say)

setTimeout(()=>{
    console.log('异步打印 a 模块' , say)
},0)

module.exports = function(){
    return object
}

