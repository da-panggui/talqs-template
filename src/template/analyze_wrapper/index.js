/**
 * 大题解析组件
 */

import { stylePrefix }from '../../config/style';

import { analyzeWrapper } from '../../config/template';

const styleMain = `${stylePrefix}_analyzeGroup`;

export default
`
  {{if config.analyzeVersion === 2}}
     <div class="${styleMain}">
      {{ each config.templates['${analyzeWrapper}'] }}
        {{include $value}}
      {{/each}}
    </div>
  {{/if}}
`