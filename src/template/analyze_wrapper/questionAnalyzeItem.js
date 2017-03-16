import { analyzeItem } from '../../config/template';
import style from '../../config/style';

export default
    `
{{if data.childList}}
  {{each data.childList}}
    <div class="${style.analyzeItem}">
      <div class="${style.analyzeItemIndex}">{{$index+1}}</div>
      {{include '${analyzeItem}' {data:$value} ''}}
    </div>
  {{/each}}
{{else}}
  <div class="${style.panelItem}">
    <div class="${style.panelItemContent}">{{#data.analysis}}</div>
  </div>
{{/if}}
`
