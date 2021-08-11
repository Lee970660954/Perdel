console.log("Proxy.js");

class Student {
    constructor (name, age) {
        this._name = name;
        this._age = age;
    }
    get userInfo () {
        return `姓名：${this._name}, 年龄：${this._age}`;
    }
}

const handler = {
    get: function (target, key) {
        // 访问私有属性，返回一个error
        if (key[0] === "_") {
            throw new Error("Attempt to access private property");
        } else if (key === "toJSON") {
            // 只返回公共属性
            const obj = {};
            for (const key in target) {
                if (key[0] !== "_") {
                    obj[key] = target[key];
                }
            }
            return () => obj;
        }
        // 访问公共属性，默认返回
        return target[key];
    },
    set: function (target, key, value) {
        if (key[0] === "_") {
            throw new Error("Attempt to access private property");
        }
        target[key] = value;
    },
    // 解决私有属性能被遍历的问题，通过访问属性对应的特性描述，然后设置enumerable为false
    getOwnPropertyDescriptor (target, key) {
        const desc = Object.getOwnPropertyDescriptor(target, key);
        if (key[0] === "_") {
            desc.enumerable = false;
        }
        return desc;
    }
}

let student1 = new Proxy(new Student("lyj", 25), handler);
console.log("student1.userInfo", student1.userInfo);
console.log("student1 instanceof Student", student1 instanceof Student);
console.log("JSON.stringify", JSON.stringify(student1));
for (const key in student1) {
    console.log(key);
}
student1._name = "wjq";
