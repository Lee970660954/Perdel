1.MVC和MVVM区别？
MVC：是Model（模型） View（视图） Controller（控制器）的缩写，是服务端分层开发的概念，本质上是用一种将数据、界面显示、业务逻辑分离的方法组织代码的软件开发设计典范。
（1）Model：数据层，负责操作数据库，执行数据的CRUD，职能单一。
（2）View：视图层，每当用户操作界面，就需要进行业务的处理，都会通过网络请求去服务端请求服务器。
（3）Controller：业务逻辑层，作为中间人负责数据层和视图层的交互。
总结：MVC模型中，Model、View，Controller三者是完全独立分开的，并且Model和View是完全隔离的，虽然Model不依赖于View，但是View是依赖于Model的，两者由Controller这个中间人负责交互。

MVVM：是Model（模型） View（视图） ViewModel（调度者）的缩写，是客户端视图层分离的概念，本质上是将其中的View的状态和行为抽象化，让我们将视图UI和业务逻辑分开。
（1）Model：MVVM中的M保存的是每个页面中单独的数据。
（2）View：MVVM中的V就是每个页面中的HTML结构。
（3）ViewModel：MVVM中的VM是一个调度者，分离了Model和View，每当View需要获取或者保存数据时，都要通过VM做中间的处理。
总结：VM是MVVM的核心，是M和V之间的调度者，数据的双向绑定是由VM完成的。

MVVM与MVC的区别是，MVVM实现了View和Model的自动同步，不用手动操作Dom，即Model变化时View可以实时更新，View变化也能改变Model。

为什么官网说Vue没有完全遵循MVVM思想呢？
因为严格的MVVM要求View不能和Model直接通信，而View提供了$refs这个属性，让Model可以直接操作View，违反了这一规定，所以说Vue没有完全遵循MVVM。

2.组件中的data为什么是一个函数？
组件中的data写成一个函数，将data以函数返回值的形式定义，这样每复用一次组件，就会返回一份新的data，类似于为每个组件实例创建了一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了同一份data，就会造成一个变了全都会变的结果。

3.Vue组件通讯有哪些方式？
（1）props和$emit，适用于父子组件通讯，父组件通过props向子组件传递数据，子组件则是通过$emit触发事件向父组件传递数据。
（2）eventBus，通过创建一个空的Vue实例并挂载到Vue原型中的方式，创建一个中央事件总线，通过$on监听事件，通过$emit触发事件，适用于兄弟组件间或者任意层级组件间的通讯，非常灵活。
（3）Vuex，Vue统一状态管理工具，提供了state、mutation、action、getter和module等API。
（4）provide/inject，父组件通过provide来提供变量，子组件通过inject来注入变量。
（5）$refs：$refs可以获取组件实例，进而获取和改变组件数据。
（6）$parent/$children，分别可获取当前组件的父组件和子组件实例，进而获取和改变组件数据。

4.Vue的生命周期方法有哪些？一般在哪一步发请求？
（1）beforeCreate：在实例初始化之后，实例完成数据观测和事件配置之前被调用。在当前阶段，data、methods、computed以及watch都不能访问。
（2）created：在实例创建完成之后被调用。在当前阶段，实例已完成数据观测、属性和方法的运算，watch/event事件回调。但是此时此时还不能操作Dom，因为实例没有完成挂载，如果非要与Dom进行交互，可以通过vm.$nextTick来在实例完成挂载后第一时间访问Dom。
（3）beforeMount：在挂载开始之前被调用。render函数首次被调用。
（4）mounted：在挂载完成之后被调用。在当前阶段，真实Dom挂载完成，数据双向绑定完成。
（5）beforeUpdate：数据更新时，虚拟Dom重新渲染和打补丁之前被调用。在当前阶段，允许在这个阶段进一步更改状态，而不会触发附加的重渲染。
（6）updated：Dom更新完成之后被调用。在当前阶段，Dom已完成更新，要避免在此阶段更改数据而导致无限循环的更新。
（7）beforeDestroy：在实例销毁之前被调用。在当前阶段，实例仍然完全可用，可以在这个阶段进行善后收尾，比如清除计时器等。
（8）destroyed：实例销毁之后被调用。在当前阶段，实例中的所有内容都会解绑，所有事件监听会被移除，所有子实例被销毁。
（9）activated：keep-alive专属，组件被激活时调用。
（10）deactivated：keep-alive专属，组件切换为非激活状态时调用。

