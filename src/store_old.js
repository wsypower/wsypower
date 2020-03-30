import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    optionCode: "3306",
    optionCodeDeful: "3306",
    pageIndex: 0,
    iframeUrl: null || localStorage.getItem("iframeUrl")
  },
  mutations: {
    setOption(state, updata) {
      state.optionCode = updata;
      localStorage.setItem("optionCode", updata);
    },
    setIframeUrl(state, updata) {
      state.iframeUrl = updata;
      localStorage.setItem("iframeUrl", updata);
    },
    setPageIndex(state, updata) {
      state.pageIndex = updata;
    }
  },
  actions: {}
});
