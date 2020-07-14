<template>
  <div class="grosschart">
    <div class="grosschart__header">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="grosschart__header_tabs"
      >
        <el-tab-pane label="总计" name="总计"></el-tab-pane>
        <el-tab-pane label="本月" name="本月"></el-tab-pane>
        <el-tab-pane label="本周" name="本周"></el-tab-pane>
        <el-tab-pane label="本日" name="本日"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="grosschart__content">
      <div class="grosschart__content_title">
        <div
          class="grosschart__content_title_item"
          flex="cross:center main:right"
          v-for="item in titleName"
          :key="item.typeClass"
          :class="item.typeClass"
        >
          <countTo
            :startVal="0"
            :endVal="parseInt(item.digitroll)"
            :duration="parseInt(item.digitroll)"
          ></countTo>
          <!--<nums-digitroll :digits="item.digitroll"></nums-digitroll>-->
        </div>
      </div>
      <div class="grosschart__content_chart" flex="dir:left">
        <div
          class="grosschart__content_chart-item"
          v-for="item in instrument"
          :key="item.starClor"
        >
          <instrument
            :title="item.title"
            :starClor="item.starClor"
            :endClor="item.endClor"
            :percent="item.percent"
            :shadowColor="item.shadowColor"
          ></instrument>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Instrument from "../instrument/instrument";
import NumsDigitroll from "../numsDigitroll/numsDigitroll";
import countTo from 'vue-count-to';
export default {
  name: "grossChart",
  components: {NumsDigitroll, Instrument, countTo},
  data(){
    return {
      //定时器
      interval: '',
      //定时器时间
      timer: 600000,
      type: 4,
      activeName: '总计',
      titleName:null,
      instrument: [
        {
          title: "立案率",
          starClor: "#00FAEC",
          endClor: "#009FFE",
          percent: 0,
          shadowColor: "#0093ee",
        },
        {
          title: "处置率",
          starClor: "#F4D046",
          endClor: "#FC8300",
          percent: 0,
          shadowColor: "#F8A923",
        },
        {
          title: "按时处置率",
          starClor: "#7BE52B",
          endClor: "#24A700",
          percent: 0,
          shadowColor: "#29bd00",
        },
        {
          title: "结案率",
          starClor: "#F67423",
          endClor: "#DD3026",
          percent: 0,
          shadowColor: "#e06b21",
        },
      ]
    }
  },
  created(){
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted(){
    this.cycleTime()
  },
  computed: {
    optionCode(){
      return this.$store.state.optionCode;
    },
  },
  watch: {
    optionCode: function (){
      this.cycleTime()
    },
  },
  methods: {
    handleClick(tab, event){
      console.log(tab.label);
      if (tab.label == '本日') {
        this.type = 1
      }
      if (tab.label == '本周') {
        this.type = 2
      }
      if (tab.label == '本月') {
        this.type = 3
      }
      if (tab.label == '总计') {
        this.type = 4
      }
      this.cycleTime()
    },
    cycleTime(){
      clearInterval(this.interval)
      this.acquire()
      this.interval = setInterval(() => {
        // console.log('执行一次')
        this.acquire()
      }, this.timer);
    },
    acquire(placecode = this.$store.state.optionCode){
      console.log('this.$store.state.optionCode',this.$store.state.optionCode)
      this.axios.post('/bigscreen/eventCount', this.qs.stringify({
        placecode: placecode,
        type: this.type
      })).then(function (response){
        if (response.data.code !== '0') {
          console.log(response)
        } else {
          console.log(response.data.result.rateData)
          this.instrument = response.data.result.rateData;
          this.titleName = response.data.result.countData;
        }
      }.bind(this))
    },
  },
}
</script>

<style scoped lang="scss">
@import "grossChart";
</style>
<style lang="scss">
.grosschart {
  .el-tabs {
    height: 100%;
    padding-top: 35px;
  }

  .el-tabs__header {
    margin: 0;
    z-index: 10;
    height: 100%;

    .el-tabs__item {
      padding: 0 10px;
      font-size: 18px;
      color: #8f9ac2;
    }

    .is-active {
      color: #40cef9;
    }
  }

  .el-tabs__nav-wrap {
    height: 100%;
  }

  .el-tabs__nav {
    height: 100%;
  }

  .el-tabs__nav-scroll {
    height: 100% !important;
  }

  .el-tabs__item {
    height: 100% !important;
  }

  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .el-tabs__active-bar {
    height: 4px;
    background-color: #ffe013;
    bottom: 0 !important;
  }
}
</style>
