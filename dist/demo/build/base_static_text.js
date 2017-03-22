webpackJsonp([0],{

/***/ 9:
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

var app = document.getElementById('app');
var changeQSBtn = document.getElementById('changeQS');
var info = document.getElementById('info');

// 渲染试题
var renderIndex = function renderIndex() {
  var currentData = data[currentIndex];
  app.innerHTML = _talqsTemplate2.default.render(currentData, { queIndex: currentIndex + 1 });
  info.innerHTML = '\u903B\u8F91\u7C7B\u578B\uFF1A ' + currentData.logicQuesTypeName + '\uFF0C\u903B\u8F91\u7C7B\u578BID\uFF1A ' + currentData.logicQuesTypeId;
};

// 切换下一道题
changeQSBtn.addEventListener('click', function () {
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
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

},[9]);