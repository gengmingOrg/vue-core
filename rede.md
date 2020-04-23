分享人：1班-北京梯队-耿明
分享时间：4月23号 19:00

分享主题：《关于vue一点点思考》

分享大纲：
1.什么是vue，自己的理解
2.vue变化侦的实现

正文：
自己介绍
【关于我】大家好，我是耿明，坐标北京朝阳。90后，很开心可以认识大家并一起学习进步。
【关于工作】工作3年，前端小白。
【工作之外】教你怎么做出更难吃的食物。
前端菜鸟一枚，第一次分享，那些地方不足和不对的地方，大家多多指正

首先来简单说一下 响应式式框架之前咱们使用的JavaScript函数库jQuery
jQuery：
早期的jQuery库之所以获得开发者们的认可，很大程度上是因为它独创的链式语法和隐式迭代语义。尽管jQuery仅仅通过巧妙设计API就能支持上述特性，并不依赖于编程语言赋予的元编程能力，但是毫无疑问，它以一种精巧的设计理念和思路，为JavaScript库和框架的设计者打开了一扇创新的大门。
不足：今天的Web产品对构建用户界面的要求越来越高，jQuery的方式不能满足构建复杂用户界面的需要和新的UI框架快速发展
为了解决这些不足开发出 现在的渐进式框架 vue react 等等。
vue是什么？
多用途、高性能、渐进式的带有元编程特征的js框架

那什么是元编程？
所谓元编程，简单来说，是指框架的作者使用一种编程语言固有的语言特性，创造出相对新的语言特性，使得最终使用者能够以新的语法和语义来构建他们的应用程序，从而在某些领域开发中获得更好的开发体验。

那什么又是渐进式框架呢？
所谓的渐进式框架，就是把框架分层，vue分为了，视图渲染层、组件机制、路由机制、状态管理、构建工具  ，然后可以根据你的需要选择不同的层级。

那vue有那些特点呢？
动态绑定属性和变化侦测、内置模板和依赖于模板语法的声明式渲染、可扩展的指令、支持嵌套的组件，这些原生JavaScript并不具备的特征和能力被一一融入，框架的使用者在使用Vue.js开发Web应用时，事实上获得了超越JavaScript原生语言特性的能力。尽管Vue.js框架赋予开发者众多特性和能力，但它仍然是使用原生JavaScript实现的应用框架。

今天说下变化侦测
引用官方文档 的话为什么要理解变化侦测：
vue.js 最独特的特性之一就是看起来并不显眼的响应式系统，数据模型仅仅是普通的js对象，而当你修改他们时，视图会进行更新，这使得状态管理非常的简单、直接。不过理解其工作原理同样重要，这样你可以回避一些常见问题

工作原理：
这是我自己画的一个图 表示的是对象转化成 响应式数据的过程：
图片: https://uploader.shimo.im/f/Wo9qtQbzm0MKRjO0.png
什么是变化侦测：
简单来说，变化侦的作用就是侦测数据的变化。

如何追踪变化 这是 3.0以前版本的实现 ，3.0的实现后面简单说一下；
图片: https://uploader.shimo.im/f/cN13zPjrDdB3LSoQ.png
三个问题：
第一 Observer是干什么的？Data通过Observer转换成了getter/setterde 形式来追踪变化
Dep 是什么？保存依赖的地方
依赖是谁

图片: https://uploader.shimo.im/f/yPTJXyHOCRZg3rHf.png
只要把用到title 的地方收集起来，然后在改变的时候去 通知它 这就是依赖
在getter中收集依赖，在setter中触发依赖

依赖收集在哪里
图片: https://uploader.shimo.im/f/ezmrWDwL6hoqsMit.png

什么是Watcher
图片: https://uploader.shimo.im/f/NJZEF00VrJIcOCKA.png
1.这里面的parsePath的参数其实可以接受function ，就是把这个方法直接给这个gettter  就可以
2.这里面的执行顺序：
1 得到value的时候 就会去调用get()方法，
2这就会把自己挂到在 window.target 上  这样你去读取vm 的时候就会触发 Object.definedProperty 里面的 这个对象这个key 值的 get 方法，这就把依赖放进了Dep里面图片: https://uploader.shimo.im/f/jPaMkqRVY2QUMhBj.png
就是上面这个方法
图片: https://uploader.shimo.im/f/wcydkBgVaO4XfwXG.png
3 当数据改变的时候 就会触发 上图的 set 方法 然后进行更新，通知

Observer
递归侦测所有的Key
图片: https://uploader.shimo.im/f/9WcmBBCANyBrlxRk.png
关于Object 的问题?
这个变化侦不能监听 data新添加的属性，和删除属性。
这就是因为 Object.definedProperty  这个Api不支持

vue 3 的优化修改
例如：virtualDom、Tree-shaking、Compostion Api（网址：https://vue-composition-api-rfc.netlify.app/）等等 有兴趣的同学可以去看看。
es6 出现了 proxy，可以在语言层面做出修改
图片: https://uploader.shimo.im/f/VTjoFpro7zjd6k5a.png
图片: https://uploader.shimo.im/f/J70aqAgrDvLTmLcl.png

思考题：
用es6的proxy修改收集变化侦的部分，
自己添加把数组变成响应式的方法，应该怎么写?
大体来说就是两个问题：
1.在什么地方收集依赖
2.在什么地方触发依赖
好了一下总结：
Data通过Observer转换成了getter/setterde 形式来追踪变化
当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。
当数据变化时，会触发setter，从而向Dep中的依赖发送通知
Watcher接受通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数
谢谢大家
代码地址：https://github.com/gengmingOrg/vue-core
