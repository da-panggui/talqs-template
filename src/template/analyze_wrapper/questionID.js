/**
 * 试题 ID 组件
 */

import style from '../../config/style';

export default 
`
<div class="${style.id}  ${style.clear}">
  <label class="${style.label}">
    {{config.labels.queId}}
  </label>
  <div class="${style.panel}">
    {{data.queId}}  
  </div>
</div>
`