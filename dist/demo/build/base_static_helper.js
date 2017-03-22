webpackJsonp([4],{

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _talqsTemplate = __webpack_require__(0);

var _talqsTemplate2 = _interopRequireDefault(_talqsTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = [];
var currentIndex = 0;

// 试题收请求完成
var loadComplete = function loadComplete(result) {
  data = result;
  renderQS();
};

var app = document.getElementById('app');
var info = document.getElementById('info');

// 注册 helper
_talqsTemplate2.default.registerHelper('formatDifficulty', function (difficulty, template) {
  difficulty = parseInt(difficulty, 10) || 0;
  var output = '';
  for (var i = 0; i < difficulty; i++) {
    output += template;
  }
  return output;
});

// 试题难度组件模板
var questionDifficulty = '\n{{if !isSub && !config.hideDifficulty}}\n  <div class="talqs_difficulty clearfix">\n    {{#data.difficulty | formatDifficulty:\'<span>&#9829;</span>\'}}\n  </div>\n{{/if}}\n';

// 内置组件列表
var talComponents = _talqsTemplate2.default.components;

// 覆盖内置组件
_talqsTemplate2.default.updateTemplateList(_defineProperty({}, talComponents.StemsWrapper, {
  components: [{
    name: talComponents.Difficulty,
    template: questionDifficulty
  }]
}));

// 渲染试题
var renderQS = function renderQS() {
  var currentData = data[currentIndex];
  app.innerHTML = _talqsTemplate2.default.render(currentData, {
    queIndex: currentIndex + 1
  });
  info.innerHTML = '\u903B\u8F91\u7C7B\u578B\uFF1A ' + currentData.logicQuesTypeName + '\uFF0C\u903B\u8F91\u7C7B\u578BID\uFF1A ' + currentData.logicQuesTypeId;
};

// 切换下一道题
document.getElementById('changeQS').addEventListener('click', function () {
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
  renderQS();
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

},[5]);