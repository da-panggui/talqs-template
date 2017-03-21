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


- **`updateTemplateList(data)`**

  更新模板

  `data`   模板配置信息

      {
        '模板组件名称': {
          components: [
            {
              name: '新添加的子组件名称',
              template: '新添加子组件的模板字符串',
              index: '新添加子组件的显示位置，默认放到最后显示'
            },
            {
              name: '覆盖内置组件的名称',
              template: '覆盖内置组件的模板字符串',
              index: '覆盖内置组件新的显示位置，默认直接在原位置覆盖'
            },
            ...
          ],
          exclude: [] // 移除的子组件
        }
      }

- **`autoLayout(width: Number)`**

  选择题自动布局

  `width`  容器宽度


  
### TalqsTemplate 属性

- **version**

  - 类型: `String`

    TalqsTemplate 版本号

- **config**

  - 类型: `Object`

    TalqsTemplate 配置对象，详细信息参见 [配置](config.md)



  