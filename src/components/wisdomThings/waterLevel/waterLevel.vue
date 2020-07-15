<template>
  <div class="water-level">
    <div class="header">
      水位监测
      <div class="header-tab header-nav">
        <el-tabs v-model="activeDayRangeName" @tab-click="handleChangeDayRange">
          <el-tab-pane label="本日" name="本日"></el-tab-pane>
          <el-tab-pane label="本周" name="本周"></el-tab-pane>
          <el-tab-pane label="本月" name="本月"></el-tab-pane>
          <el-tab-pane label="本年" name="本年"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- <span class="right-open">
        <img src="./img/icon_open.png" alt />
      </span>-->
    </div>
    <div class="body" flex>
      <div class="water-level-box">
        <div style="position: relative">
          <div class="water-level-title">海水位(岱山潮位)</div>
          <div class="tab-haishui">
            高亭港潮位
          </div>
        </div>
        <div class="water-level-content">
          <div class="box-left">
            <div class="left-top">水位监测</div>
            <div class="left-bottom">设备监测</div>
          </div>
          <div class="box-right">
            <div class="water-level-chart" id="chart1"></div>
            <div class="water-level-info">
              <p>【安装地址】 高亭镇微型水质监测点</p>
              <p>
                【设备状态】
                <span class="online">在线</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="water-level-box">
        <div style="position: relative">
          <div class="water-level-title">
            河水位(岱山河道)
              <el-tabs class="tab-heshui" v-model="activeNameHeShui" @tab-click="handleClick">
                <el-tab-pane label="长河东" name="长河东"></el-tab-pane>
                <el-tab-pane label="长河育才路口" name="长河育才路口"></el-tab-pane>
                <el-tab-pane label="长河和谐路口" name="长河和谐路口"></el-tab-pane>
                <el-tab-pane label="长河西" name="长河西"></el-tab-pane>
              </el-tabs>
          </div>
        </div>
        <div class="water-level-content">
          <div class="box-left">
            <div class="left-top">水位监测</div>
            <div class="left-bottom">设备监测</div>
          </div>
          <div class="box-right">
            <div class="water-level-chart" id="chart2"></div>
            <div class="water-level-info">
              <p>【安装地址】{{address}}</p>
              <p>
                【设备状态】
                <span class="online">在线</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const dayData = [{
      date: "00:00",
      waterLevel: 0.48
    },
    {
      date: "01:00",
      waterLevel: 1.12
    },
    {
      date: "02:00",
      waterLevel: 0.83
    },
    {
      date: "03:00",
      waterLevel: 0.75
    },
    {
      date: "04:00",
      waterLevel: 0.55
    },
    {
      date: "05:00",
      waterLevel: 0.83
    },
    {
      date: "06:00",
      waterLevel: 0.96
    },
    {
      date: "07:00",
      waterLevel: 1.23
    },
    {
      date: "08:00",
      waterLevel: 1.24
    },
    {
      date: "09:00",
      waterLevel: 1.25
    },
    {
      date: "10:00",
      waterLevel: 1.30
    },
    {
      date: "11:00",
      waterLevel: 1.35
    },
    {
      date: "12:00",
      waterLevel: 1.32
    },
    {
      date: "13:00",
      waterLevel: 1.14
    },
    {
      date: "14:00",
      waterLevel: 1.23
    },
    {
      date: "15:00",
      waterLevel: 1.25
    },
    {
      date: "16:00",
      waterLevel: 1.36
    },
    {
      date: "17:00",
      waterLevel: 1.04
    },
    {
      date: "18:00",
      waterLevel: 1.08
    },
    {
      date: "19:00",
      waterLevel: 1.23
    },
    {
      date: "20:00",
      waterLevel: 1.23
    },
    {
      date: "21:00",
      waterLevel: 1.23
    },
    {
      date: "22:00",
      waterLevel: 1.23
    },
    {
      date: "23:00",
      waterLevel: 1.23
    },
    {
      date: "24:00",
      waterLevel: 1.23
    }];
  const weekData = [{
      date: "周一",
      waterLevel: 0.48
    },
    {
      date: "周二",
      waterLevel: 1.12
    },
    {
      date: "周三",
      waterLevel: 0.83
    },
    {
      date: "周四",
      waterLevel: 0.75
    },
    {
      date: "周五",
      waterLevel: 0.55
    },
    {
      date: "周六",
      waterLevel: 0.83
    },
    {
      date: "周日",
      waterLevel: 0.96
    }];
  const monthData = [{
      date: "一",
      waterLevel: 0.48
    },
    {
      date: "二",
      waterLevel: 1.12
    },
    {
      date: "三",
      waterLevel: 0.83
    },
    {
      date: "四",
      waterLevel: 0.75
    },
    {
      date: "五",
      waterLevel: 0.55
    },
    {
      date: "六",
      waterLevel: 0.83
    },
    {
      date: "七",
      waterLevel: 0.96
    },
    {
      date: "八",
      waterLevel: 1.23
    },
    {
      date: "九",
      waterLevel: 1.24
    },
    {
      date: "十",
      waterLevel: 1.25
    },
    {
      date: "十一",
      waterLevel: 1.30
    },
    {
      date: "十二",
      waterLevel: 1.35
    },
    {
      date: "十三",
      waterLevel: 1.32
    },
    {
      date: "十四",
      waterLevel: 1.14
    },
    {
      date: "十五",
      waterLevel: 1.23
    },
    {
      date: "十六",
      waterLevel: 1.25
    },
    {
      date: "十七",
      waterLevel: 1.36
    },
    {
      date: "十八",
      waterLevel: 1.04
    },
    {
      date: "十九",
      waterLevel: 1.08
    },
    {
      date: "二十",
      waterLevel: 1.23
    },
    {
      date: "二十一",
      waterLevel: 1.23
    },
    {
      date: "二十二",
      waterLevel: 1.23
    },
    {
      date: "二十三",
      waterLevel: 1.23
    },
    {
      date: "二十四",
      waterLevel: 1.23
    },
    {
      date: "二十五",
      waterLevel: 1.23
    },
    {
      date: "二十六",
      waterLevel: 1.23
    },
    {
      date: "二十七",
      waterLevel: 1.23
    },
    {
      date: "二十八",
      waterLevel: 1.23
    },
    {
      date: "二十九",
      waterLevel: 1.23
    },
    {
      date: "三十",
      waterLevel: 1.23
    },{
      date: "三十一",
      waterLevel: 1.23
    }];
  const yearData = [{
    date: "一",
    waterLevel: 0.48
  },
    {
      date: "二",
      waterLevel: 1.12
    },
    {
      date: "三",
      waterLevel: 0.83
    },
    {
      date: "四",
      waterLevel: 0.75
    },
    {
      date: "五",
      waterLevel: 0.55
    },
    {
      statDate: "六",
      waterLevel: 0.83
    },
    {
      date: "七",
      waterLevel: 0.96
    },
    {
      date: "八",
      waterLevel: 1.23
    },
    {
      date: "九",
      waterLevel: 1.24
    }];