可以在生命周期方法created、beforeMount、mounted中进行异步请求，因为这三个生命周期方法中，data已被创建，可以对其进行进一步赋值。

5.v-if和v-show的区别？
v-if：
（1）在编译过程中，会被转化成三元表达式，条件不满足时不渲染节点。
（2）适用场景方面，v-if适用于不需要频繁切换条件的场景。
v-show：
（1）在编译过程中，会被编译成指令，条件不满足时控制样式将对应节点隐藏（display：none）。
（2）适用场景方面：v-show适用于需要非常频繁切换条件的场景。

display：none，visibility：hidden和opacity：0之间的区别？
三者的共同点都是隐藏，区别如下：
是否占据空间
display：none，不占据空间。
visibility：hidden，占据空间。
opacity：0，占据空间。
是否被子元素继承
display：none，不继承，但是父元素不存在了，子元素也就不存在了。
visibility：hidden，继承，可以通过设置子元素visibility：visible来显示子元素。
opacity：0，继承，不能通过设置子元素opacity：1来重新显示。
是否触发绑定事件
display：none，不能触发。
visibility：hidden，不能触发。
opacity：0，能触发。
是否支持过渡动画
display：none，不支持。
visibility：hidden，不支持。
opacity：0，支持。

6.说说vue内置指令
（1）v-bind：绑定属性，动态更新HTML元素或组件上的属性。
（2）v-on：绑定事件，用于监听事件。
（3）v-if/v-else-if/v-else：在render函数中就是三元表达式，可以配合template使用。
（4）v-show：通过控制元素或组件的display属性进行显隐。
（5）v-for：循环指令，用于渲染列表，优先级高于v-if，不建议一起使用，可以使用计算属性解决共同使用的场景，一定要增加key。
（6）v-html：更新元素的innerHTML。
（7）v-text：更新元素的textContent。
（8）v-cloak：这个指令保持在元素上直到关联实例结束编译，解决初始化慢导致的页面闪动的问题。
（9）v-once：绑定该指令的元素或组件只渲染一次，包括元素或组件的所有子节点，首次渲染后，不再随数据的变化重新渲染，将被视为静态内容。
（10）v-pre：绑定这个指令的元素，在编译过程中，会跳过这个元素以及子元素的编译过程，以此来加快整个项目的编译速度。
（11）v-model：value和input的语法糖。

7.怎样理解Vue的单向数据流？
数据总是从父组件传到子组件，子组件无权修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止子组件意外改变父组件的状态，从而导致应用的数据流向难以理解。

8.computed和watch的区别和适用场景？
computed是计算属性，依赖其他属性来计算自己的值，并且computed的值有缓存，只有当计算值变化才会返回内容。
watch是侦听属性，监听某个属性的变化，监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作，并且watch的值没有缓存。
计算属性一般用在模版渲染中，某个值是依赖了其他的响应式对象甚至是计算属性计算而来的。而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。

9.v-if和v-for为什么不建议一起使用？
v-for和v-if不建议在同一个标签中使用，因为在编译时先解析v-for再解析v-if。

10.Vue2.x响应式数据的原理？
Vue2.x响应式数据，即数据双向绑定，数据更新，视图随之更新；视图更新，数据随之更新。
核心概念是数据劫持和观察者模式。
创建Vue实例时，Vue构造函数会去执行两个操作，一个是完成数据劫持，一个是完成模版解析和编译。
数据劫持：
（1）定义Watcher类，Watcher实例有vm（vue实例）、node（依赖属性的dom），key（node依赖的属性名）三个属性，有get（获取依赖的属性值）和update（更新node依赖的属性值）两个方法。
（2）定义Dep类，Dep实例与data中的属性一一对应，有subs（用于存储收集的依赖）属性，有notify（遍历所有收集的依赖，并调用依赖的update方法更新node依赖的属性值），用于收集页面中使用对应属性的依赖（watcher），并且当对应属性值更新时，通知所有依赖（观察者）进行更新。
（3）遍历实例data中的所有属性，并使用Object.defineProperty API将属性在实例上重新定义，主要是定义属性的访问器属性getter和setter，并且为每个属性创建一个Dep实例用于收集依赖。
getter用于收集依赖，setter用于派发更新。

模版解析和编译：
（1）遍历el选择器对应的Dom下的所有子元素，对每个子元素进行解析和编译，子元素的属性如果使用了data中的属性，则创建依赖，并将属性值和Dom结合返回。
（2）上述操作结束后，将所有子元素放入documentFragment中，并append到el中。

完成～～～。

