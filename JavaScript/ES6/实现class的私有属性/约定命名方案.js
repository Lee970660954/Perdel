console.log("约定命名方案.js");

class ClassA {
    constructor (x) {
        this._x = x;
    }
    getX () {
       return this._x; 
    }
}

let classa = new ClassA("a");
console.log("classa._x", classa._x);
console.log("classa.getX", classa.getX());