/**
 * TalqsTemplate v1.0.0
 * (c) 2017 JinJun He
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.TalqsTemplate = factory());
}(this, (function () { 'use strict';

/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */

/**
 * 模板引擎
 * @name    template
 * @param   {String}            模板名
 * @param   {Object, String}    数据。如果为字符串则编译并缓存编译结果
 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
 */
var template = function (filename, content) {
    return typeof content === 'string'
    ?   compile(content, {
            filename: filename
        })
    :   renderFile(filename, content);
};


template.version = '3.0.0';


/**
 * 设置全局配置
 * @name    template.config
 * @param   {String}    名称
 * @param   {Any}       值
 */
template.config = function (name, value) {
    defaults[name] = value;
};



var defaults = template.defaults = {
    openTag: '<%',    // 逻辑语法开始标签
    closeTag: '%>',   // 逻辑语法结束标签
    escape: true,     // 是否编码输出变量的 HTML 字符
    cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
    compress: false,  // 是否压缩输出
    parser: null      // 自定义语法格式器 @see: template-syntax.js
};


var cacheStore = template.cache = {};


/**
 * 渲染模板
 * @name    template.render
 * @param   {String}    模板
 * @param   {Object}    数据
 * @return  {String}    渲染好的字符串
 */
template.render = function (source, options) {
    return compile(source)(options);
};


/**
 * 渲染模板(根据模板名)
 * @name    template.render
 * @param   {String}    模板名
 * @param   {Object}    数据
 * @return  {String}    渲染好的字符串
 */
var renderFile = template.renderFile = function (filename, data) {
    var fn = template.get(filename) || showDebugInfo({
        filename: filename,
        name: 'Render Error',
        message: 'Template not found'
    });
    return data ? fn(data) : fn;
};


/**
 * 获取编译缓存（可由外部重写此方法）
 * @param   {String}    模板名
 * @param   {Function}  编译好的函数
 */
template.get = function (filename) {

    var cache;
    
    if (cacheStore[filename]) {
        // 使用内存缓存
        cache = cacheStore[filename];
    } else if (typeof document === 'object') {
        // 加载模板并编译
        var elem = document.getElementById(filename);
        
        if (elem) {
            var source = (elem.value || elem.innerHTML)
            .replace(/^\s*|\s*$/g, '');
            cache = compile(source, {
                filename: filename
            });
        }
    }

    return cache;
};


var toString = function (value, type) {

    if (typeof value !== 'string') {

        type = typeof value;
        if (type === 'number') {
            value += '';
        } else if (type === 'function') {
            value = toString(value.call(value));
        } else {
            value = '';
        }
    }

    return value;

};


var escapeMap = {
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "&": "&#38;"
};


var escapeFn = function (s) {
    return escapeMap[s];
};

var escapeHTML = function (content) {
    return toString(content)
    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
};


var isArray = Array.isArray || function (obj) {
    return ({}).toString.call(obj) === '[object Array]';
};


var each = function (data, callback) {
    var i, len;        
    if (isArray(data)) {
        for (i = 0, len = data.length; i < len; i++) {
            callback.call(data, data[i], i, data);
        }
    } else {
        for (i in data) {
            callback.call(data, data[i], i);
        }
    }
};


var utils = template.utils = {

  $helpers: {},

    $include: renderFile,

    $string: toString,

    $escape: escapeHTML,

    $each: each
    
};/**
 * 添加模板辅助方法
 * @name    template.helper
 * @param   {String}    名称
 * @param   {Function}  方法
 */
template.helper = function (name, helper) {
    helpers[name] = helper;
};

var helpers = template.helpers = utils.$helpers;




/**
 * 模板错误事件（可由外部重写此方法）
 * @name    template.onerror
 * @event
 */
template.onerror = function (e) {
    var message = 'Template Error\n\n';
    for (var name in e) {
        message += '<' + name + '>\n' + e[name] + '\n\n';
    }
    
    if (typeof console === 'object') {
        console.error(message);
    }
};


// 模板调试器
var showDebugInfo = function (e) {

    template.onerror(e);
    
    return function () {
        return '{Template Error}';
    };
};


