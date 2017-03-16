/**
 * 试题知识点组件
 * 根据知识点生成一个树形结构
 */

import style from '../../config/style';

import { knowledgePointItem } from '../../config/template';

export default
`
 <div class="${style.knowledgePoint}  ${style.clear}">
  <label class="${style.label}">
    {{config.labels.knowledgePoint}}
  </label>
  <div class="${style.tree}">
    <ul>
      {{each data.examOptionList}}
        {{include '${knowledgePointItem}' {data:$value} ''}}
      {{/each}}
    </ul>
  </div>
</div>
`

