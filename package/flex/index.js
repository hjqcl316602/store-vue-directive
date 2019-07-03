export default {
  install: function(Vue, options = {}) {
    Vue.directive(options["name"] || "flex", flex(options["configs"]));
  }
};

const storage = ["justify-content", "align-items", "align-content", "flex-wrap", "flex-direction"];

function flex() {
  return function(el, binding) {
    el.style.cssText += "-webkit-box-sizing: border-box;box-sizing: border-box;display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap";

    let inputs = binding["value"] || {};
    let inputsKeys = Object.keys(inputs);
    inputsKeys.forEach(key => {
      let findIndex = storage.findIndex(item => hump(key) === hump(item));
      if (findIndex !== -1) {
        el.style.cssText += `${hump.spread(key)}:${inputs[key]}`;
      }
    });
    // 设置子元素间距
    let gutter = inputs["gutter"];
    if (gutter) {
      let half = parseFloat(gutter) / 2;
      el.style.cssText += `margin-left:-${half}px;margin-right:-${half}px`;
      let childrens = Array.from(el.children) || [];
      childrens.forEach(child => {
        child.style.cssText += `padding-left:${half}px;padding-right:${half}px`;
      });
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
