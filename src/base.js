import qs from 'qs'
import _ from 'lodash'
export default {
  install(Vue,options) {
    Vue.prototype.qs = qs;
    Vue.prototype.$lodash = _
    //获取本地时间
    Vue.prototype.$localTime = function (num) {
      var time = new Date();
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();

      function add0(m) {
        return m < 10 ? '0' + m : m
      }

      if (num === 1) {
        return y + '-' + add0(m) + '-' + add0(d);
      } else if (num === 2) {
        return add0(h) + ':' + add0(mm) + ':' + add0(s);
      } else if (num === 3) {
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
      }
    };
    Vue.prototype.$formatDate = function (needTime) {
      var time = new Date(needTime);
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      function add0(m) {
        return m < 10 ? '0' + m : m
      }

      return add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
    };
  }
}
