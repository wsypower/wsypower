<template>
  <div class="xunChaTongJi" ref="xunChaTongJi"></div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'xunChaTongJi',
    mounted() {
      this.getChartData();
    },
    methods:{
      getChartData(){
        let dataTemp = [{
          month: '1月',
          xunchashu: 140,
          zhenggaishu: 115
        },{
          month: '2月',
          xunchashu: 129,
          zhenggaishu: 125
        },{
          month: '3月',
          xunchashu: 169,
          zhenggaishu: 120
        },{
          month: '4月',
          xunchashu: 148,
          zhenggaishu: 100
        },{
          month: '5月',
          xunchashu: 198,
          zhenggaishu: 134
        },{
          month: '6月',
          xunchashu: 145,
          zhenggaishu: 140
        }]
        let data = [],
          monthArr = [],
          num1Arr = [],
          num2Arr = [];
        dataTemp.forEach(item => {
          monthArr.push(item.month);
          num1Arr.push(item.xunchashu);
          num2Arr.push(item.zhenggaishu);
        })
        data.push(monthArr);
        data.push(num1Arr);
        data.push(num2Arr);
        this.initChart(data);
      },
      //初始化图表
      initChart(data){
        const ChartColumnar = this.$echarts.init(this.$refs.xunChaTongJi);
        ChartColumnar.setOption({
          grid: {
            top: 50,
            left: 5,
            right: 5,
            bottom: 10,
            containLabel: true
          },
          tooltip: {
            show: true,
            position: 'top',
            backgroundColor: '#febb08',
            textStyle:{
              color: '#000000'
            },
            formatter: '人数：{c}'
          },
          legend:{
            show: true,
            top: 10,
            right: 1,
            itemWidth: 14,
            itemHeight: 8,
            textStyle:{
              color: '#93c9ff'
            }
          },
          xAxis: {
            type: 'category',
            data: data[0],
            axisLabel: {
              show: true,
              textStyle:{
                color: '#93c9ff'
              }
            },
            axisLine: {
              show: true,
              lineStyle:{
                color: '#93c9ff'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }

          },
          yAxis: {
            axisLabel: {
              fontSize: 12,
              color: '#93c9ff'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle:{
                type: 'dashed',
                color: '#93c9ff'
              }
            }
          },
          series: [{
            name: '巡查数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            lineStyle:{
              color: '#e66321'
            },
            itemStyle:{
              color: '#e66321',
              borderWidth: 2,
              borderColor: '#e66321'
            },
            data: data[1]
          },{
            name: '整改数',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            lineStyle:{
              color: '#fff100'
            },
            itemStyle:{
              color: '#fff100',
              borderWidth: 2,
              borderColor: '#fff100'
            },
            data: data[2]
          }]
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .xunChaTongJi{
    width: 100%;
    height: 100%;
  }
</style>
