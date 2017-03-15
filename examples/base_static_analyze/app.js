import TalqsTemplate from 'talqsTemplate';

var data = [];
var currentIndex = 0;

// 试题收请求完成
var loadComplete = function(result) {
  data = result;
  renderIndex()
};

var analyzeType = 0;

var app = document.getElementById('app');
var changeQSBtn =  document.getElementById('changeQS');
var changeTypeBtn =  document.getElementById('changeType');
var info = document.getElementById('info');

// 渲染试题
var renderIndex = function() {
  var currentData = data[currentIndex];
  app.innerHTML = TalqsTemplate.render(currentData, {queIndex: currentIndex + 1, analyzeVersion: analyzeType});
  info.innerHTML = `逻辑类型： ${currentData.logicQuesTypeName}，逻辑类型ID： ${currentData.logicQuesTypeId}
  <br />
  当前的解析显示版本为：${analyzeType}`;
};

// 切换下一道题
changeQSBtn.addEventListener('click', function(){
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
  renderIndex()
})

// 切换解析显示版本
changeTypeBtn.addEventListener('click', function(){
  analyzeType = analyzeType < 2 ? analyzeType + 1 : 0;
  renderIndex()
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

