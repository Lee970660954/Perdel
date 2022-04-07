前端模块化
Commonjs
Es Module

问题
1.Commonjs和Es Module的区别?
2.Commonjs如何解决循环引用问题？
3.exports和module.exports的区别和适用场景？
4.require模块查找机制？
？5.Es Module如何解决循环引用问题？
6.exports = {}写法为何无效？
7.import()函数实现动态导入的使用？
8.Es Module如何改变模块下的私有变量？

模块化
1.前端模块化解决的痛点？
在没有前端模块化概念和方案前，一直存在全局污染和依赖管理混乱的问题，并且这些问题随着项目工程的扩展会变得越发棘手。
全局污染：在没有模块化的情况下，script标签加载并解析后的变量在同一个全局作用域中，因此是可以相互污染的。当然，在没有用到模块化开发的情况下，可以使用匿名函数自执行的方式创建一个独立的块级作用域来解决这个问题，但是随着项目工程复杂度提升，开发人员需要手动创建越来越多匿名函数自执行，并且代码可读性也会下降。
依赖管理混乱：文件依赖管理也是一个难以处理的问题，正常情况下，执行js的先后顺序就是script标签书写的顺序，因此，后面的js能够调用前面js定义的内容，但是前面的js无法调用后面js定义的内容。

Commonjs
Commonjs的提出，弥补了JavaScript在模块化方面一直没有统一标准的缺陷。Node借鉴了Commonjs规范，实现了良好的模块化管理。
目前Commonjs广泛应用于以下几个场景：
（1）Node是Commonjs在服务器端具有代表性的实现。
（2）Browserify是Commonjs在浏览器端具有代表性的实现。
（3）Webpack模块打包工具对Commonjs的支持和实现，使得前端应用可以在编译前，尽情使用Commonjs进行开发。

1.Commonjs使用
（1）在Commonjs规范下，每一个js文件都是一个单独的模块，我们称之为module。
（2）每个模块中，包含Commonjs规范的核心变量：exports、require，module.exports等。
（3）exports和module.exports负责模块内容的导出。
（4）require函数负责导入其他模块（系统模块、自定义模块和第三方模块）的内容。
其中，
module：记录当前模块的信息。
require：在模块中引入其它模块的方法。
exports：记录当前模块导出的信息。

问题：
（1）Commonjs如何解决全局污染问题？
（2）module.exports、exports、require工作原理？

2.Commonjs原理
每个模块文件上存在module、exports，require三个变量，虽然这三个变量不是在模块内定义的，但是在Commonjs规范下，每个模块文件又可以直接使用它们。让我们探究一下Commonjs实现模块化的原理。
（1）在编译的过程中，Commonjs对模块的js代码进行了首尾包装，返回一个包装函数moduleFunction，即将模块代码放在一个匿名函数的作用域中，并且该匿名函数的形参依次是exports、require、module、__filename，__dirname。（wrapper，返回的是包装函数的字符串形式）
（2）在模块加载的过程中，会通过runInThisContext（可以理解为eval）执行moduleFunction，并且传入exports、require、module等参数。到此为止，是整个模块编译、加载和执行的过程。

3.require 文件加载流程
当require方法执行时，接收唯一参数作为一个标识符，Commonjs对不同类别的标识符，进行不同的处理，但是目的相同，都是为了找到对应的模块。

require标识符处理原则
（1）fs、http，path等标识符，会被作为系统模块进行处理。
系统模块的优先级仅次于缓存加载，在Nod源码编译中，已被编译成二进制代码，所以加载系统模块的速度非常快。
（2）./和../作为相对路径的自定义模块，/作为绝对路径的自定义模块。
首先require会将路径转换成真实路径，并以真实路径为索引，将编译后的结果缓存起来，第二次加载时就会很快。
（3）非系统模块也非路径模块，则将被视为第三方模块。
第三方模块的查询会遵循以下规则：
1）在当前目录下的node_modules目录查找。
2）如果没有，向上层父级目录的node_modules目录查找，如果依然没有，则继续向上层目录的node_modules目录查找。
3）沿着路径向上层递归，直到根目录下的node_modules目录。
4）在node_modules中找到第三方模块后，会找该模块目录下的package.json文件的main属性指向的文件，如果没有package.json，在node环境下会在该模块目录下查找index.js，index.json，index.node。

