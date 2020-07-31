"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: SCREEN_CONFIG.baseURL2,//测试服务器(SCREEN_CONFIG在public 中配置)
  timeout: 60 * 1000, // Timeout
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


export default {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      axios2: {
        get() {
          return _axios;
        }
      }
    });
  }
}
