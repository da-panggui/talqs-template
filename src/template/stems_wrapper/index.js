/**
 * 试题题干容器组件
 * 默认从配置对象中读取嵌套的子组件
 * 在这里题干容器指的是包括来源，难度，题干，选项等内容的容器
 * 详情参看 config/template.js 
 */

import { stylePrefix }from '../../config/style';

import { stemsWrapper } from '../../config/template';

const styleMain = `${stylePrefix}_main`;

export default `
<div class="${styleMain}">
 {{each config.templates['${stemsWrapper}']}}
    {{include $value}}
 {{/each}}
</div>
`