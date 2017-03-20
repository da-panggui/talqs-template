/**
 * 试题选项组件模板
 * 
 * 试题的 answerOptionList 字段数据结构为二维数组
 * [
 *   // 第一行
 *   [
 *     {列 一...},
 *     {列 n ...}
 *   ], 
 *   ...
 *   // 第 n 行
 *   [
 *     {列 一...},
 *     {列 n ...}
 *   ], 
 * ]
 * 
 * 试题的 isCloze 标记是否是完型填空，完型填空需要在选项前添加对应的题号（行号）
 * 1. A.XXX B.XXX C.XXX D.XXX
 * n. A.XXX B.XXX C.XXX D.XXX
 *
 * data-auto-layout="1" : 试题选项自动布局的钩子
 */

import style from '../../config/style';

export default
`
{{ if data.answerOptionList && data.answerOptionList.length }}
  <div class="${style.options}">
    <ul class="${style.optionsList}" data-auto-layout="{{data.answerOptionList[0].length}}">
      {{each data.answerOptionList}}
        <li class="${style.optionsRows}">
          {{if data.isCloze}}
            <span class="${style.optionsIndex}">{{$index+1}}. </span>
          {{/if}}
          <ul class="${style.optionsColumns}_{{$value.length}} ${style.clear}">
            {{each $value}}
              <li class="${style.optionsItem} ${style.clear}">
                <span class="${style.optionsLabel}">{{$value.aoVal}}. </span>
                <div class="${style.optionsContent}">{{#$value.content}}</div>
              </li>
            {{/each}}
          </ul>
        </li>
      {{/each}}
    </ul>
  </div>
{{/if}}
`