/**
 * 单个知识点列表组件，递归显示
 */

import { knowledgePointItem } from '../../config/template';

export default 
`
<li>
  {{data.name}}
  {{if data.childList}}
    <ul>
      {{each data.childList}}
        {{include '${knowledgePointItem}' {data:$value} ''}}
      {{/each}}
    </ul>
  {{/if}}
</li>
`