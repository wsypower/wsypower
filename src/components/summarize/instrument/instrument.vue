<template>
  <div class="instrument">
    <div class="instrument-echart" ref="instrument"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "instrument",
  props: {
    //标题
    title: {
      type: String,
      default: "立案率"
    },
    titlePosition: {
      type: String,
      default: "148"
    },
    //过度颜色高亮+指针颜色
    starClor: {
      type: String,
      default: "#00FAEC"
    },
    //过度颜色起始
    endClor: {
      type: String,
      default: "#009FFE"
    },
    //百分比数值
    percent: {
      default: 50
    },
    shadowColor: {
      type: String,
      default: "#0093ee"
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.pieChartInit();
  },
  watch: {
    percent: function(val, oldVal) {
      this.pieChartInit();
    }
  },
  updated: function() {
    this.$nextTick(function() {
      console.log(1111111111111);
      // Code that will run only after the
      // entire view has been re-rendered
    });
  },
  methods: {
    pieChartInit() {
      const ChartColumnar = this.$echarts.init(this.$refs.instrument);
      ChartColumnar.setOption({
        title: {
          text: this.title,
          x: "50%",
          y: this.titlePosition,
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#49D9FE"
          },
          subtextStyle: {
            fontWeight: "bold",
            fontSize: 32,
            color: "#ffaa1d"
          }
        },
        series: [
          {
            name: "底圈",
            type: "gauge",
            min: 0,
            max: 100,
            pointer: {
              show: true,
              length: "40%",
              width: "8%"
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "#111636",
              shadowOffsetX: 2,
              shadowOffsetY: 0,
              color: this.starClor
            },
            radius: "70%",
            startAngle: 180,
            endAngle: 0,
            splitNumber: 4,
            center: ["50%", "50%"], // 默认全局居中
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#1E2761"]],
                width: 17,
                shadowBlur: 6,
                shadowColor: "#111636",
                shadowOffsetX: 2,
                shadowOffsetY: 0
              }
            },
            splitLine: {
              //分隔线样式
              show: false
            },
            axisLabel: {
              //刻度标签
              show: false
            },
            axisTick: {
              //刻度样式
              show: false
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontFamily: "nums",
              color: "#FFFFFF",
              fontSize: 32,
              offsetCenter: [0, "67%"],
              formatter: "{value}%"
            },
            data: [
              {
                value: this.percent
              }
            ]
          },
          {
            name: "外圈",
            type: "gauge",
            min: 0,
            max: 100,
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 30,
              fontStyle: "italic",
              offsetCenter: [0, "33%"]
            },
            center: ["50%", "50%"], // 默认全局居中
            pointer: {
              show: false
            },
            radius: "70%",
            startAngle: 180,
            endAngle: 180 - this.percent * 1.8,
            splitNumber: 4,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [
                    1,
                    new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: this.endClor
                      },
                      {
                        offset: 1,
                        color: this.starClor
                      }
                    ])
                  ]
                ],
                width: 17,
                shadowColor: this.shadowColor, //默认透明
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40,
                opacity: 0.9
              }
            },
            splitLine: {
              //分隔线样式
              show: false
            },
            axisLabel: {
              //刻度标签
              show: false
            },
            axisTick: {
              //刻度样式
              show: false
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontFamily: "nums",
              color: "#FFFFFF",
              fontSize: 32,
              offsetCenter: [0, "67%"],
              formatter: "{value}%"
            },
            data: [
              {
                value: this.percent
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "instrument";
</style>
