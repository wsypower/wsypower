<template>
  <div class="barChart">
    <div class="bar_header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
          <el-tab-pane label="日" name="日"></el-tab-pane>
          <el-tab-pane label="月" name="月"></el-tab-pane>
          <el-tab-pane label="年" name="年"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="bar_content" style="padding-top:10px;">
      <div style="height:30px;width:100%;" flex="main:center cross:center">
        <el-radio-group v-model="sjtype" @change="changeSJType">
          <el-radio label="01">事件</el-radio>
          <el-radio label="02">部件</el-radio>
        </el-radio-group>
      </div>
      <div id="barSource"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "barChart",
  data() {
    return {
      activeName: "总计",
      type: 4,
      sjtype: "01",
      //定时器
      interval: "",
      //定时器时间
      timer: 600000,
      xData: [],
      datalist2: []
    };
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer;
  },
  mounted() {
    this.cycleTime();
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    }
  },
  watch: {
    optionCode: function(old) {
      this.cycleTime(old);
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab.label);
      if (tab.label == "日") {
        this.type = 1;
      }
      if (tab.label == "月") {
        this.type = 3;
      }
      if (tab.label == "年") {
        this.type = 5;
      }
      if (tab.label == "总计") {
        this.type = 4;
      }
      this.cycleTime();
    },
    changeSJType(val) {
      console.log("changeSJType", val);
      this.sjtype = val;
      this.cycleTime();
    },
    cycleTime(placecode) {
      clearInterval(this.interval);
      this.acquire(placecode);
      this.interval = setInterval(() => {
        // console.log('执行一次')
        this.acquire(placecode);
      }, this.timer);
    },
    acquire(placecode = this.$store.state.optionCode) {
      this.axios
        .post(
          "/bigscreen/eventType",
          this.qs.stringify({
            placecode: placecode,
            top: 5,
            sjtype: this.sjtype,
            type: this.type
          })
        )
        .then(
          function(response) {
            if (response.data.code !== "0") {
              console.log(response);
            } else {
              // response.data.result.map((item) => {
              //   xData.push(item.type)
              //   datalist2.push(item.count)
              // })
              this.xData = response.data.result[0];
              this.datalist2 = response.data.result[1];
              this.pieChartInit();
            }
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    pieChartInit() {
      const _this = this;
      const ChartColumnar = this.$echarts.init(
        document.getElementById("barSource")
      );
      ChartColumnar.setOption({
        tooltip: {
          show: "true",
          trigger: "item",
          // backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], //内边距
          // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
          formatter: function(params) {
            if (params.seriesName != "") {
              return params.name + " ：" + params.value;
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 10,
          left: 10,
          bottom: 0,
          right: 10,
          containLabel: true,
          textStyle: {
            color: "#fff"
          },
          borderColor: ""
        },
        xAxis: [
          {
            type: "category",
            data: _this.xData,
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#5EA3E1"
              }
            },
            xisLine: {
              show: true,

              lineStyle: {
                color: "#363e83"
              }
            },
            axisLabel: {
              interval: 0,
              inside: false,

              textStyle: {
                color: "#5EA3E1",
                fontWeight: "normal",
                fontSize: "15"
              },
              formatter: function(value) {
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = 4; //每项显示文字个数
                var valLength = value.length; //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于3,
                  for (var i = 0; i < rowN; i++) {
                    var temp = ""; //每次截取的字符串
                    var start = i * maxLength; //开始截取的位置
                    var end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              }
            }
          }
        ],
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#32346c"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#5EA3E1"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#5EA3E1",
              fontWeight: "normal",
              fontSize: "12"
            },
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "事件个数",
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FCEC"
                  },
                  {
                    offset: 1,
                    color: "#00A0FF"
                  }
                ]),
                barBorderRadius: [30, 30, 0, 0],
                shadowColor: "rgba(105,123, 214, 0.7)"
              },
              emphasis: {
                shadowBlur: 15,
                shadowColor: "rgba(105,123, 214, 0.7)"
              }
            },
            zlevel: 2,
            barWidth: 13,
            data: _this.datalist2
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "barChart";
::v-deep.el-radio {
  color: #ffffff;
}
</style>
