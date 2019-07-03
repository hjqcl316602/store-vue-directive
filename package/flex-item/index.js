export default {
  install: function(Vue, options = {}) {
    Vue.directive(options["name"] || "flex-item", flexItem(options["section"] || 24));
  }
};

const storage = ["flex-grow", "flex-thrink", "flex-basis", "order", "align-self"];

function flexItem(section) {
  return function(el, binding) {
    el.style.cssText += "-webkit-box-sizing: border-box;box-sizing: border-box";
    let inputs = binding["value"] || {};
    let inputsKeys = Object.keys(inputs);

    inputsKeys.forEach(key => {
      let findIndex = storage.findIndex(item => hump(key) === hump(item));
      if (findIndex !== -1) {
        el.style.cssText += `${hump.spread(key)}:${inputs[key]}`;
      }
    });
    let span = inputs["span"];
    let push = inputs["push"];
    if (span) {
      el.style.cssText += `flex:none`;
      el.style.cssText += `flex-basis:${(parseFloat(span) / section) * 100}%`;
    }
    if (push) {
      el.style.cssText += `margin-left:${(parseFloat(push) / section) * 100}%`;
    }
  };
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
