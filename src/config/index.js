import templates from './template'
import labels from './label'
import { question } from './template';
import style from './style';

/**
 * talqsTemplateConfig 模板默认渲染配置
 */

const talqsTemplateConfig = {
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
  templates,

  /**
   * 常用文字标题配置
   */
  labels,

  /**
   * 试题题号
   */
  queIndex: 0,

  /**
   * 默认渲染入口模板名称
   */
  entryTemplate: question,

  /**
   * 默认自动布局选项 DOM 钩子
   */
  autoLayoutHook: '[data-auto-layout="1"]',

  /**
   * 自动布局添加样式
   * eg: ${layoutClassName}_1
   *     ${layoutClassName}_2
   *     ${layoutClassName}_4
   */
  layoutClassName: style.optionsList,
}


export default talqsTemplateConfig