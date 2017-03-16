import style from '../../config/style';

import { childQSAnalyzeWrapper } from '../../config/template';

export default
`
{{if isSub && config.analyzeVersion === 1 && !data.childList }}
   <div class="${style.analyzeSingle}">
    {{ each config.templates['${childQSAnalyzeWrapper}'] }}
      {{include $value}}
    {{/each}}
  </div>
{{/if}}
`