export default {
  data() {
    return {
      activeDayRangeName: '本日',
      activeName: "高亭港潮位",
      activeNameHeShui: '长河东',
      address: '星河路',
      deviceId: '4c25b860acfb11e9c16b369b7d30f9da',
      type: 1,
      //定时器
      interval: "",
      //定时器时间
      timer: 600000,
      tableDataList: [],
      //水位警戒线
      waterWarnLevel: 1.9
    };
  },
  mounted() {
    this.getData();
    this.initChart(dayData, "chart1", 1.7);
  },
  methods: {
    getData() {
      this.axios.get("iot/logs/waterlevel?type="+this.type + '&deviceId=' + this.deviceId)
        .then(response => {
            console.log('waterLevel',response);
            this.initChart(response.data.result, "chart2", this.waterWarnLevel);
          }
        )
    },

    handleChangeDayRange(tab){
      if(tab.label==='本日'){
        this.type = 1;
        this.getData();
        this.initChart(dayData, "chart1", 1.7);
      }
      else if(tab.label==='本周'){
        this.type = 2;
        this.getData();
        this.initChart(weekData, "chart1", 1.7);
      }
      else if(tab.label==='本月'){
        this.type = 3;
        this.getData();
        this.initChart(monthData, "chart1", 1.7);
      }
      else if(tab.label==='本年'){
        this.type = 4;
        this.getData();
        this.initChart(yearData, "chart1", 1.7);
      }
    },
    handleClick(tab) {
      console.log(tab.label);
      if(tab.label==='长河东') {
        this.deviceId = '4c25b860acfb11e9c16b369b7d30f9da';
        this.address = '星河路';
        this.waterWarnLevel = 1.9;
        this.getData();
      }
      else if(tab.label==='长河西'){
        this.deviceId = '94fc9220acfb11e9c16b369b7d30f9da';
        this.address = '海滨嘉苑（沿港中路389号）';
        this.waterWarnLevel = 1.6;
        this.getData();
      }
      else if(tab.label==='长河和谐路口'){
        this.deviceId = 'd6e69a20a95611ea15b9151fdbd84f14';
        this.address = '长河路与和谐路交叉路口';
        this.waterWarnLevel = 1.8;
        this.getData();
      }
      else {
        this.deviceId = '82caa930a95711ea15b9151fdbd84f14';
        this.address = '长河路与育才路交叉路口';
        this.waterWarnLevel = 1.75;
        this.getData();
      }
    },
    initChart(data, id, warnLevel) {
      let trend = {
        time: [],
        value: []
      };
      data.map(item => {
        trend.time.push(item.date);
        trend.value.push(item.waterLevel);
      });
      let chart = this.$echarts.init(document.getElementById(id));
      let option = {
        // backgroundColor: '#0E204A',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#308eee"
            }
          }
        },
        grid: {
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "16%"
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "#1c7bf7"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#1c7bf7"
                // margin: 5
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1e58b3"
              }
            },
            axisTick: {
              show: false
            },
            data: trend.time
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 2.5,
            // max: 140,
            // splitNumber: 1,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#1e58b3"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1c7bf7"
              }
            },
            axisLabel: {
              show: true,
              // margin: 20,
              textStyle: {
                color: "#1c7bf7"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "水位",
            type: "line",
            smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            // symbolSize: 8,
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 6, //标记的大小
            lineStyle: {
              normal: {
                color: "#49d9fe" // 线条颜色
              },
              borderColor: "#49d9fe"
            },
            markLine: {
              //最大值和最小值
              data: [
                {
                  name: "阈值",
                  yAxis: warnLevel,
                  label: {
                    show: "true",
                    position: "end",
                    formatter: "警戒线"
                  },
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: "#FF5D1D"
                    }
                  }
                }
              ]
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#49d9fe"
              }
            },
            itemStyle: {
              normal: {
                color: "#49d9fe"
              }
            },
            // tooltip: {
            //   show: false
            // },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(73,217,254,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(73,217,254,0.01)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(73,217,254, 0.8)", //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: trend.value
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-tab {
  width: 330px;
  position: absolute;
  right: -800px;
  top: -2px;
}
.water-level {
  margin-top: 30px;
}
.header {
  height: 45px;
  background: url("./img/title.png");
  width: 180px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 45px;
  margin-bottom: 12px;
  font-weight: 600;
  position: relative;
  .right-open {
    position: absolute;
    right: -738px;
    cursor: pointer;
    top: 0px;
  }
}
.body {
  width: 920px;
  height: 283px;
  background: url("./img/big_back.png") no-repeat;
  padding: 20px;
  // background-size: contain;
}
.water-level-box {
  width: 430px;
  margin-right: 20px;
}
.water-level-title {
  height: 30px;
  background: url("./img/title_back.png") no-repeat;
  color: #000;
  font-size: 16px;
  line-height: 30px;
  padding-left: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}
