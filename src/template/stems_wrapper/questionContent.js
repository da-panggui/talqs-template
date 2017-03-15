/**
 * 试题题干组件
 *
 * 题干可隐藏显示
 *
 * data.content               试题题干
 * data.hideContent           隐藏题干标示
 *
 * 交互版
 * data-que-id                试题ID
 * data-talqs-type="blank"    标记为填空题
 */

import { stylePrefix }from '../../config/style';

const styleMain = `${stylePrefix}_content clearfix`;

export default
`
{{if data.content && !data.hideContent}}
  {{if config.interactive && data.logicQuesTypeId == 4}}
    <div class="${styleMain}" data-talqs-type="blank" data-que-id="{{data.queId}}">
      {{#data.content | transfromBlankContent:data.logicQuesTypeId}}
    </div>
  {{else}}
    <div class="${styleMain}">
      {{#data.content}}
    </div>
  {{/if}}
{{/if}}
`