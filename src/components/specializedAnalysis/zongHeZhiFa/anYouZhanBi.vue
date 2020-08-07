<template>
  <div class="anYouZhanBi">
    <div class="anYouZhanBi-header">案由占比</div>
    <div class="anYouZhanBi-body">
      <div class="" ref="anYouZhanBi"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'anYouZhanBi',
    data(){
      return{

      }
    },
    mounted() {
      this.getChartData();
    },
    methods:{
      getChartData(){

        this.initChart();
      },
      initChart(){
        const ChartColumnar = this.$echarts.init(this.$refs.anYouZhanBi);
        ChartColumnar.setOption({
          series: [{
            name: '案由占比',
            type: 'pie',
            radius: ['30%', '80%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
              show: true,
              normal: {
                position: 'outside',
                fontSize: 16
              }
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true
            },
            data: [{
              value: 1,
              name: 'rose1',
              itemStyle: {
                color: "rgba(50,123,250,1)",
                // borderColor: "rgba(50,123,250,1)",
                // borderWidth: 3
              }
            },
              {
                value: 2,
                name: 'rose2',
                itemStyle: {
                  color: "rgba(244,201,7,1)",
                  // borderColor: "rgba(244,201,7,1)",
                  // borderWidth: 3
                }
              },
              {
                value: 3,
                name: 'rose3',
                itemStyle: {
                  color: "rgba(23,216,161,1)",
                  // borderColor: "rgba(23,216,161,1)",
                  // borderWidth: 3
                }
              },
              {
                value: 4,
                name: 'rose4',
                itemStyle: {
                  color: "rgba(122,60,235,1)",
                  // borderColor: "rgba(122,60,235,1)",
                  // borderWidth: 3
                }
              },
              {
                value: 5,
                name: 'rose5',
                itemStyle: {
                  color: "rgba(15,197,243,1)",
                  // borderColor: "rgba(15,197,243,1)",
                  // borderWidth: 3
                }
              }
            ]
          }]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .anYouZhanBi{
    height: 290px;
    width: 100%;
    &-header{
      width: 100%;
      height: 20px;
      border-left: 5px solid #00c0ff;
      padding-left: 8px;
      margin-bottom: 8px;
      font-family: FZZCHJW;
      font-size: 18px;
      color: #ffffff;
      line-height: 23px;
    }
    &-body{
      width: 484px;
      height: 264px;
      background: url("./img/back-1.png");
      background-size: 100% 100%;
      >div{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
