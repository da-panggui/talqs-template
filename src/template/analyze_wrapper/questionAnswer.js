/**
 * 试题答案组件
 */

import style from '../../config/style';

import { components } from '../../config/template';

export default
`
<div class="${style.answer}  ${style.clear}">
  <label class="${style.label}">
    {{config.labels.answer}}
  </label>
  <div class="${style.panel}">
    {{include '${components.AnswerItem}'}}
  </div>
</div>
`

