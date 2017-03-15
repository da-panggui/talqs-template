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
 * 交互版特有属性
 * data-talqs-type:   组件交互类型
 * data-logic-type:   试题逻辑类型
 * data-que-id:       试题ID
 * data-option-group: 选项行 
 * data-option-item:  选项, 对应的值为A、B、C、D...
 */

import { stylePrefix } from '../../config/style';

/**
 * stylePrefix 样式类名前缀配置
 * @type {String}
 */
const main = `${stylePrefix}_options`

const style = {
  main,
  list: `${main}_list`,
  rows: `${main}_rows`,
  columns: `${main}_columns`,
  item: `${main}_columns_item`,
  index: `${main}_index`,
  label: `${main}_label`,
  content: `${main}_content`,
  clear: 'clearfix'
}

/**
 * [interaction 交互版配置]
 */

const interaction = {
  container: ['data-talqs-type="choice"',
              'data-que-id="{{data.queId}}"',
              'data-logic-type="{{data.logicQuesTypeId}}"',
             ],
  group: ['data-option-group="{{$index}}"'],
  item: ['data-option-item="{{$value.aoVal}}"']
}


const getAttr = (key) => {
  return interaction[key].join(' ');
}

export default
`
{{ if data.answerOptionList }}
    <div class="${style.main}" 
      {{if config.interactive && (data.logicQuesTypeId == 1 || data.logicQuesTypeId == 2) }}
        ${getAttr('container')}
      {{/if}}>
    <ul class="${style.list}">
      {{each data.answerOptionList }}
        <li class="${style.rows}">
          {{if data.isCloze }}
            <span class="${style.index}">{{$index+1}}. </span>
          {{/if}}
          <ul class="${style.columns}_{{$value.length}} ${style.clear}" 
            {{if config.interactive && (data.logicQuesTypeId == 1 || data.logicQuesTypeId == 2) }}
              ${getAttr('group')}
            {{/if}}>
            {{each $value}}
              <li class="${style.item} ${style.clear}" 
                {{if config.interactive && (data.logicQuesTypeId == 1 || data.logicQuesTypeId == 2) }}
                  ${getAttr('item')}
                {{/if}}>
                <span class="${style.label}">{{$value.aoVal}}. </span>
                <div class="${style.content}">{{#$value.content}}</div>
              </li>
            {{/each}}
          </ul>
        </li>
      {{/each}}
    </ul>
  </div>
{{/if}}
`