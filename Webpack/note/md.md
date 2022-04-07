10.文件指纹是什么？怎么用？
文件指纹是打包后输出的文件名的后缀。
Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改。
Chunkhash：和Webpack打包的chunk有关，不同的entry会生出不同的chunkhash。
Contenthash：根据文件内容来定义的hash，文件内容不变，则contenthash不变。

11.在实际工程中，配置文件上百行乃是常事，如何保证各个loader按照预想方式工作？
可以使用enforce强制执行loader的作用顺序。pre代表在所有正常loader之前执行，post代表在所有正常loader之后执行。

12.如何优化Webpack的构建速度？
（1）利用缓存提升二次构建速度，使用cache-loader对性能开销较大的loader进行缓存，比如babel-loader、uglifyjs-webpack-plugin，terser-webpack-plugin等。
（2）开启多进程构建，Happypack。
（3）开启多进程压缩代码，uglifyjs-webpack-plugin和terser-webpack-plugin开启parallel参数。
（4）缩小打包作用域，如：
    1）exclude/include，确定loader规则范围。
    2）resolve.modules，指明第三方模块的绝对路径，减少不必要的查找。
    3）resolve.extensions，减少后缀尝试的可能性。
    4）合理使用alias。
    5）noParse，对完全不需要解析的库进行忽略，但仍会打包到bundle中。
（5）提取页面公共资源，如：
    1）将基础包通过CDN引入，不打入bundle中，并且配置externals参数。
    2）使用SplitChunksPlugin进行代码分割。
（6）Tree shaking：Webpack默认的优化，打包过程中检测工程中没有使用过的模块并进行标记，在资源压缩时将它们从最终的bundle中去掉，只对ES6 Module生效。
（7）Scope hoisting：Webpack默认的优化，构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突。

13.代码分割的本质是什么？有什么意义？
代码分割的本质是将chunk中的公共部分进行抽离，这样在客户端加载页面时，加载过的部分则不需要重新请求，而是直接从缓存中获取。另外，代码分割也降低了单个bundle的体积，减少了页面加载时的白屏时长。

14.是否写过Loader？简单描述一下编写Loader的思路？
Loader支持链式调用，所以开发上需要严格遵循“单一职责”，每个Loader只负责自己需要负责的事情。
（1）Loader运行在Node.js中，我们可以调用任意Node.js自带的API或者安装第三方模块进行调用。
（2）Webpack传给Loader的原内容都是utf-8格式编码的字符串，当某些场景下Loader处理二进制文件时，需要通过exports.raw = true告诉Webpack该Loader是否需要二进制数据。
（3）尽可能的异步化Loader，如果计算量很小，同步也可以。
（4）Loader是无状态的，我们不应该在Loader中保留状态。

15.是否写过Plugin？简单描述一下编写Plugin的思路？
webpack在运行的生命周期中会广播出许多事件，Plugin可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。webpack的Tapable事件流机制保证了插件的有序性，使得整个系统扩展性良好。
（1）compiler暴露了和Webpack整个生命周期相关的钩子。
（2）compilation暴露了与模块和依赖有关的粒度更小的事件钩子。
（3）插件需要在其原型上绑定apply方法，才能访问compiler实例。
（4）传给每个插件的compiler和compilation对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件。
（5）找出合适的事件去完成想要的功能：
    1）emit事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改（emit事件是修改webpack输出资源的最后时机）
    2）watch-run当依赖的文件发生变化时会触发。
（6）异步的事件需要在插件处理完任务时调用回调函数通知Webpack进入下一个流程，不然会卡住。

16.Babel原理？
大多数JavaScript Parser遵循estree规范，Babel大概分为三大部分：
（1）解析：将代码转换成AST
（2）转换：访问AST的节点进行变换操作产生新的AST。
（3）生成：以新的AST为基础生成代码。