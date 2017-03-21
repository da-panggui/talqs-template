import TalqsTemplate from 'talqsTemplate';

var data = [];
var currentIndex = 0;
var analyzeType = 0;

// 试题数据请求完成
var loadComplete = function(result) {
  data = result;
  renderQS()
};

var app = document.getElementById('app');
var info = document.getElementById('info');

// 渲染试题
var renderQS = function() {
  var currentData = data[currentIndex];
  app.innerHTML = TalqsTemplate.render(currentData, {queIndex: currentIndex + 1, analyzeVersion: analyzeType});
  info.innerHTML = `逻辑类型： ${currentData.logicQuesTypeName}，逻辑类型ID： ${currentData.logicQuesTypeId}
  <br />
  当前的解析显示版本为：${analyzeType}`;
};

// 切换下一道题
document.getElementById('changeQS').addEventListener('click', function(){
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
  renderQS()
})

// 切换解析显示版本
document.getElementById('changeType').addEventListener('click', function(){
  analyzeType = analyzeType < 2 ? analyzeType + 1 : 0;
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

