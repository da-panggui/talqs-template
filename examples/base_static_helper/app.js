import TalqsTemplate from 'talqsTemplate';

var data = [];
var currentIndex = 0;

// 试题收请求完成
var loadComplete = function(result) {
  data = result;
  renderQS()
};

var app = document.getElementById('app');
var info = document.getElementById('info');

// 注册 helper
TalqsTemplate.registerHelper('formatDifficulty', function(difficulty, template) {
  difficulty = parseInt(difficulty, 10) || 0
  let output = ''
  for (let i = 0; i < difficulty; i++) {
      output += template
  }
  return output
})

// 试题难度组件模板
var questionDifficulty = `
{{if !isSub && !config.hideDifficulty}}
  <div class="talqs_difficulty clearfix">
    {{#data.difficulty | formatDifficulty:'<span>&#9829;</span>'}}
  </div>
{{/if}}
`

// 内置组件列表
var talComponents = TalqsTemplate.components;

// 覆盖内置组件
TalqsTemplate.updateTemplateList({
  [talComponents.StemsWrapper]: {
    components: [{
      name: talComponents.Difficulty,
      template: questionDifficulty,
    }]
  }
});

// 渲染试题
var renderQS = function() {
  var currentData = data[currentIndex];
  app.innerHTML = TalqsTemplate.render(currentData, {
    queIndex: currentIndex + 1
  });
  info.innerHTML = `逻辑类型： ${currentData.logicQuesTypeName}，逻辑类型ID： ${currentData.logicQuesTypeId}`;
};

// 切换下一道题
document.getElementById('changeQS').addEventListener('click', function(){
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
  renderQS()
})

// 请求试题数据
;(function(cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../data.json');
  xhr.send();
  xhr.onload = function() {
    cb(JSON.parse(this.responseText).data)
  }
})(loadComplete)

