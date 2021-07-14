// index.js
import "../css/index.less";
class Animal {
    constructor (name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
}
const dog = new Animal("dog");
console.log("I am index.js!");