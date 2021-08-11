·Shadow Dom：本质上来说是提供一个隔离组件代码作用域的方案，旨在提供一种更好地组织页面元素的方案。例如组件代码间的Css互不影响等。

·createShadowRoot()：为一个元素节点创建Shadow Root，这些元素类型必须是下列中的一个，否则会抛出错误。
    1.自定义的元素。
    2.article。
    3.aside。
    4.blockquote。
    5.body。
    6.div。
    7.header, footer。
    8.h1, h2, h3, h4, h5, h6。
    9.nav。
    10.p。
    11.section。
    12.span。
返回的Shadow Root对象从DocumentFragment继承而来，所以可以使用相关的方法。

·API：Shadow Root除了从DocumentFragment继承而来的属性和方法外，还多了以下属性：
    1.host，只读，用来获取Shadow Root所属的元素。
    2.innerHTML，用来获取或者设置里边的HTML字符串。
    3.assignedSlot，只读，这个元素如果被分配到了某个Shadow Dom里边的slot，那么会返回这个对应的slot元素。
    4.slot元素的slot属性，用来指定slot的名称。
    5.shadowRoot，只读，元素下面对应的Shadow Root对象。

·slot：在使用自定义标签时，可以传递子模版给到内部使用。
通过slot属性来让元素内部的slot占位符可以引用到对应值的元素，多个元素使用这个属性也是可以的。这样便拥有了使用标签从外部传template给到自定义元素的内部去使用。

·CSS相关：因为Shadow Dom很大程度上是为了隔离样式作用域而诞生的，即宿主文档中的样式规则不对Shadow Dom里的子文档生效，子文档中的样式规则也不影响宿主文档。但是可以通过Shadow Dom提供的伪类来改变这种情况。
    :host，用于在Shadow Dom内部选择到其宿主元素，当它不是在Shadow Dom中使用时，便匹配不到任何元素。
    :host(<selector>)，括号中是一个选择器，这个可以理解为是一个用于兼容在主文档和Shadow Dom中使用的方法，当这个选择器在Shadow Dom中时，会匹配到括号中选择器对应的宿主元素，如果不是，则匹配括号中选择器能匹配到的元素。
    :host-context(<selector>)，用于在Shadow Dom中来检测宿主元素的父级元素，如果宿主元素或者其祖先元素能够被括号中的选择器匹配的话，那么这个伪类选择器便匹配到这个Shadow Dom的宿主元素。个人理解是用于在宿主元素外部元素满足一定的条件时添加样式。
    ::shadow，这个伪类用于在Shadow Dom外部匹配其内部的元素。
    /deep/，这个伪类用于在Shadow Dom外部匹配其内部的元素。