.tab-haishui{
  position: absolute;
  right: 10px;
  top:7px;
  padding-bottom:3px;
  font-size: 14px;
  color:#ffffff;
  border-bottom:2px solid #ffce25;
}
.tab-heshui{
  position: absolute;
  right: -10px;
  top: 2px;
  ::v-deep.el-tabs__item{
    color:#ffffff;
    padding: 0px 5px;
    height: unset;
    line-height: unset;
  }
  ::v-deep.is-active {
    color: #ffffff;
  }
  ::v-deep.el-tabs__nav-wrap::after {
    background-color: transparent;
  }
  ::v-deep.el-tabs__active-bar {
    background-color: #ffe013;
  }
}

.water-level-content {
  display: flex;
}
.box-left {
  width: 30px;
  background: #071443;
  color: #6694fd;
  font-size: 14px;
  text-align: center;
  padding: 6px;
}
.left-top {
  height: 120px;
  margin-bottom: 5px;
  line-height: 16px;
  padding-top: 20px;
}
.left-bottom {
  height: 72px;
  line-height: 15px;
}
.water-level-chart {
  height: 120px;
  background: #192362;
  margin-bottom: 5px;
  width: 400px;
}

.water-level-info {
  height: 72px;
  background: #192362;
  width: 400px;
  padding: 10px;
  color: white;
  p {
    margin-bottom: 10px;
  }
}
.online {
  color: #0c9d1a;
}
</style>
<style lang="scss">
.header-nav {
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
