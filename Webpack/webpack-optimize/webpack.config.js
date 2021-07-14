const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const apiMocker = require("mocker-api");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const Happypack = require("happypack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const smwp = new SpeedMeasureWebpackPlugin();
const NODE_ENV = process.env.NODE_ENV;
const config = require("./public/config.js")[NODE_ENV];
const webpackConfig = {
    entry: {
        polly: "./src/assets/js/polly.js",
        index: "./src/assets/js/index.js",
        login: "./src/assets/js/login.js"
    },
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
        compress: true, //是否启用 gzip 压缩
        hot: true,
        // proxy: {
        //     "/api": "http://localhost:4000"
        // }
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '/api': ''
                }
            }
        },
        before(app){
            apiMocker(app, path.resolve('src/mocker/mocker.js'))
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // use: [
                //     "cache-loader",
                //     {
                //         loader: "babel-loader",
                //     }
                // ],
                use: "Happypack/loader?id=js",
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss?$/,
                use: [MiniCssExtractPlugin.loader, 
                    "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins: function () {
                            return [
                                require("autoprefixer")()
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
            config,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            template: "./public/login.html",
            filename: "login.html",
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false,// 是否折叠空白
            },
            config,
            excludeChunks: ["index"]
        }),
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"]
        // }),
        new CopyWebpackPlugin([
            {
                from: "./public/js",
                to: path.resolve(__dirname, "dist", "js"),
                flatten: true
            }
        ], {
            ignore: ["other.js"]
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css"
        }),
        NODE_ENV === "development" ? {
            apply: () => {}
        } : new OptimizeCssAssetsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new Happypack({
            id: "js",
            use: ["babel-loader"]
        }),
        // new HardSourceWebpackPlugin()
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json')
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
        }),
        new WebpackBundleAnalyzer()
    ]
}
module.exports = smwp.wrap(webpackConfig);