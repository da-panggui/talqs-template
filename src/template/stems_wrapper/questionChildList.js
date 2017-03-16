/**
 * 复合题子题模板，递归显示子题
 * 
 * data:    子题数据
 * config:  插件配置
 * index:   子题题号
 * isSub:   子题标记
 */

import style from '../../config/style';

import { stemsWrapper } from '../../config/template';

// 子题数据
const childData = '{data:$value,config:config,index:$index+1,isSub:true}'

export default 
`
{{ if data.childList }}
  <div class="${style.subqs}">
    {{each data.childList}}
      {{include '${stemsWrapper}' ${childData} ''}}
    {{/each}}
  </div>
{{/if}}
`