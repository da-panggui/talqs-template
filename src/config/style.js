const main = 'talqs';
const options = `${main}_options`;

export default {
  main,
  options,
  // 题干
  stems: `${main}_main`,
  // 子题
  subqs: `${main}_subqs`,
  content: `${main}_content`,
  difficulty: `${main}_difficulty`,
  index: `${main}_index`,
  source: `${main}_source`,
  knowledgePoint: `${main}_knowledgePoint`,
  id: `${main}_id`,
  analyzeItem: '${main}_analyze_item',
  analyzeItemIndex: '${main}_analyze_item_index',
  panelItem: '${main}_panel_item',
  panelItemContent: '${main}_panel_item_content',
  answer: `${main}_answer`,
  analyze: `${main}_analyze`,
  analyzeGroup: `${main}_analyzeGroup`,
  analyzeSingle: `${main}analyzeSingle`,

  optionsList: `${options}_list`,
  optionsRows: `${options}_rows`,
  optionsColumns: `${options}_columns`,
  optionsItem: `${options}_columns_item`,
  optionsIndex: `${options}_index`,
  optionsLabel: `${options}_label`,
  optionsContent: `${options}_content`,

  label: `${main}_label`,
  panel: `${main}_panel`,
  tree: `${main}_tree`,
  clear: 'clearfix'
}