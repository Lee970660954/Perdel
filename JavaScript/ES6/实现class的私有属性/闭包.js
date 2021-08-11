console.log("闭包.js");

class ClassB {
    constructor (x) {
        let _x = x;
        this.getX = function () {
            return _x;
        }
    }
}

let classb = new ClassB("b");
console.log("classb._x", classb._x);
console.log("classb.getX", classb.getX());