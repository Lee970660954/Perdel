const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;
const config = require("./public/config.js")[NODE_ENV];
module.exports = {
    entry: [
        "./src/assets/js/polly.js",
        "./src/assets/js/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:6].js",
        publicPath: config.publicPath
    },
    mode: NODE_ENV,
    devtool: NODE_ENV === "development" ? "cheap-module-eval-source-map" : "source-map",
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss?$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins: function () {
                            return [
                                require("autoprefixer")(
                                    // {
                                    //     "overrideBrowserslist": [
                                    //         ">0.25%",
                                    //         "not dead"
                                    //     ]
                                    // }
                                )
                            ]
                        }
                    }
                }, "less-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|svg|webp|gif|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10240,
                        esModule: false,
                        name: "[name].[hash:6].[ext]",
                        outputPath: "assets"
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false,// 是否折叠空白
            },
            config
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"]
        })
    ]
}