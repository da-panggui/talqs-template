/**
 * 组件模板映射
 * key:   组件名称
 * value: 模板名称，对应 template 文件夹下的文件
 */
export const components = {
    Question: 'question',
    StemsWrapper: 'stemsWrapper',
    ChildQSAnalyze: 'childQSAnalyzeWrapper',
    AnalyzeWrapper: 'analyzeWrapper',

    Index: 'questionIndex',
    Source: 'questionSource',
    Difficulty: 'questionDifficulty',
    Content: 'questionContent',
    Options: 'questionOptions',
    ChildList: 'questionChildList',

    Answer: 'questionAnswer',
    AnswerItem: 'questionAnswerItem',
    Analyze: 'questionAnalyze',
    AnalyzeItem: 'questionAnalyzeItem',
    KnowledgePoint: 'questionKnowledgePoint',
    KnowledgePointItem: 'questionKnowledgePointItem',
    QueID: 'questionID',
}

const templateConfig = {
    [components.Question]:[
      components.StemsWrapper,
      components.AnalyzeWrapper
    ],
    [components.StemsWrapper]: [
      components.Index,
      components.Source,
      components.Difficulty,
      components.Content,
      components.Options,
      components.ChildList,
      components.ChildQSAnalyze
    ],
    [components.AnalyzeWrapper]: [
      components.Answer,
      components.Analyze,
      components.KnowledgePoint,
      components.QueID
    ],
    [components.ChildQSAnalyze]: [
      components.Answer,
      components.Analyze,
      components.KnowledgePoint,
      components.QueID
    ]
}

export default templateConfig;