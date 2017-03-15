/**
 * 试题难度组件
 * 
 * 备注：试题难度显示只适用于大题
 *      复合题子题不显示试题难度
 *
 * 字段说明：
 * 
 * isSub:                   复合题子题标示
 * 
 * data:                    试题数据
 * data.difficulty:         试题难度
 * 
 * config:                  渲染配置对象
 * config.hideDifficulty:   隐藏难度标示
 */

import { stylePrefix }from '../../config/style';

const star = '<span>&#9733;</span>';

export default
`
{{if !isSub && !config.hideDifficulty}}
  <div class="${stylePrefix}_difficulty">
    {{#data.difficulty | formatDifficulty:'${star}'}}
  </div>
{{/if}}
`