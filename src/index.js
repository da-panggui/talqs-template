// 引入 art-template 作为内置模板渲染插件
import artTemplate from './lib/artTemplate'
// 引入默认设置
import defaultConfig from './config/index'
// 引入辅助函数
import helper from './helper/index';

import cacheStore from './template/index'

const TalqsTemplate = {
  // 插件版本号
  version: '__VERSION__',
  // 插件默认配置对象
  config: defaultConfig,
}


/**
 * [render TalqsTemplate 渲染试题数据返回 HTML 代码片段]
 * @param  {[Object]} data   [试题数据]
 * @param  {[Object]} config [插件渲染配置]
 * @return {[String]}        [渲染完成后的 HTML 片段]
 * 
 */
TalqsTemplate.render = (data, config) => {
  // 试题数据为空则退出
  if (!data) { return }
  // 合并配置对象
  config = config || {}
  for(let key in defaultConfig) {
    if (config[key] === undefined) {
      config[key] = defaultConfig[key];
    }
  }

  TalqsTemplate.config = config;

  // 编译模板
  const render = artTemplate.cache[config.entryTemplate]
  // 填充数据
  const html = render({config, data, index: config.queIndex });
  // 返回渲染完成的 HTML 字符串
  return html
}

/**
 * [registerHelper 注册 art-template 模板的公用辅助方法]
 * @param {[String]} name     [辅助方法名称]
 * @param {Function} fn       [辅助方法定义]
 */
const registerHelper = (name, fn) => {
  artTemplate.helper(name, fn)
}

TalqsTemplate.registerHelper = registerHelper;

// 注册内置辅助函数
const registerBuiltInHelper = (() => {
  for(let key in helper) {
    registerHelper(key, helper[key])
  }
})();


/**
 * [registerComponent 注册缓存组件模板]
 * @param {[Object]} components      [模板对象]
 */
const registerComponent = (components) => {
  for(let filename in components) {
    const source = components[filename].replace(/^\s*|\s*$/g, '')
    const cache = artTemplate.compile(source, {filename})
    artTemplate.cache[filename] = cache
  }
}

registerComponent(cacheStore)

TalqsTemplate.registerComponent = registerComponent;

/**
 * [registerTemplate 注册一个模板]
 * @param  {[type]} destKey  [现有模板配置的名称，空则新添加一组]
 * @param  {[type]} key      [模板名称]
 * @param  {[type]} template [模板字符]
 * @param  {[type]} index    [需要插入的位置]
 * @return {[type]}          [description]
 */
TalqsTemplate.registerTemplate = (key, list) => {
  TalqsTemplate.config.templates[key] = list;
}

TalqsTemplate.updateTemplateList = (key, list) => {
  let templates = TalqsTemplate.config.templates[key] || [];
  let tempIndex;
  let tempComponent;
  list.forEach((item, index) => {
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
  })
  TalqsTemplate.config.templates[key] = templates;
}

export default TalqsTemplate;