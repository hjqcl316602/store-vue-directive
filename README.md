# store-vue-directive

yarn add store-vue-direvtive
npm install store-vue-direvtive

## css

动态 css 书写

```js
//默认，打印css可查看默认的配置
import { css } from "store-vue-directive";
Vue.use(css);
//添加自定义的快捷属性
// 变量名：必须是可读的css属性名，驼峰表示
// 值：数组，由label和value组成
// 若默认中存在，则覆盖，没有则追加
let fontSize = [{ label: "primary", value: "14px" }, { label: "normal", value: "14px" }];
Vue.use(css, { name: "", configs: { fontSize } });

v-css="{ color: 'primary', 'font-size': '14px', 'background-color': 'primary', height: '100px' }"

```

## flex

```js
import { flex } from "store-vue-directive";
Vue.use(flex);
v-flex="{ gutter: 10 }" // gutter 子元素的间距 justify-content align-items align-content flex-wrap flex-direction

```

## flexItem

```js
// 默认
import { flexItem } from "store-vue-directive";
Vue.use(flexItem);
// 传参
// name : 指令名称
// section:栅格化列
Vue.use(flexItem,{ name :'flex',section:24 });
v-flex-item="{ span: 8, push: 8 }" // span 所占的空间 push 向后偏移量  flex-grow ,  flex-thrink ,  flex-basis ,  order ,  align-self
```
