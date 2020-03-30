<template>
  <div class="screen_header" flex="main:justify">
    <div class="screen_header_left">
      <el-cascader
        ref="areaSlect"
        :options="options"
        v-model="selectedOptions"
        change-on-select
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="screen_header_center">
      <ul flex="cross:center main:center">
        <li
          flex="cross:center main:center"
          v-for="(item, index) in navs"
          :class="{ navactve: index == tabIndex }"
          @click="goFileDeal(item, index)"
        >
          <img :src="item.imgsrc" alt />
          {{ item.value }}
        </li>
      </ul>
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
          value: "辖区概况",
          imgsrc: require("./img/xq.png"),
          item: "/"
        },
        {
          value: "智慧物联",
          imgsrc: require("./img/wulianwang.png"),
          item: "/wisdomThings"
        },
        {
          value: "案卷处理",
          imgsrc: require("./img/anjuanchuli.png"),
          item: "/filesDispose"
        },
        {
          value: "智能分析",
          imgsrc: require("./img/zhinengjiaoxue.png"),
          item: "/intelligentAnalytics"
        },
        {
          value: "应急指挥",
          imgsrc: require("./img/yinjiyuan.png"),
          item: "/mapiframe"
        }
      ],
      options: [
        {
          value: "330921",
          label: "岱山",
          children: [
            {
              value: "330921001",
              label: "高亭镇"
            },
            {
              value: "33092106",
              label: "衢山镇"
            },
            {
              value: "13",
              label: "东沙镇"
            },
            {
              value: "14",
              label: "岱西镇"
            },
            {
              value: "15",
              label: "长涂镇"
            },
            {
              value: "16",
              label: "岱东镇"
            },
            {
              value: "16",
              label: "秀山乡"
            }
          ]
        }
      ],
      selectedOptions: ["330921", "330921001"]
    };
  },
  created() {
    this.acquire();
    this.grtLocalTime();
  },
  mounted() {},
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    }
  },
  watch: {
    optionCode: function(old) {
      if (this.selectedOptions.length == 1) {
        this.selectedOptions.push(old);
      } else {
        if (old == "330921") {
          this.selectedOptions = ["330921"];
        } else {
          this.selectedOptions = ["330921"];
          this.selectedOptions.push(old);
        }
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value[value.length - 1]);
      this.$store.commit("setOption", value[value.length - 1]);
    },
    goFileDeal(item, index) {
      this.tabIndex = index;
      this.$router.push(item.item);
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
.el-input__inner {
  background-color: transparent !important;
  border-color: transparent !important;
  font-size: 16px !important;
  color: #fff !important;
  padding-left: 20px !important;
  line-height: 40px !important;
}
.el-cascader .el-icon-arrow-down {
  color: #fff !important;
  font-size: 18px !important;
  line-height: 40px !important;
}
.el-cascader__label {
  font-size: 18px !important;
  color: #fff !important;
  line-height: 40px !important;
  padding-top: 3px !important;
  text-align: center !important;
  span {
    color: #fff !important;
  }
  .el-cascader-menus {
  }
}
.el-cascader-menu {
  height: auto !important;
  border-right: none !important;
  background-color: transparent !important;
}
.el-cascader-menus {
  border: 1px solid #0dfffd !important;
  /*background-color: red!important;*/
  background-color: rgba(19, 28, 99, 0.7) !important;
}
.popper__arrow {
  border-bottom-color: transparent !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: transparent !important;
}
.el-cascader-menu__item {
  color: #fff !important;
}
.el-cascader-menu__item:focus:not(:active),
.el-cascader-menu__item:hover {
  background-color: #1668b4 !important;
}
</style>
