/**
 * 试题解析组件
 */

import style from '../../config/style';

import { analyzeItem } from '../../config/template';

export default
    `
<div class="${style.analyze}  ${style.clear}">
  <label class="${style.label}">
    {{config.labels.analyze}}
  </label>
  <div class="${style.panel}">
    {{include '${analyzeItem}'}}
  </div>
</div>
`

