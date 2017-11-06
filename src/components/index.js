import pre from './src/pre.vue';

/* istanbul ignore next */
pre.install = function(Vue) {
  Vue.component(pre.name, pre);
};

export default pre;