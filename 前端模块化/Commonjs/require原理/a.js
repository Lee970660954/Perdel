// const getMes = require('./b')
// console.log('我是 a 文件')
// exports.say = function(){
//     const message = getMes()
//     console.log(message)
// }


console.log('我是 a 文件')
exports.say = function(){
    const getMes = require('./b')
    const message = getMes()
    console.log(message)
}

