import { BLANK_REGEX } from '../regex/index';

/**
 * [helper 模板对象的 helper 扩展]
 * @type {Object}
 */
const helper = {}

/**
 * [json 以 JSON 字符串的方式输出]
 * @param  {[Object]} data [待格式化输出的对象]
 * @return {[String]}      [格式化输出的字符串]
 */
helper.json = function(data) {
    return JSON.stringify(data)
}

/**
 * [formatDifficulty 格式化输出试题难度]
 * @param  {[Number]} difficulty [难度]
 * @param  {[String]} html       [需遍历的字符串模板]
 * @return {[String]}            [格式化输出的字符串]
 */
helper.formatDifficulty = function(difficulty, html) {
    difficulty = parseInt(difficulty, 10) || 0
    let output = ''
    for (let i = 0; i < difficulty; i++) {
        output += html
    }
    return output
}

/**
 * [formatAnswer 完型填空题格式化输出答案]
 * @param  {[type]} answer [答案数组]
 * @return {[type]}        [格式化输出的字符串]
 */
helper.formatAnswer = function(answer) {
    let output = '';
    if (Array.isArray(answer)) {
        const len = answer.length;
        for (let i = 0; i < len; i++) {
            if (i % 5 == 0 && i > 0) {
                output += ' ';
            }
            output += answer[i];
        }
    }
    return output
}

/**
 * [transfromBlankContent description]
 * @return {[type]} [description]
 */
helper.transfromBlankContent = function(content, type) {
    if (type == 4) {
        let index = -1;
        content = content.replace(BLANK_REGEX, function(match) {
            index++;
            return `<input type="text" data-blank-item="${index}">`
        })
    }
    return content;
}


export default helper
