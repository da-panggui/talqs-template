/**
 * 试题知识点组件
 * 根据知识点生成一个树形结构
 */

import { stylePrefix, label, tree, clear }from '../../config/style';

import { knowledgePointItem } from '../../config/template';

export default
`
 <div class="${stylePrefix}_knowledgePoint ${clear}">
  <label class="${label}">
    {{config.labels.knowledgePoint}}
  </label>
  <div class="${tree}">
    <ul>
      {{each data.examOptionList}}
        {{include '${knowledgePointItem}' {data:$value} ''}}
      {{/each}}
    </ul>
  </div>
</div>
`

