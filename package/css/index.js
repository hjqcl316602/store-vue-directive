import defaultConfigs from "./configs";

export default {
  install: function(Vue, options = {}) {
    Vue.directive(options["name"] || "css", css(options["configs"], defaultConfigs));
  },
  defaultConfigs
};

function css(prev = {}, next = {}) {
  let newConfigs = merge(prev, next);
  return function(el, binding) {
    let inputs = binding["value"] || {};
    let inputsKeys = Object.keys(inputs);
    let configsKeys = Object.keys(newConfigs);
    inputsKeys.forEach(key => {
      configsKeys.forEach(ele => {
        if (hump(key) === hump(ele)) {
          let find = newConfigs[ele].find(elem => {
            return inputs[key] === elem["label"];
          });
          inputs[key] = find ? find["value"] : inputs[key];
        }
      });
    });
    inputsKeys.forEach(key => {
      el.style.cssText += `${hump.spread(key)}:${inputs[key]}`;
    });
  };
}
/**
 * @name 配置信息的合并
 * @param { prev } [ object ]
 * @param { next } [ object ]
 * @return [ object ]
 */
function merge(prev = {}, next = {}) {
  let nextKeys = Object.keys(next);
  let prevKeys = Object.keys(prev);
  prevKeys.forEach(key => {
    // 判断是否存在该该成熟时属性，若存在，合并之后并且去重，否则追加
    let find = nextKeys.findIndex(item => key === item);
    if (find === -1) {
      next[key] = prev[key];
    } else {
      next[key] = prev[key].concat(next[key]).filter((item, index, array) => {
        return array.findIndex(ele => ele["label"] === item["label"]) === index;
      });
    }
  });
  return next;
}
/**
 * @name 链接符字符串转驼峰
 * @param { string }  [ string ]
 * @return [ string ]
 */
function hump(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  let regex = new RegExp(/\-(\w)/g);
  return string.replace(regex, function(m, c) {
    return c ? c.toUpperCase() : "";
  });
}
/**
 * @name  驼峰字符串转链接字符串
 * @param  {string} [string]
 * @return  [string]
 * @example hump.spread("asashAHjjasHsa") => asash-a-hjjas-hsa
 */

hump.spread = function(string) {
  if (typeof string !== "string") {
    throw new Error("The argument must be string.");
  }
  return string.replace(/([A-Z])/g, function(a, b, c) {
    return "-" + b.toLowerCase();
  });
};
