/**
 * 大题解析组件
 */

import style from '../../config/style';

import { analyzeWrapper } from '../../config/template';

export default
`
  {{if config.analyzeVersion === 2}}
     <div class="${style.analyzeGroup}">
      {{ each config.templates['${analyzeWrapper}'] }}
        {{include $value}}
      {{/each}}
    </div>
  {{/if}}
`