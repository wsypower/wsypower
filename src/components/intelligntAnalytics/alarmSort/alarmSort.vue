<template>
  <div class="alarmSort">
    <div class="alarmSort_header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
          <el-tab-pane label="本日" name="本日"></el-tab-pane>
          <el-tab-pane label="本周" name="本周"></el-tab-pane>
          <el-tab-pane label="本月" name="本月"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="sort_content" flex="dir:left">
      <div class="type-panel" flex="main:center cross:center">
        <el-radio-group v-model="sjtype" @change="changeSJType">
          <el-radio label="01">事件</el-radio>
          <el-radio label="02">部件</el-radio>
        </el-radio-group>
      </div>
      <div class="card-item">
        <div class="ul-panel scroll-height">
          <my-scroll>
            <ul>
              <li class="ul-header">
                <span>排名</span>
                <span>告警类型</span>
                <span>告警次数</span>
              </li>
              <li class="ul-body" v-for="(item, index) in tableDataList" :key="index">
                <span>
                  <i>{{ index + 1 }}</i>
                </span>
                <span>{{ item.type }}</span>
                <span>{{ item.num }}</span>
              </li>
            </ul>
          </my-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "alarmSort",
  data() {
    return {
      activeName: "总计",
      sjtype: "01",
      type: 4,
      //定时器
      interval: "",
      //定时器时间
      timer: 600000,
      tableDataList: []
    };
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer;
  },
  mounted() {
    this.cycleTime(this.optionCode);
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    }
  },
  watch: {
    optionCode: function(val) {
      this.cycleTime(val);
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab.label);
      if (tab.label == "本日") {
        this.type = 1;
      }
      if (tab.label == "本周") {
        this.type = 2;
      }
      if (tab.label == "本月") {
        this.type = 3;
      }
      if (tab.label == "总计") {
        this.type = 4;
      }
      this.cycleTime(this.optionCode);
    },
    changeSJType(val) {
      console.log("changeSJType", this.sjtype, val);
      this.cycleTime(this.optionCode);
    },
    cycleTime(placecode) {
      clearInterval(this.interval);
      this.acquire(placecode);
      this.interval = setInterval(() => {
        // console.log('执行一次')
        this.acquire(placecode);
      }, this.timer);
    },
    acquire(placecode) {
      let _this = this;
      this.axios
        .get(
          "/bigscreen/getAlarmSortDataList?placecode=" +
            placecode +
            "&type=" +
            this.type +
            "&sjtype=" +
            this.sjtype +
            "&_t=" +
            new Date().getTime()
        )
        .then(
          function(response) {
            if (response.data.code !== "0") {
              console.log(response);
            } else {
              _this.tableDataList = response.data.result;
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped lang="scss">
  @import "alarmSort";
</style>
<style lang="scss">
.alarmSort {
  .scroll-height {
    .happy-scroll-container {
      height: 250px !important;
    }
  }
}
</style>
<style lang="scss">
.navChartChange {
  .el-tabs__header {
    margin: 22px 0px 0px 0px;
    z-index: 10;

    .el-tabs__item {
      font-size: 18px;
      color: #8f9ac2;
    }

    .is-active {
      color: #40cef9;
    }
  }

  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .el-tabs__active-bar {
    height: 4px;
    background-color: #ffe013;
  }
}
</style>
