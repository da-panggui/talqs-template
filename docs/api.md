# API 参考

### TalqsTemplate 方法

- **`render(data: Object, config: Object)`**

  按照配置渲染一个试题并返回 HTML 字符串

  `data`    试题数据

  `config`  自定义配置

- **`registerHelper(name: String, fn: Function)`**

  注册 art-template 模板的公用辅助方法

  `name`    helper 名

  `fn`      helper 定义


- **`registerComponent(components: Object)`**

  添加组件

  `components` 组件对象

  `key`: 组件名称

  `value`: 组件模板字符串

- **`registerTemplate(key: String, list: Array)`**

  添加结构模板

  `key`    模板名称

  `list`   内嵌组件列表


<!-- - **`updateTemplateList(key: String, list: Array)`**

  添加结构模板

  `key`    模板名称

  `list`   内嵌组件列表 -->


<!-- - **`resetComponent(keys)`**

  重置内置组件模板 -->

  
### TalqsTemplate 属性

- **version**

  - 类型: `String`

    TalqsTemplate 版本号

- **config**

  - 类型: `Object`

    TalqsTemplate 配置对象，详细信息参见 [配置](config.md)



  