11.Vue如何检测数组变化？
考虑性能的因素，Vue2.x中没有使用Object.defineProperty对数组的每一项进行劫持，而是选择对7种数组原型方法进行重写。因此在Vue中修改数组的索引和长度是无法监控到变化的，只能通过调用数组被重写的原型方法来触发数组对应的watcher进行更新。

12.Vue3.x了解多少？
（1）Vue3.x的响应式原理使用Proxy替代了Vue2.x版本的Object.defineProperty。

13.Vue3.0和Vue2.0响应式原理的区别？
Vue3.x改用Proxy替代Object.defineProperty来实现响应式。
（1）因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。
（2）Object.defineProperty只能监听到事先定义好的属性，对于后添加的属性需要使用Vue.$set方法才能实现响应式。

14.Vue父子组件的生命周期钩子函数的执行顺序？
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed
（1）加载渲染过程：
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
（2）父组件更新过程：
父beforeUpdate -> 父updated
（3）子组件更新过程：
父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
（4）销毁过程:
父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed

15.虚拟Dom是什么？有什么优缺点？
虚拟Dom（Virtual Dom）本质上是用一个原生JS对象来描述一个Dom节点，是对真实Dom的一层抽象。
由于在浏览器中操作Dom是很昂贵的，频繁操作Dom，会产生一定的性能问题，这就是虚拟Dom的产生原因。
优点：
（1）保证性能下限：框架的虚拟Dom需要适配任何上层API可能产生的操作，所以它的一些Dom操作的实现必须是普适的，所以它的性能并不是最优的。但是比起粗暴的Dom操作来说，性能要好很多，因此框架的虚拟Dom至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能下限。
（2）跨平台：虚拟Dom本质上是JS对象，而Dom与平台强相关，相比之下虚拟Dom可以进行更方便的跨平台操作。

缺点：
（1）无法进行极致优化：虽然虚拟Dom+合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟Dom无法进行针对性的极致优化。
（2）首次渲染大量Dom时，由于多了一层虚拟Dom的计算，会比innerHTML插入慢。

16.v-model原理？
v-model只是语法糖而已。v-model在内部为不同的元素使用不同的property和event。对于组件来说也是如此。
（1）text和textarea元素使用value property和input event。
（2）checkbox和radio使用checked property和change event。
（3）select使用value property和change event。

17.v-for为什么要加key？
如果不加key，在实例数据更新时，虚拟Dom进行子节点diff更新视图的过程中，会采用一种最粗暴的方式进行视图更新，不会对可复用节点进行复用。除此之外，key是Vue中node的唯一标记，通过key，会使得diff操作更准确、更快速。
（1）更准确：加key就不是简单的就地服用，在sameNode函数中，a.key === b.key会更加准确。
（2）更快速：利用key的唯一性生成的map对象来获取对应节点，比遍历方式更快。

18.Vue事件绑定原理？
原生事件绑定是通过addEventListener绑定给真实元素，组件事件绑定是通过Vue自定义的$on实现的。如果要在组件上使用原生事件，需要加.native修饰符，这样就相当于在父组件中把子组件当作普通html标签，然后加上原生事件。
$on、$emit是基于发布订阅模式，维护一个事件中心，on的时候将事件按名称存在事件中心里，称之为订阅者，然后emit将对应的事件进行发布，去执行事件中心里的对应的监听器。

？19.vue-router路由钩子函数是什么？执行顺序是什么？
路由钩子函数的种类有：全局守卫、路由守卫、组件守卫。
完整的导航解析流程：
（1）导航被触发。
（2）在失活的组件里调用beforeRouteLeave守卫。
（3）调用全局的beforeEach守卫。
（4）在重用的组件里调用beforeRouteUpdate守卫。
（5）在路由配置里调用beforeEnter。
（6）解析异步路由组件。
（7）在被激活的组件里调用beforeRouteEnter。
（8）调用全局的beforeResolve守卫。
（9）导航被确认。
（10）调用全局的afterEach钩子。
（11）触发Dom更新。
（12）调用beforeRouteEnter守卫中传给next的回调函数，创建好的组件实例会作为回到函数的参数传入。

20.vue-router动态路由是什么？有什么问题？
动态路由就是在vue-router的路由路径中使用“动态路径参数”。
缺点是有组件服用导致路由参数失效的问题。
解决方法：
（1）通过watch监听路由参数的变化，进而重新发送请求。
（2）在router-view组件中用:key来阻止复用。

