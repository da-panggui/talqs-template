/**
 * 单个知识点列表组件，递归显示
 */

import { components } from '../../config/template';

export default 
`
<li>
  {{data.name}}
  {{if data.childList}}
    <ul>
      {{each data.childList}}
        {{include '${components.KnowledgePointItem}' {data:$value} ''}}
      {{/each}}
    </ul>
  {{/if}}
</li>
`