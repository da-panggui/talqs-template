/**
 * 试题答案组件
 */

import { stylePrefix, label, panel, clear }from '../../config/style';

import { answerItem } from '../../config/template';

export default
`
<div class="${stylePrefix}_answer ${clear}">
  <label class="${label}">
    {{config.labels.answer}}
  </label>
  <div class="${panel}">
    {{include '${answerItem}'}}
  </div>
</div>
`

