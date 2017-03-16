/**
 * 试题题号组件
 *
 * 试题题号组件只有在题号大于 0 的时候显示
 * 
 * 大题的题号需要从渲染配置对象 config 的 queIndex 字段传值
 * 小题的题号就是该题在子题列表中的索引值加 1
 *
 * 字段说明：
 *
 * index: 试题题号（Number 类型）
 *
 */

import style from '../../config/style';

export default
`
{{if index && index > 0}}
  <span class="${style.index}">
    {{index}}
  </span>
{{/if}}
`