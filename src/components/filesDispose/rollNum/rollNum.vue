<template>
  <div class="rollNum">
    <div class="rollNum-header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
          <el-tab-pane label="月" name="月"></el-tab-pane>
          <el-tab-pane label="年" name="年"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <ul flex="dir:left main:justify">
      <li flex="dir:top cross:center" v-for="item in dataList" :key="item.imgsrc">
        <div class="rollNum-roll-icon">
          <!--转圈的圆形-->
          <roll-animation>
            <img :src="item.imgsrc" alt="" />
          </roll-animation>
        </div>
        <div class="icon-title-num" v-if="item.grand.toString().indexOf('.')<0">
          <countTo
            separator=""
            :startVal="item.startVal"
            :endVal="item.grand"
            :duration="item.endVal"
          ></countTo>
        </div>
        <div class="icon-title-num" v-else>
          <countTo
             separator=""
             :decimals="2"
             :startVal="item.startVal"
             :endVal="item.grand"
             :duration="item.endVal"
          ></countTo>
        </div>
        <div class="icon-title-text">
          {{ item.value }}
        </div>
        <div class="rollNum-title add">{{item.datacreat}}</div>
        <div class="rollNum-title">今日新增</div>
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
      activeName: '总计',
      //定时器
      interval: '',
      //定时器时间
      timer:600000,
      dataList: [
        {
          startVal:0,
          endVal:1000,
          value: '上报数',
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
          value: '有效案件数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/lianshu.png'),
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '处理数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/leijichulishu.png')
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '城管结案数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/leijijiean.png')
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '立案查处数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/lianchachu.png'),
        },
        {
          startVal:0,
          endVal:1000,
          duration:50000,
          value: '执法结案数',
          grand: 0,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/zhifajiean.png'),
        },
        {
          startVal:0,
          endVal:5.49,
          duration:2000,
          value: '处罚金额(万)',
          grand: 5.89,
          datacreatVal:0,
          datacreat: 0,
          imgsrc: require('./img/chufajine.png'),
        }
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
    userId() {
      return this.$store.state.userId;
    }
  },
  watch: {
    optionCode: function () {
      this.cycleTime()
    }
  },
  methods: {
    cycleTime() {
      clearInterval(this.interval)
      this.acquire()
      this.interval = setInterval(() => {
        this.acquire()
      }, this.timer);
    },
    acquire() {
      this.axios.post('/bigscreen/eventSummarize', this.qs.stringify({
        userId: this.userId,
        placecode: this.optionCode
      })).then(function (response) {
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          this.dataList[0].startVal = this.dataList[0].grand;
          this.dataList[0].grand = response.data.result.bnsbs;
          this.dataList[0].datacreatVal = this.dataList[0].datacreat;
          this.dataList[0].datacreat = response.data.result.brsbs;

          this.dataList[1].startVal = this.dataList[0].grand;
          this.dataList[1].grand = response.data.result.bnlas;
          this.dataList[1].datacreatVal = this.dataList[0].datacreat;
          this.dataList[1].datacreat = response.data.result.brlas;

          this.dataList[2].startVal = this.dataList[0].grand;
          this.dataList[2].grand = response.data.result.bnczs;
          this.dataList[2].datacreatVal = this.dataList[0].datacreat;
          this.dataList[2].datacreat = response.data.result.brczs;

          this.dataList[3].startVal = this.dataList[0].grand;
          this.dataList[3].grand = response.data.result.bnjas;
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
