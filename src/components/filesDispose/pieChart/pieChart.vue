<template>
  <div class="pieChart">
    <div class="pie_header"></div>
    <!--<div class="pie_header" flex="main:right">-->
      <!--<div class="navChartChange">-->
        <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
          <!--<el-tab-pane label="总计" name="总计"></el-tab-pane>-->
          <!--<el-tab-pane label="日" name="日"></el-tab-pane>-->
          <!--<el-tab-pane label="月" name="月"></el-tab-pane>-->
          <!--<el-tab-pane label="年" name="年"></el-tab-pane>-->
        <!--</el-tabs>-->
      <!--</div>-->
    <!--</div>-->
    <div v-show="updata.length===0" class="pie_content" flex="cross:center main:center"><span class="nodata-text">暂无数据</span></div>
    <div v-show="updata.length!==0" class="pie_content" id="pieSource"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "pieChart",
  data() {
    return {
      activeName: '总计',
      type: 4,
      //定时器
      interval: '',
      //定时器时间
      timer:600000,
      updata: []
    }
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted() {
    this.cycleTime()
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
    userId(){
      return this.$store.state.userId;
    }
  },
  watch: {
    optionCode: function () {
      this.cycleTime()
    },
  },
  methods: {
    handleClick(tab){
      console.log(tab.label);
      if (tab.label == '日') {
        this.type = 1
      }
      if (tab.label == '年') {
        this.type = 5
      }
      if (tab.label == '月') {
        this.type = 3
      }
      if (tab.label == '总计') {
        this.type = 4
      }
      this.cycleTime()
    },
    cycleTime() {
      clearInterval(this.interval)
      this.acquire()
      this.interval = setInterval(() => {
        this.acquire()
      }, this.timer);
    },
    acquire() {
      this.axios.post('/bigscreen/eventSource', this.qs.stringify({
        userId: this.userId,
        placecode: this.optionCode,
        // type: this.type
      })).then(function (response) {
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          this.updata = response.data.result.map((item) => {
            return {
              "value": item.count,
              "handleData": item.count,
              "name": item.source,
            }
          });
          if(this.updata.length!=0){
            this.updata.sort(this.compare);
            let total = this.updata.reduce((accumulator, item)=>accumulator + item.value,0);
            let addNum = Math.floor(this.updata[0].value/5);
            let newArr = this.updata.map((item) => {
              if(item.value>addNum) {
                return {
                  "value": item.value,
                  "handleData": item.value,
                  "name": item.name,
                  "percent": (item.handleData/total*100).toFixed(2)
                }
              }
              else {
                return {
                  "value": item.value + addNum,
                  "handleData": item.value,
                  "name": item.name,
                  "percent": (item.handleData/total*100).toFixed(2)
                }
              }
            });
            newArr.sort(this.compare);
            let length = newArr.length;
            let arrA = [];
            let arrB = [];
            if(length%2===0){
              arrA = newArr.slice(0,length/2);
              arrB = newArr.slice(length/2);
            }
            else{
              arrA = newArr.slice(0,Math.ceil(length/2));
              arrB = newArr.slice(Math.ceil(length/2));
            }
            //this.updata
            arrB.forEach(function (item, index) {
              arrA.splice(1 * (index + 1) + index, 0, item);
            });

            console.log('arrA',arrA);
            this.updata = arrA;
            this.pieChartInit();
          }
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    },
    compare(obj1, obj2) {
      var val1 = obj1.value;
      var val2 = obj2.value;
      if (val1 < val2) {
        return 1;
      } else if (val1 > val2) {
        return -1;
      } else {
        return 0;
      }
    },
    pieChartInit() {
      const ChartColumnar = this.$echarts.init(document.getElementById('pieSource'));
      ChartColumnar.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params){
            return params.name + ':' + params.data.handleData
          }
        },
        grid: {
          borderWidth: 0,
          top: 100,
          left: 50,
          bottom: 60,
          right: 15,
          borderColor: ''
        },
        color: ['#FF5959', '#37F4FF', '#1C7DFA', '#9049F9',  '#FED700', '#59C73B'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter:function(params){
                  let res = ['{a|'+ params.data.handleData + '}  {c|' + params.data.percent+'%}','{b|' + params.name +'}'].join('\n')
                  return res
                },
                color: "#fff",
                verticalAlign: 'bottom',
                rich: {

                  a: {
                    color: '#fff',
                    fontSize: '24',
                    fontFamily: 'nums',
                    verticalAlign: 'bottom',
                  },
                  c: {
                    color: '#FED700',
                    fontSize: '18',
                    fontFamily: 'nums',
                    verticalAlign: 'bottom',
                  },
                  b: {
                    borderColor: '#fff',
                    borderTopWidth: 1,
                    color: '#609ADD',
                    fontSize: '16',
                    verticalAlign: 'bottom',
                    lineHeight: 23,
                    align: 'middle'
                  },
                }
              }
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 20,
              lineStyle: {
                color: '#D8D9EC',
                type: 'dashed',
              },
            },
            data: this.updata
          }
        ]
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import "pieChart";
</style>
