<template>
  <div class="panel">
    <div class="content" flex="dir:left cross:center">
      <div class="rollNum-roll-icon">
        <!--转圈的圆形-->
        <roll-animation>
          <img :src="imgsrc" alt />
        </roll-animation>
      </div>
      <div class="total-panel">
        <div class="num">{{ sourceList[0] }}</div>
        <div class="text">设备总数</div>
      </div>
      <div
        style="margin-left: 70px;width:100%;padding-right:20px;"
        flex="dir:left cross:center main:justify"
      >
        <div class="alarm-panel" flex="dir:left cross:center">
          <div class="text">告警设备</div>
          <div class="num">{{ sourceList[1] }}</div>
        </div>
        <div class="outline-panel" flex="dir:left cross:center">
          <div class="text">离线设备</div>
          <div class="num">{{ sourceList[2] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import RollAnimation from "../../filesDispose/rollNum/rollAnimation/rollAnimation";
export default {
  name: "equipmentNum",
  components: {
    RollAnimation
  },
  data() {
    return {
      imgsrc: require("./img/tuceng.png"),
      //定时器
      interval: "",
      //定时器时间
      timer: 600000,
      sourceList: []
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
          "/iot/device/state?placecode=" +
            placecode +
            "&_t=" +
            new Date().getTime()
        )
        .then(
          function(response) {
            if (response.data.code !== "0") {
              console.log(response);
            } else {
              let count = response.data.result.count;
              _this.sourceList = [
                count.sumCount,
                count.alarmSumCount,
                count.offlineSumCount
              ];
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
.panel {
  height: 128px;
  width: 638px;
  margin-left: 20px;
  margin-top: 56px;
  .content {
    width: 100%;
    height: 100%;
    background: url("img/background.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .rollNum-roll-icon {
      width: 63px;
      height: 63px;
      margin-left: 24px;
      /deep/.leijiicon {
        width: 22px;
      }
    }
    .total-panel {
      margin-left: 16px;
      min-width: 80px;
      .text {
        font-family: BigYoungMedium;
        font-size: 18px;
        color: #ffffff;
      }
      .num {
        font-family: LCD;
        font-size: 42px;
        color: #49d9fe;
      }
    }
    .alarm-panel {
      background: url("img/gaojing.png") no-repeat 1px;
      background-color: #1c195c;
      border-radius: 14px;
      padding-right: 20px;
    }
    .outline-panel {
      background: url("img/lixian.png") no-repeat 1px;
      background-color: #1c195c;
      border-radius: 14px;
      padding-right: 20px;
    }
    .alarm-panel,
    .outline-panel {
      .text {
        padding-left: 36px;
        font-family: BigYoungMedium;
        font-size: 16px;
        color: #ffffff;
      }
      .num {
        font-family: LCD;
        font-size: 26px;
        color: #49d9fe;
        margin-left: 16px;
        line-height: 28px;
      }
    }
  }
}
</style>
