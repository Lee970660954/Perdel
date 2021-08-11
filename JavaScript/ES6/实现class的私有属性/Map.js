console.log("Map.js");

const map = new Map();
// 创建一个在每个实例中存储私有变量的对象
const internal = obj => {
    if (!map.get(obj)) {
        map.set(obj, {})
    }
    return map.get(obj);
}

class ClassE {
    constructor (name, age) {
        internal(this).name = name;
        internal(this).age = age;
    }
    get userInfo () {
        return `姓名：${internal(this).name}, 年龄：${internal(this).age}`
    }
}

let classe1 = new ClassE("lyj", 25);
let classe2 = new ClassE("wjq", 26);
console.log("classe1.name", classe1.name, "classe1.age", classe1.age);
console.log("classe2.name", classe2.name, "classe2.age", classe2.age);
console.log("classe1.userInfo", classe1.userInfo);
console.log("classe2.userInfo", classe2.userInfo);