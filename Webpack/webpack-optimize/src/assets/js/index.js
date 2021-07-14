// index.js
import moment from "moment";
import 'moment/locale/zh-cn';// 手动引入
import react from "react";
import reactDom from "react-dom";
if(module && module.hot) {
    module.hot.accept()
}
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
document.getElementById("host").onclick = function () {
    import("./handle.js").then((e) => {
        console.log("import handle.js", e);
    })
}
//需要将 localhost:3000 转发到 localhost:4000（服务端） 端口
// fetch("user")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

//src/index.js
fetch("/login/account", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "admin",
        password: "888888"
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));



