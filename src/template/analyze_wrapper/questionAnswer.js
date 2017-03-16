/**
 * 试题答案组件
 */

import style from '../../config/style';

import { answerItem } from '../../config/template';

export default
`
<div class="${style.answer}  ${style.clear}">
  <label class="${style.label}">
    {{config.labels.answer}}
  </label>
  <div class="${style.panel}">
    {{include '${answerItem}'}}
  </div>
</div>
`

