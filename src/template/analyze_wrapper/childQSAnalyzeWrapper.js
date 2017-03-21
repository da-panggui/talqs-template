import style from '../../config/style';

import { components } from '../../config/template';

export default
`
{{if isSub && config.analyzeVersion === 1 && !data.childList }}
   <div class="${style.analyzeSingle}">
    {{ each config.templates['${components.ChildQSAnalyze}'] }}
      {{include $value}}
    {{/each}}
  </div>
{{/if}}
`