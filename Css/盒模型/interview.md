Css盒模型
一.Css盒模型的意义。
浏览器在渲染的过程中，会根据Css盒模型规则将所有元素描绘成一个盒子，并且根据Css盒模型规则对这个盒子的大小、位置和样式进行描绘。

二.Css盒模型分为W3C标准盒模型和IE怪异盒模型两类。
1.W3C标准盒模型：Css盒模型默认形式，特点width/height = content（内容）width/height。
2.IE怪异盒模型：特点width/height = content（内容）width/height + padding + border。

三.如何设置盒模型类别
1.box-sizing属性：
（1）content-box：默认的W3C标准盒模型。
（2）border-box：IE怪异盒模型。
2.IE浏览器中不设置DocType会导致Css盒模型默认使用IE怪异盒模型。