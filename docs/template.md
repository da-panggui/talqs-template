# TalqsTemplate 模板结构配置

在 TalqsTemplate 中有两种类型的模板。[结构模板](#结构模板) 和 [组件](#组件)。两者的区别主要如下：

### 结构模板

结构模板是指以容器的方式存在的模板

在功能上结构模板自身不承载任何业务逻辑

在结构上结构模板由不定数量的组件模板组合构成

在 TalqsTemplate 的[模板结构配置](https://github.com/hejinjun/talqs-template/blob/master/src/config/template.js)中，我们按照结构将试题解构成了不同的组件模板进行拼装显示。

如果内置的模板结构不能满足业务需求，则可以通过 [registerTemplate](api.md) 自定义结构



### 组件

组件模板是一个独立的业务逻辑单元的封装

在功能上组件模板自身承载其独立的业务逻辑


### 内置的组件

TalqsTemplate 将试题的结构解构之后内置了常用的试题组件模板，在[源码](https://github.com/hejinjun/talqs-template/tree/master/src/template)中可以看到具体的组件定义信息

可以通过 [registerComponent](api.md) 添加自定义组件或者覆盖内置组件