require引入模块处理原则
Commonjs规范，引入模块时，同步加载并执行模块，在模块执行阶段分析模块依赖，采用深度优先遍历的方式，执行顺序为父模块->子模块->父模块。

module：在Node中每个js文件都是一个module，module中保存了exports等信息之外，还有一个loaded表示该模块是否被加载。

Module：Commonjs编译并执行模块时，会用Module缓存每一个加载的模块的信息。

require引入模块处理的细节：
（1）require会接收一个文件标识符参数，然后根据文件标识符的类别分析定位文件，然后从Module缓存中根据文件标识符查找是否有缓存，如果有缓存，那么直接返回缓存中对应的module的exports。
（2）如果Module缓存中没有找到对应文件标识符的module，则会创建一个module对象，缓存到Module中，然后加载并执行文件，将loaded属性设置为true，然后返回module.exports对象，到此为止完成了模块加载和执行。

require避免重复加载
require在加载并执行模块时，首次加载的模块会被缓存到Module中并返回其module.exports，如果另一个模块再次引用已被缓存的模块，那么会直接从Module缓存中获取该模块的缓存值，并返回其exports。

require避免循环引用和require避免重复加载原理相同。

require动态加载：require可以在任意的上下文，动态加载模块。require本质上就是一个函数，函数可以在任意执行上下文中执行，自由的加载其他模块的属性和方法。

4.exports和module.exports
exports和module.exports本质上返回的是同一个引用地址，但是使用exports时，只能在其上挂载属性和方法，而不能直接赋值，原因可以参考JS函数传参章节。而module.exports在使用时可以直接赋值。但是两者不能混合（同时）使用，会被覆盖。


Es Module
从ES6开始，JavaScript有了自己的模块化规范，即Es Module。

1.Es Module的优势
（1）借助Es Module的静态导入导出的优势，实现tree shaking。
（2）Es Module还可以import()，完成按需加载，即懒加载方式实现代码分割。

2.Es Module中用import导入模块，export和export default导出模块。
（1）所有通过export导出的属性，在import中可以通过解构的方式引入，这种情况，import导入变量名需要和export保持一致。
（2）export default是模块默认导出，使用import导入时，可以使用任意变量名。
（3）export default和export可混合使用。
（4）import 模块，无需导入模块，只运行模块，多次调用module只运行一次。
（5）动态导入import()，动态导入返回一个Promise。

3.Es Module特点
（1）静态语法，Es Module的引入和导出是静态的，import会自动提升到代码顶层，import，export不能放在块级作用域中或条件语句中。
（2）执行特性，Es Module和Commonjs一样，会对引入的模块进行缓存，当再次引入相同的模块时1，会从缓存中获取并返回。但是与Commonjs不同的是，Commonjs对模块进行同步加载并执行模块，而Es Module对模块进行提前加载并执行模块，Es Module在预处理阶段分析模块的依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子->父。
（3）导出绑定，不能修改import导入的属性，会提示报错。
import属性总结：
1）使用import导入的模块运行在严格模式下。
2）使用import导入的变量是只读的，无法被赋值。
3）使用import导入的变量与原变量绑定，可以理解为import导入的变量无论是否为基本类型，都是引用传递。
（4）import()动态引入，返回一个Promise对象，在Promise.then中可以获取模块信息。name对应name属性，default代表export default。
（5）tree shaking实现，Webpack实现了tree shaking，尽可能的删除没有被使用过的代码，一些被import但是没有使用过的代码，不会被打包到最终的bundle中。