21.谈一下对Vuex的个人理解？
Vuex是专门为Vue提供的全局状态管理系统，用于多个组件中数据共享。内部核心原理是通过创建一个全局实例完成的。
主要包括以下几个API：
（1）State：用于定义应用状态的数据结构，设置默认的初始状态。
（2）Getter：允许组件从Store中获取数据，mapGetters辅助函数仅仅是将Store中的Getter映射到局部计算属性。
（3）Mutation：是唯一更改Store中状态的方法，且必须是同步函数。
（4）Action：用于提交mutation，而不是直接变更状态，可以包含任意异步操作。
（5）Module：允许将单一的Store拆分成多个Store且同时保存在单一的状态树中。

22.Vuex页面刷新数据丢失怎么解决？
需要结合前端本地存储来做Vuex的数据持久化，比如sessionStorage、localStorage或者cookie。第三方插件vuex-persist。

23.Vuex为什么要分模块并且加命名空间？
由于Vuex使用的是单一状态树，应用的所有状态会集中到一个比较大的对象中。当应用变得非常复杂时，store对象就变得相当臃肿。为了解决这个问题，Vuex允许将store分割成模块，每个模块拥有自己的state、mutation、action、getter，甚至是嵌套子模块。

默认情况下，模块内部的action、mutation和getter是注册在全局命名空间中的（这样使得多个模块能够对同一mutation或action作出响应）。如果希望模块具有更高的封装度和复用性，可以通过添加namespaced: true的方式使其成为带命名空间的模块。当模块被注册后，它的所有getter、action及mutation都会自动根据模块注册的路径调整命名。

？24.使用过Vue SSR吗？
SSR是服务端渲染（Server Side Render）的简称，本质上是将Vue在客户端把标签渲染成HTML的工作放在服务端来完成，然后再把HTML直接返回给客户端。
优点：
（1）更好的SEO。
（2）更快的首屏加载速度。
缺点：
（1）开发条件会受到限制，SSR只支持beforeCreate和created两个钩子，并且应用程序也需要处于Node.js环境。
（2）服务器会有更大的负载需求。

25.Vue中使用了哪些设计模式？
（1）工厂模式：传入参数即可创建实例。
虚拟Dom根据参数的不同返回基础标签的Vnode和组件的Vnode。
（2）单例模式：整个程序有且仅有一个实例。
Vuex和Vue-router的插件注册方法install判断如果系统存在实例就直接返回。
（3）发布-订阅模式：Vue事件机制。
（4）观察者模式：响应式数据原理。
（5）装饰模式：@装饰器的用法。

26.你都做过哪些Vue的性能优化？
（1）data中的对象层级不要过深。
（2）不需要响应式的数据不要放在data中。
（3）v-if和v-show区分场景使用。
（4）computed和watch区分场景使用。
（5）v-for遍历必须加key，key最好是id值，且避免同时使用v-if。
（6）组件销毁时，把全局变量和事件销毁，防止内存泄漏。
（7）图片懒加载。
（8）第三方依赖的按需引入。
（9）适当使用keep-alive缓存组件。
（10）防抖、节流的使用。

27.Vue.mixin的使用场景和原理？
可以通过Vue的mixin功能抽离公共的业务代码，当组件初始化时会调用mergeOptions方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行合并。

28.nextTick的使用场景和原理？
nextTick中的回调是在下次Dom更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的Dom。原理是采用微任务优先的方式调用异步方法去执行nextTick包装的方法。

29.keep-alive的使用场景和原理？
keep-alive是Vue的一个内置组件，可以实现组件缓存，当组件进行切换时不会对当前组件进行销毁。
（1）include/exclude属性，允许组件有条件的进行缓存。
（2）activated/deactivated生命周期，用来对当前组件处于活跃状态/离开活跃状态进行处理。
（3）keep-alive中还运用了LRU算法，选择最近最久未使用的组件予以淘汰。
LRU的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件key重新插入到this.keys尾部，这样一来，this.keys中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即this.keys中第一个缓存的组件。

30.Vue.set方法原理？
在两种情况下，修改数据，Vue是不会触发视图更新的，Vue.set方法就是为了解决这个问题。
（1）在实例创建后，添加新的属性到实例上。
（2）直接更改数组的下标来修改数组的值。
其原理如下：
当给对象新增不存在的属性时，首先会把新的属性进行响应式跟踪，然后触发属性的dep收集到的watcher去更新。当修改数组索引时，会调用数组本身的splice方法去更新数组。

