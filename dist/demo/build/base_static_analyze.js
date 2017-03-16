webpackJsonp([7],{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _talqsTemplate = __webpack_require__(0);

var _talqsTemplate2 = _interopRequireDefault(_talqsTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = [];
var currentIndex = 0;

// 试题收请求完成
var loadComplete = function loadComplete(result) {
  data = result;
  renderIndex();
};

var analyzeType = 0;

var app = document.getElementById('app');
var changeQSBtn = document.getElementById('changeQS');
var changeTypeBtn = document.getElementById('changeType');
var info = document.getElementById('info');

// 渲染试题
var renderIndex = function renderIndex() {
  var currentData = data[currentIndex];
  app.innerHTML = _talqsTemplate2.default.render(currentData, { queIndex: currentIndex + 1, analyzeVersion: analyzeType });
  info.innerHTML = '\u903B\u8F91\u7C7B\u578B\uFF1A ' + currentData.logicQuesTypeName + '\uFF0C\u903B\u8F91\u7C7B\u578BID\uFF1A ' + currentData.logicQuesTypeId + '\n  <br />\n  \u5F53\u524D\u7684\u89E3\u6790\u663E\u793A\u7248\u672C\u4E3A\uFF1A' + analyzeType;
};

// 切换下一道题
changeQSBtn.addEventListener('click', function () {
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
  renderIndex();
});

// 切换解析显示版本
changeTypeBtn.addEventListener('click', function () {
  analyzeType = analyzeType < 2 ? analyzeType + 1 : 0;
  renderIndex();
})

// 请求试题数据
;(function (cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../data.json');
  xhr.send();
  xhr.onload = function () {
    cb(JSON.parse(this.responseText).data);
  };
})(loadComplete);

/***/ })

},[3]);