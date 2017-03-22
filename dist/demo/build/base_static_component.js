webpackJsonp([6],{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _talqsTemplate = __webpack_require__(0);

var _talqsTemplate2 = _interopRequireDefault(_talqsTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = [];
var currentIndex = 0;

// 试题数据请求完成
var loadComplete = function loadComplete(result) {
    data = result;
    renderQS();
};

var app = document.getElementById('app');
var info = document.getElementById('info');

// 试题机构组件模板
var questionOrganization = '\n  <div class="talqs_organization clearfix">\n      <label class="talqs_label">\u673A\u6784</label>\n      <div class="talqs_panel">{{data.systemName}}</div>\n  </div>\n';

// 试题答案组件模板
var questionAnswer = '\n  <div class="talqs_organization clearfix">\n      <label class="talqs_label">\u7B54\u6848</label>\n      <div class="talqs_panel">\u6211\u662F\u88AB\u8986\u76D6\u7684</div>\n  </div>\n';

// 内置组件列表
var talComponents = _talqsTemplate2.default.components;

_talqsTemplate2.default.updateTemplateList(_defineProperty({}, talComponents.AnalyzeWrapper, {
    exclude: [talComponents.QueID, talComponents.KnowledgePoint], // 移除
    components: [{ // 添加到末尾
        name: 'questionLabel',
        template: document.getElementById('questionLabel').innerHTML
    }, { // 添加到指定位置，第 4 个呈现
        name: 'questionOrganization',
        template: questionOrganization,
        index: 3
    }, { // 覆盖内置的答案模板
        name: talComponents.Answer,
        template: questionAnswer
    }]
}));

// 渲染试题
var renderQS = function renderQS() {
    var currentData = data[currentIndex];
    app.innerHTML = _talqsTemplate2.default.render(currentData, { queIndex: currentIndex + 1, analyzeVersion: 2 });
    info.innerHTML = '\u903B\u8F91\u7C7B\u578B\uFF1A ' + currentData.logicQuesTypeName + '\uFF0C\u903B\u8F91\u7C7B\u578BID\uFF1A ' + currentData.logicQuesTypeId;
};

// 切换下一道题
document.getElementById('changeQS').addEventListener('click', function () {
    currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    renderQS();
})

// 请求试题数据
;
(function (cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data.json');
    xhr.send();
    xhr.onload = function () {
        cb(JSON.parse(this.responseText).data);
    };
})(loadComplete);

/***/ })

},[3]);