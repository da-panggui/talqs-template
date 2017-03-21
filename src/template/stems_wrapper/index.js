/**
 * 试题题干容器组件
 * 默认从配置对象中读取嵌套的子组件
 * 在这里题干容器指的是包括来源，难度，题干，选项等内容的容器
 * 详情参看 config/template.js 
 */

import style from '../../config/style';

import { components } from '../../config/template';

export default `
<div class="${style.stems} ${style.clear}">
 {{each config.templates['${components.StemsWrapper}']}}
    {{include $value}}
 {{/each}}
</div>
`