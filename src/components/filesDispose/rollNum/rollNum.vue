<template>
  <div class="rollNum">
    <div class="rollNum-header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="月" name="月"></el-tab-pane>
          <el-tab-pane label="年" name="年"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <ul flex="dir:top">
      <li flex="cross:center" v-for="item in dataList" :key="item.imgsrc">
        <div class="rollNum-roll" flex="cross:center">
          <div class="rollNum-roll-icon">
            <!--转圈的圆形-->
            <roll-animation>
              <img :src="item.imgsrc" alt="" />
            </roll-animation>
          </div>
          <div class="rollNum-roll-icon-title" flex="dir:top cross:center">
            <div class="icon-title-text">
              {{ item.value }}
            </div>
            <div class="icon-title-num">
              <!--{{item.grand}}-->
              <countTo
                :startVal="item.startVal"
                :endVal="item.grand"
                :duration="item.endVal"
              ></countTo>
            </div>
          </div>
        </div>
        <div class="rollNum-title" flex="cross:center main:center">
          今日新增：
          <span>
            <countTo
              :startVal="item.datacreatVal"
              :endVal="item.datacreat"
              :duration="item.endVal"
            ></countTo>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

import RollAnimation from "./rollAnimation/rollAnimation";
import countTo from 'vue-count-to';

export default {
  name: "rollNum",
  components: {RollAnimation, countTo},
  data() {
    return {
      activeName: '月',
      //定时器
      interval: '',
      //定时器时间
      timer:600000,
      dataList: [
        {
          startVal:0,
          endVal:1000,
          value: '累计上报数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/shangbao.png'),
          duration:50000
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '累计立案数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/lianshu.png'),
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '累计处理数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/leijichulishu.png')
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '累计结案数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/leijijiean.png')
        },
      ],
      resultData:{}
    }
  },
  created(){
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted() {
    this.cycleTime()
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
  },
  watch: {
    optionCode: function (old) {
      this.cycleTime(old)
    },
    dataList: {
      handler(newName, oldName) {
        console.log(11)
        console.log(oldName[0].grand)
      },
      deep: true
    }
  },
  methods: {
    cycleTime(placecode) {
      clearInterval(this.interval)
      this.acquire(placecode)
      this.interval = setInterval(() => {
        this.acquire(placecode)
      }, this.timer);
    },
    acquire(placecode = this.$store.state.optionCode) {
      this.axios.post('/bigscreen/eventSummarize', this.qs.stringify({
        placecode: placecode,
      })).then(function (response) {
        if (response.data.code !== '0') {
          console.log(response)
        } else {
          this.dataList[0].startVal = this.dataList[0].grand;
          this.dataList[0].grand = response.data.result.bysbs;
          this.dataList[0].datacreatVal = this.dataList[0].datacreat;
          this.dataList[0].datacreat = response.data.result.brsbs;

          this.dataList[1].startVal = this.dataList[0].grand;
          this.dataList[1].grand = response.data.result.bylas;
          this.dataList[1].datacreatVal = this.dataList[0].datacreat;
          this.dataList[1].datacreat = response.data.result.brlas;

          this.dataList[2].startVal = this.dataList[0].grand;
          this.dataList[2].grand = response.data.result.byczs;
          this.dataList[2].datacreatVal = this.dataList[0].datacreat;
          this.dataList[2].datacreat = response.data.result.brczs;

          this.dataList[3].startVal = this.dataList[0].grand;
          this.dataList[3].grand = response.data.result.byjas;
          this.dataList[3].datacreatVal = this.dataList[0].datacreat;
          this.dataList[3].datacreat = response.data.result.brjas;

          this.resultData = response.data.result;
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    },
    handleClick(val){
      console.log('rollNum:' , val);
      if(val.label=='月'){
        this.dataList[0].grand = this.resultData.bysbs;
        this.dataList[1].grand = this.resultData.bylas;
        this.dataList[2].grand = this.resultData.byczs;
        this.dataList[3].grand = this.resultData.byjas;
      }
      else{
        this.dataList[0].grand = this.resultData.bnsbs;
        this.dataList[1].grand = this.resultData.bnlas;
        this.dataList[2].grand = this.resultData.bnczs;
        this.dataList[3].grand = this.resultData.bnjas;
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "rollNum";
</style>
<style lang="scss">
.navChartChange {
  .el-tabs__header {
    margin: 0;
    margin-top: 20px;
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
    width: 16px !important;
    background-color: #ffe013;
  }
  .el-tabs__item {
    padding: 0px 15px;
  }
}
</style>