？31.Vue.extend作用和原理？
Vue.extend使用基础Vue构造器，创建一个“子类”。参数是一个包含组件选项的对象。
实现思路就是使用原型继承的方式返回了Vue的子类，并且利用mergeOptions把传入组件的options和父类的options进行了合并。

？32.写过自定义指令吗？原理是什么？
指令本质上就是装饰器，是Vue对HTML元素的扩展，给HTML元素增加自定义功能。Vue编译Dom时，会找到指定对象，执行指令相关方法。
自定义指令有五个生命周期，分别是bind、inserted、update、componentUpdated，unbind。
（1）bind：只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置。
（2）inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
（3）update：被绑定的元素所在的模版更新时调用，而无论绑定的值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模版更新。
（4）componentUpdated：被绑定元素所在模版完成一次更新周期时调用。
（5）unbind：只调用一次，指令与元素解绑时调用。
原理：
（1）在生成ast语法树时，遇到指令会给当前元素添加directives属性。
（2）通过genDirectives生成指令代码。
（3）在patch前将指令的钩子函数提取到cbs中，在patch过程中调用对应的钩子函数。
（4）当执行指令对应的钩子函数时，调用对应指令定义的方法。

33.Vue修饰符有哪些？
事件修饰符：
（1）.prevent 阻止标签默认行为
（2）.stop 阻止事件继续传播。
（3）.capture 使用事件捕获模式，即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理。
（4）.self 只当在event.target是当前元素自身触发时处理函数。
（5）.once 事件将只会触发一次。

v-model的修饰符
（1）.lazy 当事件转变为change事件再同步
（2）.number 自动将用户的输入值转化为数值类型
（3）.trim 自动过滤用户输入的首尾空格

键盘事件的修饰符
（1）.enter
（2）.tab
（3）.delete
（4）.esc
（5）.space
（6）.up
（7）.down
（8）.left
（9）.right

系统修饰符
（1）.ctrl
（2）.alt
（3）.shift
（4）.meta

鼠标按钮修饰符
（1）.left
（2）.right
（3）.middle

？34.Vue模版编译原理？
Vue的编译过程就是将template转化为render函数的过程，分为以下三步：
（1）将模版字符串转换成element ASTs。（解析器）
（2）对AST进行静态节点标记，主要用来做虚拟Dom的渲染优化。（优化器）
（3）使用element ASTs生成render函数代码字符串。（代码生成器）

？35.生命周期钩子是如何实现的？
Vue的生命周期钩子核心实现是利用发布订阅模式先把用户传入的生命周期钩子函数订阅好（内部采用数组的方式存储），然后在创建实例的过程中会一次执行对应的钩子方法。

？36.函数式组件使用场景和原理？
函数式组件与普通组件的区别：
（1）函数式组件需要在声明组件时指定 functional: true。
（2）不需要实例化，所以没有this，this通过render函数的第二个参数context来代替。
（3）没有生命周期钩子函数，也不能使用计算属性和watch。
（4）不能通过$emit对外暴露事件，调用事件只能通过context.listeners.click的方式调用外部传入的事件。
（5）因为函数式组件是没有实例化的，所以在外部通过ref去引用组件时，实际引用的是HTMLElement。
（6）函数式组件的props可以不用显示声明，所以没有在props里面声明的属性都会被自动隐式解析为prop，而普通组件所有未声明的属性都解析到$attrs里面，并自动挂载到组件根元素上面。

优点：
（1）由于函数式组件不需要实例化、无状态，没有生命周期，所以渲染性能好于普通组件。
（2）函数式组件结构比较简单，代码结构更清晰。

适用场景：
（1）一个简单的展示组件，作为容器组件使用，比如router-view就是一个函数式组件。
（2）“高阶组件”，用于接收一个组件作为参数，返回一个被包装过的组件。

37.能说下vue-router中常用的路由模式实现原理吗？
hash模式：
（1）hash的值实际上就是#后面的内容，hash虽然出现在url中，但不会被包含在http请求中，对服务端没有影响，因此改变hash不会重载页面。
（2）可以为hash的改变添加监听事件。
window.addEventListener("hashchange", funcRef, false)
每一次改变hash，都会在浏览器的访问历史中增加一个记录，利用hash的以上特点，就可以实现前端路由“更新视图但不重新请求页面”的功能了。

history模式：
利用HTML5 History Interface中新增的pushState()和replaceState()方法。
这两个方法应用于浏览器的历史记录栈，在当前已有的back、forward、go的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同特点，当调用它们修改浏览器历史记录栈后，虽然当前url改变了，但是浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。


38.diff算法？
～