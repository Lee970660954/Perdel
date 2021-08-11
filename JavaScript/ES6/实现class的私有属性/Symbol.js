console.log("Symbol.js");

const classD = (function () {
    const _x = Symbol("_x");
    return class ClassD {
        constructor (x) {
            this[_x] = x;
        }
        getX () {
            return this[_x];
        }
    }
})()

let classd1 = new classD("d1");
console.log("classd1._x", classd1._x);
console.log("classd1.getX", classd1.getX());
let classd2 = new classD("d2");
console.log("classd2._x", classd2._x);
console.log("classd2.getX", classd2.getX());
console.log("classd1.getX", classd1.getX());