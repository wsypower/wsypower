<template>
  <div class="abbrChart">
    <div class="abbrChart-header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
          <el-tab-pane label="日" name="日"></el-tab-pane>
          <el-tab-pane label="周" name="周"></el-tab-pane>
          <el-tab-pane label="月" name="月"></el-tab-pane>
          <el-tab-pane label="年" name="年"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="abbrChart-content" >
      <div id="abbrChart"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "abbrChart",
  data() {
    return {
      old: null,
      type: 4,
      interval: '',
      //定时器时间
      timer: 600000,
      activeName: '总计',
      hours: ['201807', '201808', '201809', '201810', '201811', '201812'],
      data: [[5, 1, 11], [1, 0, 44]],
      title: ['上报数，', '立案数', '处置数']
    }
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
  },
  watch: {
    optionCode: function (val) {
      this.acquire(val);
    },
  },
  created() {
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted() {
    this.acquire();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.label);
      if (tab.label == '日') {
        this.type = 1
      }
      if (tab.label == '周') {
        this.type = 2
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
      this.acquire();
    },
    acquire(placecode = this.$store.state.optionCode) {
      this.axios.post('/bigscreen/eventArea', this.qs.stringify({
        placecode: '330921',
        top: 1,
        type: this.type
      })).then(function (response) {
        if (response.data.code !== '0') {
          console.log(response)
        } else {
          this.hours = response.data.result.xData
          this.title = response.data.result.yData
          this.data = response.data.result.zData
          this.pieChartInit()
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        }.bind(this));
    },
    pieChartInit() {
      const ChartColumnar = this.$echarts.init(document.getElementById('abbrChart'));
      ChartColumnar.setOption({
        // tooltip: {},
        visualMap: {
          max: 20,
          inRange: {
            color: ['#2046cf', '#3465dd', '#3f5ee9', '#6786f8', '#8fb7f8',]
          },
          textStyle: {
            color: '#43FFFF',
            fontSize: 18
          }
        },
        xAxis3D: {
          // min:"dataMin",
          type: 'category',
          nameTextStyle: {
            color: '#43FFFF',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#43FFFF',
            }
          },

          data: this.hours
        },
        yAxis3D: {
          type: 'category',
          nameTextStyle: {
            color: '#43FFFF',
          },
          // scale: 3,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#43FFFF',
            }
          },
          data: this.title
        },
        zAxis3D: {
          type: 'value',
          nameTextStyle: {
            color: '#43FFFF',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#43FFFF',
            }
          },
        },
        grid3D: {
          interval: {
            show: true,
            lineStyle: {
              color: '#43FFFF',
            }
          },
          boxWidth: 250,
          boxHeight: 110,
          boxDepth: 100,
          width: 920,
          height: 489,
          viewControl: {
            // projection: 'orthographic'
            distance: 240,
            alpha: 60,
            beta: 200,
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [{
          type: 'bar3D',
          data: this.data.map(function (item) {
            return {
              value: [item[0], item[1], item[2]],
            }
          }),
          shading: 'lambert',
          itemStyle: {
            opacity: 0.8
          },
          label: {
            textStyle: {
              fontSize: 16,
              borderWidth: 1,
              color: '#FFD82B'
            }
          },

          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#162669'
              }
            },
            itemStyle: {
              color: '#23FFFF'
            }
          }
        }]
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import "abbrChart";
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
    background-color: #ffe013;
  }
}
</style>
