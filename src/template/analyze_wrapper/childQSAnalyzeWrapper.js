import { stylePrefix }from '../../config/style';

import { childQSAnalyzeWrapper } from '../../config/template';

const styleMain = `${stylePrefix}_analyzeSingle`;

export default
`
{{if isSub && config.analyzeVersion === 1 && !data.childList }}
   <div class="${styleMain}">
    {{ each config.templates['${childQSAnalyzeWrapper}'] }}
      {{include $value}}
    {{/each}}
  </div>
{{/if}}
`