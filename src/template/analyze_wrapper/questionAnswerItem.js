import { answerItem } from '../../config/template';
import style from '../../config/style';

export default 
`
{{if data.childList}}
  {{each data.childList}}
    <div class="${style.analyzeItem}">
      <div class="${style.analyzeItemIndex}">{{$index+1}}</div>
      {{include '${answerItem}' {data:$value} ''}}
    </div>
  {{/each}}
{{else}}
  <div class="${style.panelItem}">
    <div class="${style.panelItemContent}">
        {{if data.isCloze}}
          {{data.answer | formatAnswer}}
        {{else}}
          {{#data.answer.join(' ')}}
        {{/if}}
    </div>
  </div>
{{/if}}
`