import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    optionCode: "330903",
    userId: '',
    pageIndex: 0,
    iframeUrl: null || localStorage.getItem("iframeUrl")
  },
  mutations: {
    setOption(state, updata) {
      state.optionCode = updata;
      localStorage.setItem("optionCode", updata);
    },
    setUserId(state, updata) {
      state.userId = updata;
      localStorage.setItem("userId", updata);
    },
    setIframeUrl(state, updata) {
      state.iframeUrl = updata;
      localStorage.setItem("iframeUrl", updata);
    },
    setPageIndex(state, updata) {
      state.pageIndex = updata;
      localStorage.setItem("pageIndex", updata);
    }
  },
  actions: {}
});
