<template>
  <div class="pieTitle">
    <div class="pieTitle_header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
          <el-tab-pane label="日" name="日"></el-tab-pane>
          <el-tab-pane label="月" name="月"></el-tab-pane>
          <el-tab-pane label="年" name="年"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="pieTitle_content" id="areaSource"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "pieTitle",
  //定时器
  data() {
    return {
      activeName: '总计',
      type: 4,
      interval: '',
      //定时器时间
      timer: 600000,
      //监听header
      xData: ['越城区', '柯桥区', '上虞区', '新昌县', '嵊州市', '诸暨市',],//名字
      name: ["上报数", "立案数", "处置数"],
      datalist1: [],//立按数
      datalist2: [],//处置数
      datalist3: [],//结案数
    }
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted() {
    this.cycleTime()
    console.log(this.optionCode)
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
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.label);
      if (tab.label == '日') {
        this.type = 1
      }
      if (tab.label == '月') {
        this.type = 3
      }
      if (tab.label == '年') {
        this.type = 5
      }
      if (tab.label == '总计') {
        this.type = 4
      }
      this.cycleTime();
    },
    cycleTime(placecode) {
      clearInterval(this.interval)
      this.acquire(placecode)
      this.interval = setInterval(() => {
        this.acquire(placecode)
      }, this.timer);
    },
    acquire(placecode = this.$store.state.optionCode) {
      this.axios.post('/bigscreen/eventStatistics', this.qs.stringify({
        placecode: placecode,
        top: 6,
        type: this.type
      })).then(function (response) {
        if (response.data.code !== '0') {
          console.log(response)
        } else {
          console.log(response.data.result)
          let r = response.data.result;
          let data = [];
          for(let i=0;i<r.length;i++){
            let total = r[i].czs + r[i].las + r[i].jas,
                item = {'name': '岱山县'+ r[i].name,'value': total,'value2': r[i].las,'value3': r[i].czs,'value4': r[i].jas};
            data.push(item);
          }
          this.pieChartInit(data);
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    },
    pieChartInit: function (data) {
      // let data = [{'name':'岱山县高亭镇','value': 30,'value2': 10,'value3': 10,'value4': 10},
      //   {'name':'岱山县衢山镇','value': 40,'value2': 20,'value3': 10,'value4': 10},
      //   {'name':'岱山县东沙镇','value': 50,'value2': 30,'value3': 10,'value4': 10},
      //   {'name':'岱山县岱西镇','value': 60,'value2': 40,'value3': 10,'value4': 10},
      //   {'name':'岱山县长涂镇','value': 70,'value2': 50,'value3': 10,'value4': 10},
      //   {'name':'岱山县岱东镇','value': 80,'value2': 60,'value3': 10,'value4': 10},
      //   {'name':'岱山县秀山乡','value': 90,'value2': 70,'value3': 10,'value4': 10}];
      const _this = this;
      const ChartColumnar = this.$echarts.init(document.getElementById('areaSource'));
      ChartColumnar.setOption({
        grid: {
          borderWidth: 0,
          top: 10,
          left: 10,
          bottom: 10,
          right: 20,
          containLabel: true
        },
        color:['#ff5959','#1c7dfa', '#59c73b', '#fed700', '#9049f9','#37f4ff', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        legend:{
          right: '30',
          top: 'middle',
          orient: 'vertical',
          width: '130',
          align: 'left',
          itemWidth: 10,
          itemHeight: 10,
          textStyle:{
            color: '#74c1fc',
            width: 110
          },
          rich:{

          }
        },
        tooltip: {
          show: true,
          position: [20, 20],
          trigger: 'item',
          alwaysShowContent: true,
          backgroundColor: 'rgba(50,50,50,0)',
          formatter: function(params){
            console.log(params);
            return "<span style='font-family:nums;font-size: 24px;color:#ffffff;'>" + params.data.value + "</span>"
              + "<span style='font-family:nums;margin-left:10px; font-size: 18px;color:#fed700;'>" +params.percent + "%</span>"
              + "<div style='width:100%;border-top: 1px dashed #ffffff;'></div>"
              + "<span style='line-height: 30px;font-size: 13px;color:#74c1fc;'>" + params.name + "</span></br>"
              + "<span style='font-family:nums;font-size: 13px;color:#74c1fc;'>立案数：" + params.data.value2 + "</span></br>"
              + "<span style='font-family:nums;font-size: 13px;color:#74c1fc;'>处置数：" + params.data.value3 + "</span></br>"
              + "<span style='font-family:nums;font-size: 13px;color:#74c1fc;'>结案数：" + params.data.value4 + "</span>"
          }
        },

        series : [
          {
            name: '区域案卷数',
            type: 'pie',
            radius : ['45%','55%'],
            center: ['45%', '50%'],
            label:{
              show:false
            },
            data:data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      setTimeout(function(){
        ChartColumnar.dispatchAction({
          type: 'showTip',
          seriesIndex:0,  // 显示第几个series
          dataIndex: 0 // 显示第几个数据
        });
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import "pieTitle";
</style>
