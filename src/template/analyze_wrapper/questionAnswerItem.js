// import { stylePrefix, label, tree, clear }from '../../config/style';
//  {{each data.answer}}
//   <div class="talqs_panel_item">
//     {{ if data.answer.length > 1}}
//       <div class="talqs_panel_item_title">〔{{$index+1}}〕</div>
//     {{/if}}
//     <div class="talqs_panel_item_content">{{#$value}}</div>
//   </div>
// {{/each}}
 

import { answerItem } from '../../config/template';

export default 
`
{{if data.childList}}
  {{each data.childList}}
    <div class="talqs_analyze_item">
      <div class="talqs_analyze_item_index">{{$index+1}}</div>
      {{include '${answerItem}' {data:$value} ''}}
    </div>
  {{/each}}
{{else}}
  <div class="talqs_panel_item">
    <div class="talqs_panel_item_content">
        {{if data.isCloze}}
          {{data.answer | formatAnswer}}
        {{else}}
          {{#data.answer.join(' ')}}
        {{/if}}
    </div>
  </div>
{{/if}}
`