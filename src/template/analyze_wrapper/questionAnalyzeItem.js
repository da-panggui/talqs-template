import { analyzeItem } from '../../config/template';
export default
    `
{{if data.childList}}
  {{each data.childList}}
    <div class="talqs_analyze_item">
      <div class="talqs_analyze_item_index">{{$index+1}}</div>
      {{include '${analyzeItem}' {data:$value} ''}}
    </div>
  {{/each}}
{{else}}
  <div class="talqs_panel_item">
    <div class="talqs_panel_item_content">{{#data.analysis}}</div>
  </div>
{{/if}}
`
