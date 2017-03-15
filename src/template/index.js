import question from './question';
import stemsWrapper from './stems_wrapper/index';
import analyzeWrapper from './analyze_wrapper/index';

import questionIndex from './stems_wrapper/questionIndex';
import questionSource from './stems_wrapper/questionSource';
import questionContent from './stems_wrapper/questionContent';
import questionOptions from './stems_wrapper/questionOptions';
import questionDifficulty from './stems_wrapper/questionDifficulty';
import questionChildList from './stems_wrapper/questionChildList';

import childQSAnalyzeWrapper from './analyze_wrapper/childQSAnalyzeWrapper';
import questionAnswer from './analyze_wrapper/questionAnswer';
import questionAnswerItem from './analyze_wrapper/questionAnswerItem';
import questionAnalyze from './analyze_wrapper/questionAnalyze';
import questionAnalyzeItem from './analyze_wrapper/questionAnalyzeItem';
import questionKnowledgePoint from './analyze_wrapper/questionKnowledgePoint';
import questionKnowledgePointItem from './analyze_wrapper/questionKnowledgePointItem';
import questionID from './analyze_wrapper/questionID';

import { components } from '../config/template';

/**
 * 导出所有需要注册的内置组件
 */

export default {
    [components.Question]: question,
    [components.StemsWrapper]: stemsWrapper,
    [components.AnalyzeWrapper]: analyzeWrapper,
    [components.ChildQSAnalyze]: childQSAnalyzeWrapper,

    [components.Index]: questionIndex,
    [components.Source]: questionSource,
    [components.Content]: questionContent,
    [components.Options]: questionOptions,
    [components.Difficulty]: questionDifficulty,
    [components.ChildList]: questionChildList,

    [components.Answer]: questionAnswer,
    [components.AnswerItem]: questionAnswerItem,
    [components.Analyze]: questionAnalyze,
    [components.AnalyzeItem]: questionAnalyzeItem,
    [components.KnowledgePoint]: questionKnowledgePoint,
    [components.KnowledgePointItem]: questionKnowledgePointItem,
    [components.QueID]: questionID,
};