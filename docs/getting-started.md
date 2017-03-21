# 快速上手

## 1. 引入 TalqsTemplate

``` html
<script src="talqsTemplate.js"></script>
```
或者

```js
import TalqsTemplate from 'talqsTemplate';
```

## 2. 进行模板渲染

```js
var questionHTMLString = TalqsTemplate.render({question, options});
```
参数 question 对应需要呈现的试题数据(必填)

参数 options 对应 TalqsTemplate 的配置对象


更多配置参见 [API 文档](api.md)

## 3. 填充到指定的 DOM
```js
var app = document.getElementById('app');
app.innerHTML = questionHTMLString;
```

## 4. 选择题自适应布局
```js
TalqsTemplate.autoLayout()
```