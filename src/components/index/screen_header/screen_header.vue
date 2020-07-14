<template>
  <div class="screen_header" flex="dir:left cross:center main:justify">
    <div class="screen_header_left">
      普陀智慧城管平台
    </div>
    <div class="screen_header_center" flex="dir:left cross:center main:justify">
      <div class="screen_header_center-left"></div>
      <div class="screen_header_center-main" flex="dir:left cross:center main:justify">
        <div class="item" flex="dir:top cross:center"
             v-for="(nav,index) in navs" :key="index"
             :class="{ active: index == tabIndex }"
             @click="goFileDeal(nav, index)">
          <div class="item_icon" flex="cross:center main:center">
            <span class="icon iconfont" :class="nav.className"></span>
          </div>
          <div class="none checked"></div>
          <div class="item_text">{{nav.name}}</div>
        </div>
      </div>
      <div class="screen_header_center-right"></div>
    </div>
    <div class="screen_header_right" flex="cross:center main:justify">
      <div class="screen_timer">{{ localTime }}</div>
      <div class="screen_week">{{ weekday }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "screen_header",
  data() {
    return {
      params: {},
      tabIndex: this.$store.state.pageIndex,
      localTime: "",
      weekday: "",
      navs: [
        {
          name: "辖区概况",
          className: "icon-gaikuang",
          path: "/"
        },
        {
          name: "案卷处理",
          className: "icon-wenjian",
          path: "/filesDispose"
        },
        {
          name: "智能分析",
          className: "icon-zhinengfenxidaoru",
          path: "/intelligentAnalytics"
        },
        {
          name: "专题分析",
          className: "icon-zhuantibaodao",
          path: "/mapiframe"
        }
      ],
    };
  },
  created() {
    this.acquire();
    this.grtLocalTime();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    handleChange(value) {
      console.log(value[value.length - 1]);
      this.$store.commit("setOption", value[value.length - 1]);
    },
    goFileDeal(item, index) {
      this.tabIndex = index;
      this.$router.push(item.path);
    },
    grtLocalTime() {
      let mydate = new Date();
      let myddy = mydate.getDay(); //获取存储当前日期
      let weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      this.weekday = weekday[myddy];
      setInterval(() => {
        this.localTime = this.$localTime(3);
      }, 1000);
    },

    acquire() {
      // this.selectedOptions.push(330921);
      // this.$store.commit('setOption', 330921);
      // console.log(11222)
      this.getUrlParams();
      let userId = this.params.userId;
      console.log(userId);
      this.axios
        .post(
          "/bigscreen/countyList",
          this.qs.stringify({
            userId: userId
          })
        )
        .then(
          function(response) {
            console.log(response);
            if (response.data.code !== "0") {
              // console.log(111)
              console.log(response);
            } else {
              // console.log(response.data.result)
              this.options = [];
              this.options.push(response.data.result);
              this.selectedOptions = ["330921", "330921001"];
              this.$store.commit("setOption", "330921001");
              // this.selectedOptions.push(response.data.result.value);
              // this.$store.commit('setOption', response.data.result.value);
              // console.log('this.selectedOptions',this.selectedOptions);
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    getUrlParams(prop) {
      let params = {},
        query =
          window.location.search.length > 0
            ? window.location.search.substring(1)
            : "",
        arr = query.split("&"),
        rt;
      for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i],
          tmp = item.split("="),
          key = tmp[0],
          val = tmp[1];
        if (typeof params[key] == "undefined") {
          params[key] = val;
        } else if (typeof params[key] == "string") {
          params[key] = [params[key], val];
        } else {
          params[key].push(val);
        }
      }
      rt = prop ? params[prop] : params;
      console.log(rt);
      this.params = rt;
    }
  }
};
</script>

<style scoped lang="scss">
@import "screen_header";
</style>
<style lang="scss">

</style>
