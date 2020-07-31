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
        <div class="icon-title-num" v-if="item.count.toString().indexOf('.')<0">
          <countTo
            separator=""
            :startVal="0"
            :endVal="item.count"
            :duration="2000"
          ></countTo>
        </div>
        <div class="icon-title-num" v-else>
          <countTo
             separator=""
             :decimals="2"
             :startVal="0"
             :endVal="item.count"
             :duration="2000"
          ></countTo>
        </div>
        <div class="icon-title-text">
          {{ item.name }}
        </div>
        <div class="rollNum-title add">{{item.dayCount}}</div>
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
          id: 'sbs',
          imgsrc: require('./img/shangbao.png'),
          name: '上报数',
          count: 0,
          dayCount: 0
        },
        {
          id: 'las',
          imgsrc: require('./img/lianshu.png'),
          name: '有效案件数',
          count: 0,
          dayCount: 0
        },
        {
          id: 'czs',
          name: '处理数',
          imgsrc: require('./img/leijichulishu.png'),
          count: 0,
          dayCount: 0
        },
        {
          id: 'jas',
          name: '城管结案数',
          imgsrc: require('./img/leijijiean.png'),
          count: 0,
          dayCount: 0
        },
        {
          id: 'laccs',
          name: '立案查处数',
          imgsrc: require('./img/lianchachu.png'),
          count: 0,
          dayCount: 0
        },
        {
          id: 'zfjas',
          name: '执法结案数',
          imgsrc: require('./img/zhifajiean.png'),
          count: 0,
          dayCount: 0
        },
        {
          id: 'cfje',
          name: '处罚金额(万)',
          imgsrc: require('./img/chufajine.png'),
          count: 0,
          dayCount: 0
        }
      ],
      resultDataOne:{
        total:{
          zjczs: 0,
          zjjas: 0,
          zjlas: 0,
          zjsbs: 0
        },
        year:{
          bnczs: 0,
          bnjas: 0,
          bnlas: 0,
          bnsbs: 0
        },
        month:{
          byczs: 0,
          byjas: 0,
          bylas: 0,
          bysbs: 0,
        },
        day:{
          brczs: 0,
          brjas: 0,
          brlas: 0,
          brsbs: 0
        }
      },
      resultDataTwo:{
        total:{
          zjlaccs: 0,
          zjzfjas: 0,
          zjcfje:0
        },
        year:{
          bnlaccs: 0,
          bnzfjas: 0,
          bncfje:0
        },
        month:{
          bylaccs: 0,
          byzfjas: 0,
          bycfje:0
        },
        day:{
          brlaccs: 0,
          brzfjas: 0,
          brcfje:0
        }
      }
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
          this.resultDataOne.total = {
            zjczs: response.data.result.zjczs,
            zjjas: response.data.result.zjjas,
            zjlas: response.data.result.zjlas,
            zjsbs: response.data.result.zjsbs
          }
          this.resultDataOne.year = {
            bnczs: response.data.result.bnczs,
            bnjas: response.data.result.bnjas,
            bnlas: response.data.result.bnlas,
            bnsbs: response.data.result.bnsbs
          }
          this.resultDataOne.month = {
            byczs: response.data.result.byczs,
            byjas: response.data.result.byjas,
            bylas: response.data.result.bylas,
            bysbs: response.data.result.bysbs
          }
          this.resultDataOne.day = {
            brczs: response.data.result.brczs,
            brjas: response.data.result.brjas,
            brlas: response.data.result.brlas,
            brsbs: response.data.result.brsbs
          }
          this.dataList.map((item,index) => {
            if(index<4){
              item.count = response.data.result[`zj${item.id}`];
              item.dayCount = response.data.result[`br${item.id}`];
              return item
            }
          })
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));

      this.axios2.get('/pubdle/province/provinceCase000info/ajaxGetCaseCount?_t=' + new Date().getTime()
      ).then(function (response) {
        console.log('ajaxGetCaseCount', response);
        if (response.data.code !== '0') {
          console.log(response)
        } else {
          this.resultDataTwo.total = {
            zjcfje: response.data.result.zjcfje,
            zjlaccs: response.data.result.zjlaccs,
            zjzfjas: response.data.result.zjzfjas
          }
          this.resultDataTwo.year = {
            bncfje: response.data.result.bncfje,
            bnlaccs: response.data.result.bnlaccs,
            bnzfjas: response.data.result.bnzfjas
          }
          this.resultDataTwo.month = {
            bycfje: response.data.result.bycfje,
            bylaccs: response.data.result.bylaccs,
            byzfjas: response.data.result.byzfjas
          }
          this.resultDataTwo.day = {
            brcfje: response.data.result.brcfje,
            brlaccs: response.data.result.brlaccs,
            brzfjas: response.data.result.brzfjas
          }
          console.log('this.resultDataTwo',this.resultDataTwo);
          this.dataList.map((item,index) => {
            if(index > 3){
              item.count = response.data.result[`zj${item.id}`];
              item.dayCount = response.data.result[`br${item.id}`];
              return item
            }
          })
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    },
    handleClick(val){
      console.log('rollNum:' , val);
      if(val.label=='月'){
        this.dataList.map((item, index) => {
          if(index<4){
            item.count = this.resultDataOne.month[`by${item.id}`];
          }
          else{
            item.count = this.resultDataTwo.month[`by${item.id}`];
          }
          return item
        })
      }
      else if(val.label=='年'){
        this.dataList.map((item, index) => {
          if(index<4){
            item.count = this.resultDataOne.year[`bn${item.id}`];
          }
          else{
            item.count = this.resultDataTwo.year[`bn${item.id}`];
          }
          return item
        })
      }
      else{
        this.dataList.map((item, index) => {
          if(index<4){
            item.count = this.resultDataOne.total[`zj${item.id}`];
          }
          else{
            item.count = this.resultDataTwo.total[`zj${item.id}`];
          }
          return item
        })
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
