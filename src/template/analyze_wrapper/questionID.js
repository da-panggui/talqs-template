/**
 * 试题 ID 组件
 */

import { stylePrefix, label, panel, clear }from '../../config/style';

export default 
`
<div class="${stylePrefix}_id ${clear}">
  <label class="${label}">
    {{config.labels.queId}}
  </label>
  <div class="${panel}">
    {{data.queId}}  
  </div>
</div>
`