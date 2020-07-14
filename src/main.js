import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

//引入vue全局方法
import base from "./base.js";
Vue.use(base);

//引入flexBox
import "common/scss/library/flexBox.scss";

//引入字体
import "common/css/common.css";

// 引入iconfont
import "common/iconfont/iconfont.css";

import { HappyScroll } from "vue-happy-scroll";
//自定义组件名
Vue.component("happy-scroll", HappyScroll);
// 引入css
import "vue-happy-scroll/docs/happy-scroll.css";

import vuescroll from 'vuescroll';

// 你可以在这里设置全局配置
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#1c7dfa',
    }
  }, // 在这里设置全局默认配置
  name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
});

//引入vueg 专场动画
import vueg from "vueg";
Vue.use(vueg, router);

import _ from "lodash";
Vue.use(_);

//引入数字缓动
import "common/js/TweenMax.min.js";

// 引入echarts
import echarts from "echarts";
import echartsGl from "echarts-gl";
Vue.prototype.$echarts = echarts;

//无缝滚动
import scroll from "vue-seamless-scroll";
Vue.use(scroll);

Vue.config.productionTip = false;

//引入函数库
import lodash from "lodash";
Vue.use(lodash);

//引入Swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
// require styles
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default global options } */);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
