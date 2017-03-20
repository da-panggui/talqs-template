import TalqsTemplate from 'talqsTemplate';

var data = [];
var currentIndex = 0;

// 试题数据请求完成
var loadComplete = function(result) {
  data = result;
  renderIndex()
};

var app = document.getElementById('app');
var info = document.getElementById('info');

// 渲染试题
var renderIndex = function() {
  var currentData = data[currentIndex];
  app.innerHTML = TalqsTemplate.render(currentData);
  info.innerHTML = `逻辑类型： ${currentData.logicQuesTypeName}，逻辑类型ID： ${currentData.logicQuesTypeId}`;
  TalqsTemplate.autoLayout();
};

// 切换下一道题
document.getElementById('changeQS').addEventListener('click', function(){
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
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

