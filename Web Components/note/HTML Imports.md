·HTML Imports：HTML Imports是一种在HTML中引用以及复用其他的HTML文档的方式。
使用方式为：<link rel="import" href="/components/header.html">

·HTMLLinkElement：link标签在添加了HTML Imports之后，多了一个只读属性import，在正确使用的前提下（import的是一个html文件并且使用在document中）这个属性会返回一个表示引入的HTML文件的文档对象，类似于document。

·阻塞式：默认的link加载是阻塞式的，除非在link标签上添加一个async标识。

·document：值得说明，在import的HTML文件中，在script中的document对象引用的是宿主HTML的document。如果需要获取import的HTML文件中的document需要通过document.currentScript.ownerDocument方式获取。