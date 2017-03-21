import TalqsTemplate from 'talqsTemplate';

var data = [];
var currentIndex = 0;

// 试题数据请求完成
var loadComplete = function(result) {
    data = result;
    renderQS()
};

var app = document.getElementById('app');
var info = document.getElementById('info');

// 试题机构组件模板
var questionOrganization = `
  <div class="talqs_organization clearfix">
      <label class="talqs_label">机构</label>
      <div class="talqs_panel">{{data.systemName}}</div>
  </div>
`;

// 试题答案组件模板
var questionAnswer = `
  <div class="talqs_organization clearfix">
      <label class="talqs_label">答案</label>
      <div class="talqs_panel">我是被覆盖的</div>
  </div>
`;

// 内置组件列表
var talComponents = TalqsTemplate.components;

TalqsTemplate.updateTemplateList({
    [talComponents.AnalyzeWrapper]: {
        exclude: [talComponents.QueID], // 移除
        components: [{ // 添加到末尾
            name: 'questionLabel',
            template: document.getElementById('questionLabel').innerHTML,
        }, { // 添加到指定位置，第 4 个呈现
            name: 'questionOrganization',
            template: questionOrganization,
            index: 3
        }, { // 覆盖内置的答案模板
            name: talComponents.Answer,
            template: questionAnswer,
        }]
    }
})

// 渲染试题
var renderQS = function() {
    var currentData = data[currentIndex];
    app.innerHTML = TalqsTemplate.render(currentData, { queIndex: currentIndex + 1, analyzeVersion: 2 });
    info.innerHTML = `逻辑类型： ${currentData.logicQuesTypeName}，逻辑类型ID： ${currentData.logicQuesTypeId}`;
};

// 切换下一道题
document.getElementById('changeQS').addEventListener('click', function() {
    currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    renderQS()
})

// 请求试题数据
;
(function(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data.json');
    xhr.send();
    xhr.onload = function() {
        cb(JSON.parse(this.responseText).data)
    }
})(loadComplete)
