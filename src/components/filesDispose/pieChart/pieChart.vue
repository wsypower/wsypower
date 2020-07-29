<template>
  <div class="pieChart">
    <div class="pie_header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
<!--          <el-tab-pane label="日" name="日"></el-tab-pane>-->
          <el-tab-pane label="月" name="月"></el-tab-pane>
          <el-tab-pane label="年" name="年"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-show="upData.length===0" class="pie_content" flex="cross:center main:center"><span class="nodata-text">暂无数据</span></div>
    <div v-show="upData.length!==0" class="pie_content" id="pieSource"></div>
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
      upData: []
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
        type: this.type
      })).then(function (response) {
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          console.log(response.data.result)
          let r = response.data.result;
          this.upData = [];
          let total = 0;
          for(let i=0;i<r.length;i++){
            total = total + r[i].count;
          }
          let totalr = 0;
          for(let i=0;i<r.length;i++){
            let rate = '', item = {};
            if(i===r.length-1){
              rate = (100 - totalr) + '%';
              item = {'name': r[i].source + '_' + r[i].count + '_' + rate,'name_str':r[i].source,'value': r[i].count,'rate': rate};
            }
            else{
              rate = (r[i].count*100/total).toFixed(0) + '%';
              item = {'name': r[i].source + '_' + r[i].count + '_' + rate,'name_str':r[i].source,'value': r[i].count,'rate': rate};
              totalr = totalr + parseInt((r[i].count*100/total).toFixed(0));
            }
            this.upData.push(item);
          }
          if(this.upData.length>0){
            this.pieChartInit();
          }
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    },
    pieChartInit() {
      const ChartColumnar = this.$echarts.init(document.getElementById('pieSource'));
      ChartColumnar.setOption({
        grid: {
          borderWidth: 0,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          containLabel: true
        },
        color:['#ff5959','#1c7dfa', '#59c73b', '#fed700', '#9049f9','#37f4ff', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        legend:{
          right: '15',
          top: 'middle',
          orient: 'vertical',
          width: '230',
          align: 'left',
          itemWidth: 10,
          itemHeight: 10,
          formatter: function (name) {
            let arr = name.split('_');
            return ['{a|'+arr[0]+'}','{b|'+arr[1]+'}','{c|'+arr[2]+'}'].join('')
          },
          textStyle:{
            rich:{
              a: {
                color: '#74c1fc',
                width: 100
              },
              b: {
                color: '#ffffff',
                width: 40
              },
              c: {
                color: '#fed700',
                width: 30
              }
            }
          },
        },
        tooltip: {
          show: true,
          position: [20, 0],
          trigger: 'item',
          alwaysShowContent: true,
          backgroundColor: 'rgba(50,50,50,0)',
          formatter: function(params){
            console.log(params);
            return "<div style='line-height: 30px;font-size: 13px;color:#74c1fc;'>" + params.data.name_str + "</div>"
              + "<div style='width:100%;border-top: 1px dashed #ffffff;height:5px;'></div>"
              + "<span style='font-family:nums;font-size: 24px;color:#ffffff;'>" + params.data.value + "</span>"
              + "<span style='font-family:nums;margin-left:6px; font-size: 18px;color:#fed700;'>" +params.data.rate + "</span>"

          }
        },

        series : [
          {
            name: '来源方式',
            type: 'pie',
            radius : ['45%','55%'],
            center: ['33%', '50%'],
            label:{
              show:false
            },
            data: this.upData,
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
      let _this = this;
      ChartColumnar.on('legendselectchanged', function (params) {
        console.log('legendselectchanged',params);
        if(params.selected[params.name]){
          console.log('legendselect 111');
          let index = _this.upData.findIndex(item => item.name === params.name);
          ChartColumnar.dispatchAction({
            type: 'showTip',
            seriesIndex:0,  // 显示第几个series
            dataIndex: index // 显示第几个数据
          });
        }
        else{
          console.log('legendselect 222');
          ChartColumnar.dispatchAction({
            type: 'hideTip'
          });
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import "pieChart";
</style>
