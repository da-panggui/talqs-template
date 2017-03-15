# TalqsTemplate 配置

- **analyzeVersion**

  - 类型: `Number`

    TalqsTemplate 试题解析显示版本

    0: 不显示解析(默认)

    1: 子题显示 

    2: 大题显示

- **hideSource**

  - 类型: `Boolean`

    是否隐藏试题来源，默认为 `false`

- **hideDifficulty**

  - 类型: `Boolean`

    是否隐藏试题难度，默认为 `false`

- **templates**

  - 类型: `Object`

    插件模板结构配置，详细资料参见[模板结构配置](template.md#模板结构配置)

- **labels**

  - 类型: `Object`

    常用文字标题配置，细资料参见[文字标签配置](label.md#模板结构配置)

- **entryTemplate**

  - 类型: `String`

    入口模板名称，默认为 `question`

- **queIndex**

  - 类型: `Number`

    试题题号，默认为 0

- **interactive**

  - 类型: `Boolean`

    交互版本标示，默认为 `false`