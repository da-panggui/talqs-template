# 常见问题

### 1. 如何使用 Talqs ?

关于基本使用方法请参考[快速上手](getting-started.md)

### 2. 如何修改默认配置 ？

关于默认配置请查看 [文档](api.md)

```js
import Talqs from 'talqs'
// 自定义配置
const config = {...}
// 试题数据
const question = {...}

Taqls.render(question, config)

```

### 3. 如何修改内置模板?

Talqs 有大量的[内置模板](template.md)，但由于业务需求的复杂性，很有可能需要覆盖内置的模板。


此时可以通过 ```registerCache``` 来实现覆盖某个内置模板

> 修改内置模板必须在渲染前进行

例如：内置的试题难度模板会根据试题难度值来输出对应数量的星星，如果需要输出 【 难度 5】 类似的格式则需要修改内置模板

```html
<script id="questionDifficulty" type="text/html">
  <div>【难度 {{data.difficulty}}】</div>
</script>
```


```js
import Talqs from 'talqs'
// 自定义配置
const config = {...}
// 试题数据
const question = {...}
// 获取自定义模板 innerHTML 并修改内置的模板
var overrideDifficultyTemplate = document.getElementById('questionDifficulty').innerHTML;
Taqls.registerCache({
  questionDifficulty: overrideDifficultyTemplate
})
Taqls.render(question, config)
```

或者直接在 js 中定义

```js
var overrideDifficultyTemplate = '<div>【难度 {{data.difficulty}}】</div>';
Taqls.registerCache({
  questionDifficulty: overrideDifficultyTemplate
})
Taqls.render(question, config)
```