/**
 * 编译模板
 * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
 * @name    template.compile
 * @param   {String}    模板字符串
 * @param   {Object}    编译选项
 *
 *      - openTag       {String}
 *      - closeTag      {String}
 *      - filename      {String}
 *      - escape        {Boolean}
 *      - compress      {Boolean}
 *      - debug         {Boolean}
 *      - cache         {Boolean}
 *      - parser        {Function}
 *
 * @return  {Function}  渲染方法
 */
var compile = template.compile = function (source, options) {
    
    // 合并默认配置
    options = options || {};
    for (var name in defaults) {
        if (options[name] === undefined) {
            options[name] = defaults[name];
        }
    }


    var filename = options.filename;


    try {
        
        var Render = compiler(source, options);
        
    } catch (e) {
    
        e.filename = filename || 'anonymous';
        e.name = 'Syntax Error';

        return showDebugInfo(e);
        
    }
    
    
    // 对编译结果进行一次包装

    function render (data) {
        
        try {
            
            return new Render(data, filename) + '';
            
        } catch (e) {
            
            // 运行时出错后自动开启调试模式重新编译
            if (!options.debug) {
                options.debug = true;
                return compile(source, options)(data);
            }
            
            return showDebugInfo(e)();
            
        }
        
    }
    

    render.prototype = Render.prototype;
    render.toString = function () {
        return Render.toString();
    };


    if (filename && options.cache) {
        cacheStore[filename] = render;
    }

    
    return render;

};




// 数组迭代
var forEach = utils.$each;


// 静态分析模板变量
var KEYWORDS =
    // 关键字
    'break,case,catch,continue,debugger,default,delete,do,else,false'
    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
    + ',throw,true,try,typeof,var,void,while,with'

    // 保留字
    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
    + ',final,float,goto,implements,import,int,interface,long,native'
    + ',package,private,protected,public,short,static,super,synchronized'
    + ',throws,transient,volatile'

    // ECMA 5 - use strict
    + ',arguments,let,yield'

    + ',undefined';

var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
var SPLIT_RE = /[^\w$]+/g;
var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
var BOUNDARY_RE = /^,+|,+$/g;
var SPLIT2_RE = /^$|,+/;


// 获取变量
function getVariable (code) {
    return code
    .replace(REMOVE_RE, '')
    .replace(SPLIT_RE, ',')
    .replace(KEYWORDS_RE, '')
    .replace(NUMBER_RE, '')
    .replace(BOUNDARY_RE, '')
    .split(SPLIT2_RE);
}


