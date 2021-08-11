console.log("闭包进阶版.js");

const classC = (function () {
    let _x;
    class ClassC {
        constructor (x) {
            _x = x;
        }
        getX () {
            return _x;
        }
    }
    return ClassC;
})()

let classc1 = new classC("c1");
console.log("classc1._x", classc1._x);
console.log("classc1.getX", classc1.getX());
let classc2 = new classC("c2");
console.log("classc2._x", classc2._x);
console.log("classc2.getX", classc2.getX());
console.log("classc1.getX", classc1.getX());