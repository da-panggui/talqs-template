/**
 * 试题解析组件
 */

import { stylePrefix, label, panel, clear }from '../../config/style';

import { analyzeItem } from '../../config/template';

export default
    `
<div class="${stylePrefix}_analyze ${clear}">
  <label class="${label}">
    {{config.labels.analyze}}
  </label>
  <div class="${panel}">
    {{include '${analyzeItem}'}}
  </div>
</div>
`

