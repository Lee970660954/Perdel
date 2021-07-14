// config.js
module.exports = {
    development: {
        title: "开发环境",
        publicPath: "",
        serverHost: "msinner.jr.jd.com",
        consoleLog: true
    },
    production: {
        title: "生产环境",
        publicPath: "//jddx.jd.com/m/common/",
        serverHost: "ms.jr.jd.com",
        consoleLog: false
    }
}