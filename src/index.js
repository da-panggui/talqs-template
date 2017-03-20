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
for(let key in helper) {
  registerHelper(key, helper[key])
}

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
 * @param  {[type]} key      [模板名称]
 * @param  {[type]} list     [组件列表]
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


TalqsTemplate.autoLayout = (width, className) => {
  const defaultName = '[data-auto-layout="1"]';
  // 列表钩子名称，默认使用内置的类名
  const hookName = className || defaultName;
  // 获取需要布局的列表 DOM 集合
  let autoLayoutList = document.querySelectorAll(hookName);
  
  if (autoLayoutList && autoLayoutList.length) {
    autoLayoutList = Array.prototype.slice.apply(autoLayoutList);
    // 遍历判断选项宽度，调整布局
    autoLayoutList.forEach((item) => {
      // 选项容器的宽度
      const containerWidth = width || Math.floor(item.offsetWidth);
      // 暂时调整容器的布局方式，以获取选项的最大宽度
      item.style.display = 'inline-block';
      // 选项个数
      const childLen = item.children.length;
      // 获取inline-block布局下最大的宽度. 自身宽度 + padding-right 10px
      const maxItemWidth = Math.ceil(item.offsetWidth + 10);
      // 默认最佳布局模式
      let bestAxis = 1;
      if (maxItemWidth) {
        const maxLen = Math.floor(containerWidth / maxItemWidth);
        if (childLen <= maxLen) { // 子选项少于理论上能摆放的个数
          bestAxis = childLen;
        } else { // 折行显示情况判断
          if (maxItemWidth >= containerWidth / 2) { // 选项宽度大于等于总宽度的一半
            bestAxis = 1;
          } else if (maxItemWidth >= containerWidth / 4) { // 大于等于 1/4
            bestAxis = 2;
          } else { // 其他情况一律四行显示
            bestAxis = 4;
          }
        }
      }
      item.classList.add(`talqs_options_list_${bestAxis}`);
      // 重置display样式
      item.style.display = '';
    });
  }
}

export default TalqsTemplate;