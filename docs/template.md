# TalqsTemplate 模板结构配置

在 TalqsTemplate 中通过拼装组件来呈现试题的结构，如下列图所呈现的一样，一道题的结构是通过试题主干容器和试题解析容器所构成的，但在具体业务场景中，我们可能不需要显示所有内置的结构，所以可以通过修改目前的结构拼装或者自定义新的结构来满足业务场景的需求。[查看 DEMO](https://hejinjun.github.io/talqs-template/dist/demo/base_static_component/)
<style>
  .demobox {
    border: 1px solid; width: 24%;
    text-align: center;
    float: left;
    margin-right:1%; 
  }
  .demobox div {
    border: 1px solid blue; margin: 5px; 
  }

  .demobox p {
    font-size: 13px;
    margin: 0;
    padding: 0;
  }
</style>

<div>
  <div class="demobox">
  <b><a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/question.js">完整试题容器</a></b>
  <p>components.Question</p>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/index.js">试题主干容器</a>
    <p>components.StemsWrapper</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/index.js">试题解析容器</a>
    <p>components.AnalyzeWrapper</p>
  </div>
</div>
<div class="demobox">
  <b>试题主干容器</b>
  <p>components.StemsWrapper</p>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/questionIndex.js">试题题号</a>
    <p>components.Index</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/questionSource.js">试题来源</a>
    <p>components.Source</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/questionDifficulty.js">试题难度</a>
    <p>components.Difficulty</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/questionContent.js">试题题干</a>
    <p>components.Content</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/questionOptions.js">试题选项</a>
    <p>components.Options</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/stems_wrapper/questionChildList.js">试题子题</a>
    <p>components.ChildList</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/childQSAnalyzeWrapper.js">子题解析</a>
    <p>components.StemsWrapper</p>
  </div>
</div>
<div class="demobox">
  <b>试题解析容器</b>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionAnswer.js">试题答案</a>
    <p>components.Answer</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionAnalyze.js">试题解析</a>
    <p>components.Analyze</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionKnowledgePoint.js">试题知识点</a>
    <p>components.KnowledgePoint</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionID.js">试题ID</a>
    <p>components.QueID</p>
  </div>
</div>
<div class="demobox">
  <b>复合题子题解析容器</b>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionAnswer.js">试题答案</a>
    <p>components.Answer</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionAnalyze.js">试题解析</a>
     <p>components.Analyze</p>
  </div>
  <div>
    <a href="https://github.com/hejinjun/talqs-template/blob/master/src/template/analyze_wrapper/questionKnowledgePoint.js">试题知识点</a>
    <p>components.KnowledgePoint</p>
  </div>
</div>
</div>
<div style="clear: both;"></div>

### 参考

关于内置结构拼装参见 [配置](https://github.com/hejinjun/talqs-template/blob/master/src/config/template.js)

关于内置组件参见 [组件](https://github.com/hejinjun/talqs-template/blob/master/src/template/index.js)



