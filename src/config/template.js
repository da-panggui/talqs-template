export const question = 'question';

export const stemsWrapper = 'stemsWrapper';

export const analyzeWrapper = 'analyzeWrapper';

export const childQSAnalyzeWrapper = 'childQSAnalyzeWrapper';

export const answerItem = 'questionAnswerItem';

export const analyzeItem = 'questionAnalyzeItem';

export const knowledgePointItem = 'questionKnowledgePointItem';

/**
 * 组件模板映射
 * key:   组件名称
 * value: 模板名称，对应 template 文件夹下的文件
 */
export const components = {
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
}

const templateConfig = {
    [question]:[
      stemsWrapper,
      analyzeWrapper
    ],
    [stemsWrapper]: [
      components.Index,
      components.Source,
      components.Difficulty,
      components.Content,
      components.Options,
      components.ChildList,
      components.ChildQSAnalyze
    ],
    [analyzeWrapper]: [
      components.Answer,
      components.Analyze,
      components.KnowledgePoint,
      components.QueID
    ],
    [childQSAnalyzeWrapper]: [
      components.Answer,
      components.Analyze,
      components.KnowledgePoint,
      components.QueID
    ]
}

export default templateConfig;