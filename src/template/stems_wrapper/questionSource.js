/**
 * 试题来源组件
 * 
 * 备注：试题来源显示只适用于大题
 *      复合题子题不显示试题来源
 *
 * 字段说明：
 * 
 * isSub:               复合题子题标示
 * 
 * data:                试题数据
 * data.queSource:      试题来源
 * 
 * config:              渲染配置对象
 * config.hideSource:   隐藏来源标示
 */

import { stylePrefix }from '../../config/style';

export default
`
{{if !isSub && !config.hideSource}}
  <div class="${stylePrefix}_source">
    {{data.queSource}}
  </div>
{{/if}}
`