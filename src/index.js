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

  get components() {
    return this.config.components;
  }
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
  const render = artTemplate.cache[config.entryTemplate];
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


/**
 * 更新模板构成
 * @param  {[type]} data [description]
 */
const updateTemplateList = (data) => {
  const templates = TalqsTemplate.config.templates;
  for (let key in data) {
    const item = data[key];
    let templateList = templates[key] || [];
    // 移除模板中不需要的组件
    if (item.exclude && item.exclude.length && templateList.length) {
      templateList = templateList.filter((sub) => item.exclude.indexOf(sub) === -1)
    }
    // 添加新定义的组件或者覆盖内置组件
    if (item.components && item.components.length) {
      let name;
      let index;
      let componentList = {};
      item.components.forEach((component) => {
        name = component.name;
        index = templateList.indexOf(name);
        if (index < 0) { // 新添加的组件
          const targetIndex = isNaN(component.index) ? templateList.length : component.index;
          templateList.splice(targetIndex, 0, name);
        } else { // 覆盖内置组件
          if (!isNaN(component.index)) {
            templateList.splice(index, 1);
            templateList.splice(component.index, 0, name);
          }
        }
        componentList[name] = component.template;
      })
      registerComponent(componentList);
    }
    // 模板重新赋值
    TalqsTemplate.config.templates[key] = templateList.filter((key) => typeof key === 'string');
  }
}

TalqsTemplate.updateTemplateList = updateTemplateList;

/**
 * 试题选项自动布局
 * @param  {[Number]} width     [布局宽度，默认为选项容器的宽度]
 */
TalqsTemplate.autoLayout = (width) => {
  // 列表钩子名称，默认使用内置的类名
  const hookName = TalqsTemplate.config.autoLayoutHook;
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
      item.classList.add(`${TalqsTemplate.config.layoutClassName}_${bestAxis}`);
      // 重置display样式
      item.style.display = '';
    });
  }
}

export default TalqsTemplate;