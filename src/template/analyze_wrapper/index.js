/**
 * 大题解析组件
 */

import style from '../../config/style';

import { components } from '../../config/template';

export default
`
  {{if config.analyzeVersion === 2}}
     <div class="${style.analyzeGroup}">
      {{ each config.templates['${components.AnalyzeWrapper}'] }}
        {{include $value}}
      {{/each}}
    </div>
  {{/if}}
`