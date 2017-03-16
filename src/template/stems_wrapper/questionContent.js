/**
 * 试题题干组件
 *
 * 题干可隐藏显示
 *
 * data.content               试题题干
 * data.hideContent           隐藏题干标示
 *
 */

import style from '../../config/style';

export default
`
{{if data.content && !data.hideContent}}
  <div class="${style.content} ${style.clear}">{{#data.content}}</div>
{{/if}}
`