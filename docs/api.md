# API 参考

### TalqsTemplate 方法

- **`render(data: Object, config: Object, index: Number)`**

  按照配置渲染一个试题并返回 HTML 字符串

- **`registerHelper(name: String, fn: Function)`**

  注册 art-template 模板的公用辅助方法

- **`registerComponent(components: Object)`**

  添加组件模板

- **`registerTemplate(key: String, list: Array, isEntry: Boolean)`**

  添加结构模板

- **`resetComponent(keys)`**

  重置内置组件模板

  
### TalqsTemplate 属性

- **version**

  - 类型: `String`

    TalqsTemplate 版本号

- **config**

  - 类型: `Object`

    TalqsTemplate 配置对象，详细信息参见 [配置](config.md)



  