// 字符串转义
function stringify (code) {
    return "'" + code
    // 单引号与反斜杠转义
    .replace(/('|\\)/g, '\\$1')
    // 换行符转义(windows + linux)
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n') + "'";
}


function compiler (source, options) {
    
    var debug = options.debug;
    var openTag = options.openTag;
    var closeTag = options.closeTag;
    var parser = options.parser;
    var compress = options.compress;
    var escape = options.escape;
    

    
    var line = 1;
    var uniq = {$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1};
    


    var isNewEngine = ''.trim;// '__proto__' in {}
    var replaces = isNewEngine
    ? ["$out='';", "$out+=", ";", "$out"]
    : ["$out=[];", "$out.push(", ");", "$out.join('')"];

    var concat = isNewEngine
        ? "$out+=text;return $out;"
        : "$out.push(text);";
          
    var print = "function(){"
    +      "var text=''.concat.apply('',arguments);"
    +       concat
    +  "}";

    var include = "function(filename,data){"
    +      "data=data||$data;"
    +      "var text=$utils.$include(filename,data,$filename);"
    +       concat
    +   "}";

    var headerCode = "'use strict';"
    + "var $utils=this,$helpers=$utils.$helpers,"
    + (debug ? "$line=0," : "");
    
    var mainCode = replaces[0];

    var footerCode = "return new String(" + replaces[3] + ");";
    
    // html与逻辑语法分离
    forEach(source.split(openTag), function (code) {
        code = code.split(closeTag);
        
        var $0 = code[0];
        var $1 = code[1];
        
        // code: [html]
        if (code.length === 1) {
            
            mainCode += html($0);
         
        // code: [logic, html]
        } else {
            
            mainCode += logic($0);
            
            if ($1) {
                mainCode += html($1);
            }
        }
        

    });
    
    var code = headerCode + mainCode + footerCode;
    
    // 调试语句
    if (debug) {
        code = "try{" + code + "}catch(e){"
        +       "throw {"
        +           "filename:$filename,"
        +           "name:'Render Error',"
        +           "message:e.message,"
        +           "line:$line,"
        +           "source:" + stringify(source)
        +           ".split(/\\n/)[$line-1].replace(/^\\s+/,'')"
        +       "};"
        + "}";
    }
    
    
    
    try {
        
        
        var Render = new Function("$data", "$filename", code);
        Render.prototype = utils;

        return Render;
        
    } catch (e) {
        e.temp = "function anonymous($data,$filename) {" + code + "}";
        throw e;
    }



    
    // 处理 HTML 语句
    function html (code) {
        
        // 记录行号
        line += code.split(/\n/).length - 1;

        // 压缩多余空白与注释
        if (compress) {
            code = code
            .replace(/\s+/g, ' ')
            .replace(/<!--[\w\W]*?-->/g, '');
        }
        
        if (code) {
            code = replaces[1] + stringify(code) + replaces[2] + "\n";
        }

        return code;
    }
    
    
    // 处理逻辑语句
    function logic (code) {

        var thisLine = line;
       
        if (parser) {
        
             // 语法转换插件钩子
            code = parser(code, options);
            
        } else if (debug) {
        
            // 记录行号
            code = code.replace(/\n/g, function () {
                line ++;
                return "$line=" + line +  ";";
            });
            
        }
        
        
        // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
        // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
        if (code.indexOf('=') === 0) {

            var escapeSyntax = escape && !/^=[=#]/.test(code);

            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

            // 对内容编码
            if (escapeSyntax) {

                var name = code.replace(/\s*\([^\)]+\)/, '');

                // 排除 utils.* | include | print
                
                if (!utils[name] && !/^(include|print)$/.test(name)) {
                    code = "$escape(" + code + ")";
                }

            // 不编码
            } else {
                code = "$string(" + code + ")";
            }
            

            code = replaces[1] + code + replaces[2];

        }
        
        if (debug) {
            code = "$line=" + thisLine + ";" + code;
        }
        
        // 提取模板中的变量名
        forEach(getVariable(code), function (name) {
            
            // name 值可能为空，在安卓低版本浏览器下
            if (!name || uniq[name]) {
                return;
            }

            var value;

            // 声明模板变量
            // 赋值优先级:
            // [include, print] > utils > helpers > data
            if (name === 'print') {

                value = print;

            } else if (name === 'include') {
                
                value = include;
                
            } else if (utils[name]) {

                value = "$utils." + name;

            } else if (helpers[name]) {

                value = "$helpers." + name;

            } else {

                value = "$data." + name;
            }
            
            headerCode += name + "=" + value + ",";
            uniq[name] = true;
            
            
        });
        
        return code + "\n";
    }
    
    
}



// 定义模板引擎的语法


defaults.openTag = '{{';
defaults.closeTag = '}}';


var filtered = function (js, filter) {
    var parts = filter.split(':');
    var name = parts.shift();
    var args = parts.join(':') || '';

    if (args) {
        args = ', ' + args;
    }

    return '$helpers.' + name + '(' + js + args + ')';
};


defaults.parser = function (code, options) {

    // var match = code.match(/([\w\$]*)(\b.*)/);
    // var key = match[1];
    // var args = match[2];
    // var split = args.split(' ');
    // split.shift();

    code = code.replace(/^\s/, '');

    var split = code.split(' ');
    var key = split.shift();
    var args = split.join(' ');

    

    switch (key) {

        case 'if':

            code = 'if(' + args + '){';
            break;

        case 'else':
            
            if (split.shift() === 'if') {
                split = ' if(' + split.join(' ') + ')';
            } else {
                split = '';
            }

            code = '}else' + split + '{';
            break;

        case '/if':

            code = '}';
            break;

        case 'each':
            var object = split[0] || '$data';
            var as     = split[1] || 'as';
            var value  = split[2] || '$value';
            var index  = split[3] || '$index';
            
            var param   = value + ',' + index;
            
            if (as !== 'as') {
                object = '[]';
            }
            
            code =  '$each(' + object + ',function(' + param + '){';
            break;

        case '/each':

            code = '});';
            break;

        case 'echo':

            code = 'print(' + args + ');';
            break;

        case 'print':
        case 'include':

            code = key + '(' + split.join(',') + ');';
            break;

        default:

            // 过滤器（辅助方法）
            // {{value | filterA:'abcd' | filterB}}
            // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
            // TODO: {{ddd||aaa}} 不包含空格
            if (/^\s*\|\s*[\w\$]/.test(args)) {

                var escape = true;

                // {{#value | link}}
                if (code.indexOf('#') === 0) {
                    code = code.substr(1);
                    escape = false;
                }

                var i = 0;
                var array = code.split('|');
                var len = array.length;
                var val = array[i++];

                for (; i < len; i ++) {
                    val = filtered(val, array[i]);
                }

                code = (escape ? '=' : '=#') + val;

            // 即将弃用 {{helperName value}}
            } else if (template.helpers[key]) {
                
                code = '=#' + key + '(' + split.join(',') + ');';
            
            // 内容直接输出 {{value}}
            } else {

                code = '=' + code;
            }

            break;
    }
    
    
    return code;
};

var question = 'question';

var stemsWrapper = 'stemsWrapper';

var analyzeWrapper = 'analyzeWrapper';

var childQSAnalyzeWrapper = 'childQSAnalyzeWrapper';

var answerItem = 'questionAnswerItem';

var analyzeItem = 'questionAnalyzeItem';

var knowledgePointItem = 'questionKnowledgePointItem';

/**
 * 组件模板映射
 * key:   组件名称
 * value: 模板名称，对应 template 文件夹下的文件
 */
var components = {
    Question: question,
    StemsWrapper: stemsWrapper,
    ChildQSAnalyze: childQSAnalyzeWrapper,
    AnalyzeWrapper: analyzeWrapper,

    Index: 'questionIndex',
    Source: 'questionSource',
    Difficulty: 'questionDifficulty',
    Content: 'questionContent',
    Options: 'questionOptions',
    ChildList: 'questionChildList',

    Answer: 'questionAnswer',
    AnswerItem: answerItem,
    Analyze: 'questionAnalyze',
    AnalyzeItem: analyzeItem,
    KnowledgePoint: 'questionKnowledgePoint',
    KnowledgePointItem: knowledgePointItem,
    QueID: 'questionID',
};

var templateConfig = {};
templateConfig[question] = [
      stemsWrapper,
      analyzeWrapper
    ];
templateConfig[stemsWrapper] = [
      components.Index,
      components.Source,
      components.Difficulty,
      components.Content,
      components.Options,
      components.ChildList,
      components.ChildQSAnalyze
    ];
templateConfig[analyzeWrapper] = [
      components.Answer,
      components.Analyze,
      components.KnowledgePoint,
      components.QueID
    ];
templateConfig[childQSAnalyzeWrapper] = [
      components.Answer,
      components.Analyze,
      components.KnowledgePoint,
      components.QueID
    ];

/**
 * talqsTemplate 常用的文案配置
 * TODO: 需要留接口修改文字配置
 */
var labelConfig = {
  answer: '答案',
  analyze: '解析',
  queId: 'ID',
  knowledgePoint: '知识点',
  label: '标签'
};

/**
 * talqsTemplateConfig 模板默认渲染配置
 */

var talqsTemplateConfig = {
  /**
   * 解析显示版本
   * 0: 不显示解析
   * 1: 大题显示（如果是复合题则拼装子题的解析显示）
   * 2: 子题显示（只显示子题的解析，只对复合题生效）
   */
  analyzeVersion: 0,

  /**
   * 是否隐藏试题来源
   */
  hideSource: false,

  /**
   * 是否隐藏试题难度
   */
  hideDifficulty: false,

  /**
   * 试题结构配置
   */
  templates: templateConfig,

  /**
   * 常用文字标题配置
   */
  labels: labelConfig,

  /**
   * 试题题号
   */
  queIndex: 0,

  /**
   * 默认渲染入口模板名称
   */
  entryTemplate: question,
};

/**
 * [helper 模板对象的 helper 扩展]
 * @type {Object}
 */
var helper = {};

/**
 * [json 以 JSON 字符串的方式输出]
 * @param  {[Object]} data [待格式化输出的对象]
 * @return {[String]}      [格式化输出的字符串]
 */
helper.json = function(data) {
    return JSON.stringify(data)
};

/**
 * [formatDifficulty 格式化输出试题难度]
 * @param  {[Number]} difficulty [难度]
 * @param  {[String]} html       [需遍历的字符串模板]
 * @return {[String]}            [格式化输出的字符串]
 */
helper.formatDifficulty = function(difficulty, html) {
    difficulty = parseInt(difficulty, 10) || 0;
    var output = '';
    for (var i = 0; i < difficulty; i++) {
        output += html;
    }
    return output
};

/**
 * [formatAnswer 完型填空题格式化输出答案]
 * @param  {[type]} answer [答案数组]
 * @return {[type]}        [格式化输出的字符串]
 */
helper.formatAnswer = function(answer) {
    var output = '';
    if (Array.isArray(answer)) {
        var len = answer.length;
        for (var i = 0; i < len; i++) {
            if (i % 5 == 0 && i > 0) {
                output += ' ';
            }
            output += answer[i];
        }
    }
    return output
};

var main = 'talqs';
var options = main + "_options";

var style = {
  main: main,
  options: options,
  // 题干
  stems: (main + "_main"),
  // 子题
  subqs: (main + "_subqs"),
  content: (main + "_content"),
  difficulty: (main + "_difficulty"),
  index: (main + "_index"),
  source: (main + "_source"),
  knowledgePoint: (main + "_knowledgePoint"),
  id: (main + "_id"),
  analyzeItem: '${main}_analyze_item',
  analyzeItemIndex: '${main}_analyze_item_index',
  panelItem: '${main}_panel_item',
  panelItemContent: '${main}_panel_item_content',
  answer: (main + "_answer"),
  analyze: (main + "_analyze"),
  analyzeGroup: (main + "_analyzeGroup"),
  analyzeSingle: (main + "analyzeSingle"),

  optionsList: (options + "_list"),
  optionsRows: (options + "_rows"),
  optionsColumns: (options + "_columns"),
  optionsItem: (options + "_columns_item"),
  optionsIndex: (options + "_index"),
  optionsLabel: (options + "_label"),
  optionsContent: (options + "_content"),

  label: (main + "_label"),
  panel: (main + "_panel"),
  tree: (main + "_tree"),
  clear: 'clearfix'
};

/**
 * 默认的试题显示组件
 * 遍历配置对象的 question 字段，插入子模板
 * 详情参见 config/template.js
 */

var question$1 = ("<div class=\"" + (style.main) + "\">\n  {{ each config.templates['" + question + "'] }}\n    {{include $value}}\n  {{/each}}\n</div>\n");

/**
 * 试题题干容器组件
 * 默认从配置对象中读取嵌套的子组件
 * 在这里题干容器指的是包括来源，难度，题干，选项等内容的容器
 * 详情参看 config/template.js 
 */

var stemsWrapper$1 = ("\n<div class=\"" + (style.stems) + "\">\n {{each config.templates['" + stemsWrapper + "']}}\n    {{include $value}}\n {{/each}}\n</div>\n");

/**
 * 大题解析组件
 */

var analyzeWrapper$1 = ("\n  {{if config.analyzeVersion === 2}}\n     <div class=\"" + (style.analyzeGroup) + "\">\n      {{ each config.templates['" + analyzeWrapper + "'] }}\n        {{include $value}}\n      {{/each}}\n    </div>\n  {{/if}}\n");

/**
 * 试题题号组件
 *
 * 试题题号组件只有在题号大于 0 的时候显示
 * 
 * 大题的题号需要从渲染配置对象 config 的 queIndex 字段传值
 * 小题的题号就是该题在子题列表中的索引值加 1
 *
 * 字段说明：
 *
 * index: 试题题号（Number 类型）
 *
 */

var questionIndex = ("\n{{if index && index > 0}}\n  <span class=\"" + (style.index) + "\">\n    {{index}}\n  </span>\n{{/if}}\n");

/**
 * 试题来源组件
 * 
 * 备注：试题来源显示只适用于大题
 *      复合题子题不显示试题来源
 *
 * 字段说明：
 * 
 * isSub:               复合题子题标示
 * 
 * data:                试题数据
 * data.queSource:      试题来源
 * 
 * config:              渲染配置对象
 * config.hideSource:   隐藏来源标示
 */

var questionSource = ("\n{{if !isSub && !config.hideSource}}\n  <div class=\"" + (style.source) + "\">\n    {{data.queSource}}\n  </div>\n{{/if}}\n");

/**
 * 试题题干组件
 *
 * 题干可隐藏显示
 *
 * data.content               试题题干
 * data.hideContent           隐藏题干标示
 *
 */

var questionContent = ("\n{{if data.content && !data.hideContent}}\n  <div class=\"" + (style.content) + " " + (style.clear) + "\">{{#data.content}}</div>\n{{/if}}\n");

/**
 * 试题选项组件模板
 * 
 * 试题的 answerOptionList 字段数据结构为二维数组
 * [
 *   // 第一行
 *   [
 *     {列 一...},
 *     {列 n ...}
 *   ], 
 *   ...
 *   // 第 n 行
 *   [
 *     {列 一...},
 *     {列 n ...}
 *   ], 
 * ]
 * 
 * 试题的 isCloze 标记是否是完型填空，完型填空需要在选项前添加对应的题号（行号）
 * 1. A.XXX B.XXX C.XXX D.XXX
 * n. A.XXX B.XXX C.XXX D.XXX
 */

var questionOptions = ("\n{{ if data.answerOptionList }}\n  <div class=\"" + (style.options) + "\">\n    <ul class=\"" + (style.optionsList) + "\">\n      {{each data.answerOptionList }}\n        <li class=\"" + (style.optionsRows) + "\">\n          {{if data.isCloze }}\n            <span class=\"" + (style.optionsIndex) + "\">{{$index+1}}. </span>\n          {{/if}}\n          <ul class=\"" + (style.optionsColumns) + "_{{$value.length}} " + (style.clear) + "\">\n            {{each $value}}\n              <li class=\"" + (style.optionsItem) + " " + (style.clear) + "\">\n                <span class=\"" + (style.optionsLabel) + "\">{{$value.aoVal}}. </span>\n                <div class=\"" + (style.optionsContent) + "\">{{#$value.content}}</div>\n              </li>\n            {{/each}}\n          </ul>\n        </li>\n      {{/each}}\n    </ul>\n  </div>\n{{/if}}\n");

/**
 * 试题难度组件
 * 
 * 备注：试题难度显示只适用于大题
 *      复合题子题不显示试题难度
 *
 * 字段说明：
 * 
 * isSub:                   复合题子题标示
 * 
 * data:                    试题数据
 * data.difficulty:         试题难度
 * 
 * config:                  渲染配置对象
 * config.hideDifficulty:   隐藏难度标示
 */

var star = '<span>&#9733;</span>';

var questionDifficulty = ("\n{{if !isSub && !config.hideDifficulty}}\n  <div class=\"" + (style.difficulty) + "\">\n    {{#data.difficulty | formatDifficulty:'" + star + "'}}\n  </div>\n{{/if}}\n");

/**
 * 复合题子题模板，递归显示子题
 * 
 * data:    子题数据
 * config:  插件配置
 * index:   子题题号
 * isSub:   子题标记
 */

// 子题数据
var childData = '{data:$value,config:config,index:$index+1,isSub:true}';

var questionChildList = ("\n{{ if data.childList }}\n  <div class=\"" + (style.subqs) + "\">\n    {{each data.childList}}\n      {{include '" + stemsWrapper + "' " + childData + " ''}}\n    {{/each}}\n  </div>\n{{/if}}\n");

var childQSAnalyzeWrapper$1 = ("\n{{if isSub && config.analyzeVersion === 1 && !data.childList }}\n   <div class=\"" + (style.analyzeSingle) + "\">\n    {{ each config.templates['" + childQSAnalyzeWrapper + "'] }}\n      {{include $value}}\n    {{/each}}\n  </div>\n{{/if}}\n");

/**
 * 试题答案组件
 */

var questionAnswer = ("\n<div class=\"" + (style.answer) + "  " + (style.clear) + "\">\n  <label class=\"" + (style.label) + "\">\n    {{config.labels.answer}}\n  </label>\n  <div class=\"" + (style.panel) + "\">\n    {{include '" + answerItem + "'}}\n  </div>\n</div>\n");

var questionAnswerItem = ("\n{{if data.childList}}\n  {{each data.childList}}\n    <div class=\"" + (style.analyzeItem) + "\">\n      <div class=\"" + (style.analyzeItemIndex) + "\">{{$index+1}}</div>\n      {{include '" + answerItem + "' {data:$value} ''}}\n    </div>\n  {{/each}}\n{{else}}\n  <div class=\"" + (style.panelItem) + "\">\n    <div class=\"" + (style.panelItemContent) + "\">\n        {{if data.isCloze}}\n          {{data.answer | formatAnswer}}\n        {{else}}\n          {{#data.answer.join(' ')}}\n        {{/if}}\n    </div>\n  </div>\n{{/if}}\n");

/**
 * 试题解析组件
 */

var questionAnalyze = ("\n<div class=\"" + (style.analyze) + "  " + (style.clear) + "\">\n  <label class=\"" + (style.label) + "\">\n    {{config.labels.analyze}}\n  </label>\n  <div class=\"" + (style.panel) + "\">\n    {{include '" + analyzeItem + "'}}\n  </div>\n</div>\n");

var questionAnalyzeItem = ("\n{{if data.childList}}\n  {{each data.childList}}\n    <div class=\"" + (style.analyzeItem) + "\">\n      <div class=\"" + (style.analyzeItemIndex) + "\">{{$index+1}}</div>\n      {{include '" + analyzeItem + "' {data:$value} ''}}\n    </div>\n  {{/each}}\n{{else}}\n  <div class=\"" + (style.panelItem) + "\">\n    <div class=\"{style.panelItemContent}\">{{#data.analysis}}</div>\n  </div>\n{{/if}}\n");

/**
 * 试题知识点组件
 * 根据知识点生成一个树形结构
 */

var questionKnowledgePoint = ("\n <div class=\"" + (style.knowledgePoint) + "  " + (style.clear) + "\">\n  <label class=\"" + (style.label) + "\">\n    {{config.labels.knowledgePoint}}\n  </label>\n  <div class=\"" + (style.tree) + "\">\n    <ul>\n      {{each data.examOptionList}}\n        {{include '" + knowledgePointItem + "' {data:$value} ''}}\n      {{/each}}\n    </ul>\n  </div>\n</div>\n");

/**
 * 单个知识点列表组件，递归显示
 */

var questionKnowledgePointItem = ("\n<li>\n  {{data.name}}\n  {{if data.childList}}\n    <ul>\n      {{each data.childList}}\n        {{include '" + knowledgePointItem + "' {data:$value} ''}}\n      {{/each}}\n    </ul>\n  {{/if}}\n</li>\n");

/**
 * 试题 ID 组件
 */

var questionID = ("\n<div class=\"" + (style.id) + "  " + (style.clear) + "\">\n  <label class=\"" + (style.label) + "\">\n    {{config.labels.queId}}\n  </label>\n  <div class=\"" + (style.panel) + "\">\n    {{data.queId}}  \n  </div>\n</div>\n");

/**
 * 导出所有需要注册的内置组件
 */

var cacheStore$1 = ( obj = {}, obj[components.Question] = question$1, obj[components.StemsWrapper] = stemsWrapper$1, obj[components.AnalyzeWrapper] = analyzeWrapper$1, obj[components.ChildQSAnalyze] = childQSAnalyzeWrapper$1, obj[components.Index] = questionIndex, obj[components.Source] = questionSource, obj[components.Content] = questionContent, obj[components.Options] = questionOptions, obj[components.Difficulty] = questionDifficulty, obj[components.ChildList] = questionChildList, obj[components.Answer] = questionAnswer, obj[components.AnswerItem] = questionAnswerItem, obj[components.Analyze] = questionAnalyze, obj[components.AnalyzeItem] = questionAnalyzeItem, obj[components.KnowledgePoint] = questionKnowledgePoint, obj[components.KnowledgePointItem] = questionKnowledgePointItem, obj[components.QueID] = questionID, obj );
var obj;

// 引入 art-template 作为内置模板渲染插件
// 引入默认设置
// 引入辅助函数
var TalqsTemplate = {
  // 插件版本号
  version: '1.0.0',
  // 插件默认配置对象
  config: talqsTemplateConfig,
};


/**
 * [render TalqsTemplate 渲染试题数据返回 HTML 代码片段]
 * @param  {[Object]} data   [试题数据]
 * @param  {[Object]} config [插件渲染配置]
 * @return {[String]}        [渲染完成后的 HTML 片段]
 * 
 */
TalqsTemplate.render = function (data, config) {
  // 试题数据为空则退出
  if (!data) { return }
  // 合并配置对象
  config = config || {};
  for(var key in talqsTemplateConfig) {
    if (config[key] === undefined) {
      config[key] = talqsTemplateConfig[key];
    }
  }

  TalqsTemplate.config = config;

  // 编译模板
  var render = template.cache[config.entryTemplate];
  // 填充数据
  var html = render({config: config, data: data, index: config.queIndex });
  // 返回渲染完成的 HTML 字符串
  return html
};

/**
 * [registerHelper 注册 art-template 模板的公用辅助方法]
 * @param {[String]} name     [辅助方法名称]
 * @param {Function} fn       [辅助方法定义]
 */
var registerHelper = function (name, fn) {
  template.helper(name, fn);
};

TalqsTemplate.registerHelper = registerHelper;

// 注册内置辅助函数
for(var key in helper) {
  registerHelper(key, helper[key]);
}

/**
 * [registerComponent 注册缓存组件模板]
 * @param {[Object]} components      [模板对象]
 */
var registerComponent = function (components) {
  for(var filename in components) {
    var source = components[filename].replace(/^\s*|\s*$/g, '');
    var cache = template.compile(source, {filename: filename});
    template.cache[filename] = cache;
  }
};

registerComponent(cacheStore$1);

TalqsTemplate.registerComponent = registerComponent;

/**
 * [registerTemplate 注册一个模板]
 * @param  {[type]} key      [模板名称]
 * @param  {[type]} list     [组件列表]
 */
TalqsTemplate.registerTemplate = function (key, list) {
  TalqsTemplate.config.templates[key] = list;
};

TalqsTemplate.updateTemplateList = function (key, list) {
  var templates = TalqsTemplate.config.templates[key] || [];
  var tempIndex;
  var tempComponent;
  list.forEach(function (item, index) {
    tempComponent = item.component;
    if (tempComponent) {
      tempIndex = templates.indexOf(tempComponent);
      if (item.remove && tempIndex >= 0) {
        templates.splice(tempIndex, 1);
      }

      if (tempIndex < 0 && !item.remove) {
        tempIndex = (item.index !== undefined && item.index < templates.length) ? item.index : templates.length;
        templates.splice(tempIndex, 0, tempComponent);
      }
    }
  });
  TalqsTemplate.config.templates[key] = templates;
};

return TalqsTemplate;

})));
