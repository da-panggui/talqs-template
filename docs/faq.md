# 常见问题

### 1. 如何使用 TalqsTemplate ?

关于基本使用方法请参考[快速上手](getting-started.md)

### 2. 如何修改默认配置 ？

关于默认配置请查看 [文档](api.md)

```js
import TalqsTemplate from 'talqsTemplate'
// 自定义配置
const config = {...}
// 试题数据
const question = {...}

TalqsTemplate.render(question, config)

```

### 3. 如何修改内置模板?

TalqsTemplate 有大量的[内置组件和模板](template.md)，但由于业务需求的复杂性，很有可能需要覆盖内置的模板。


此时可以通过 ```registerTemplate``` 来实现覆盖或添加自定义模板

此时可以通过 ```registerComponent``` 来实现覆盖或者添加自定义组件

> 修改和添加模板必须在渲染前进行

具体参见 [Demo](https://hejinjun.github.io/talqs-template/dist/demo/)