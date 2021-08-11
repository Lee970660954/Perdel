·Custom Elements：让开发者可以自定义HTML元素，包括自定义元素的组成，样式和行为。支持Web Components标准的浏览器会提供一系列API让开发者用于创建自定义元素，或者扩展现有元素。

·registerElement：可以使用document.registerElement来注册一个标签，标准中为了提供namescape的支持，防止冲突，规定标签类型（名字）需要使用“-”连接。（旧版本浏览器支持，新版本已废弃）

·生命周期和回调
一个自定义元素会经历以下这些生命周期：
    1.createdCallback：自定义元素注册后，在实例化之后会调用，通常多用于做元素的初始化，如插入子元素，绑定事件等。
    2.attachedCallback：元素插入到document时触发。
    3.detachedCallback：元素从document中移除时触发，可能会用于做类似destroy之类的操作。
    4.attributeChangedCallback：元素属性变化时触发，可以用于从外到内的通信。外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作。

·HTML标签的is属性：可以使用is属性来声明一个扩展类型。

·当我们需要多个标签组合成新的元素时，我们可以使用自定义的元素标签，但是如果只是需要在原有的HTML标签上进行扩展的话，使用is的这种元素扩展的方式很优雅。

·新版本Custom Elements
    1.从原本的扩展prototype来定义元素调整为建议使用class extends的方式。
    2.注册自定义元素接口调整，更加方便使用，传入type和class即可。
    3.生命周期回调调整，createdCallback直接使用class的constructor。

·生命周期和回调调整
    1.constructor in class代替原本的createdCallback。
    2.connectedCallback代替原本的attachedCallback。
    3.disconnectedCallback代替原本的detachedCallback。
    4.adoptedCallback使用document.adoptNode(node)时触发。
    5.attributeChangedCallback和原本保持一致。
connect事件和插入元素到document是有区别的，主要是插入元素到document时，元素状态会变成connected，这时会触发connectedCallback。
