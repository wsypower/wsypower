<template>
  <div class="map">
    <div class="map-container" id="map">
      <!-- <img src="./img/map.png" alt /> -->
    </div>
    <div class="bin-warn">
      <div class="warn-btn" @click="showInfo">
        智能垃圾桶满溢告警
        <div class="warn-arrow" :class="{ 'changeDeg': isShowWarnInfo  }">
          <img src="./img/arrow_icon1.png" alt />
        </div>
      </div>
      <div class="warn-info" v-show="isShowWarnInfo">
        <div class="warn-tab">
          <el-radio-group v-model="tabPosition" style="width:230px">
            <el-radio-button label="today" @click.native="chooseData('today')">本日</el-radio-button>
            <el-radio-button label="month" @click.native="chooseData('month')">本月</el-radio-button>
            <el-radio-button label="year" @click.native="chooseData('year')">本年</el-radio-button>
          </el-radio-group>
        </div>
        <ul class="warn-list">
          <li class="warn-li" v-for="(item,index) in binData" :key="index">
            <div class="warn-info">
              <div class="warn-index">1</div>
              <div class="warn-number">
                {{item.streetName}}
                <span>{{item.number}}</span> 起
              </div>
              <!-- <div class="warn-arrow">
                <img src="./img/arrow_top.png" alt />
              </div>-->
            </div>
            <div class="warn-hide">
              <div class="hide-left">
                <p>59</p>
                <div>垃圾桶</div>
              </div>
              <div class="hide-right">
                <p>
                  本年报警次数:
                  <span>1006</span>
                </p>
                <p>
                  本月报警次数:
                  <span>130</span>
                </p>
                <p>
                  本年报警次数:
                  <span>36</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-control">
      <div class="control-tab">
        <el-radio-group v-model="mapTypev">
          <el-radio-button label="left" @click.native="chooseLeft">热力图</el-radio-button>
          <el-radio-button label="right" @click.native="chooseRight">点位图</el-radio-button>
        </el-radio-group>
      </div>
      <div class="control-box">
        <div class="control-title">
          <img src="./img/title1.png" alt />
        </div>

        <ul class="control-list">
          <li class="control-li" v-for="(item,index) in equipList" :key="index">
            <div class="control-check">
              <input
                type="checkbox"
                :checked="equipNubmer == item.typeNumber"
                name="equipment"
                @click="chooseType(item,$event)"
              />
            </div>
            <div class="control-icon">
              <span class="iconfont" :class="item.icon" :style=" 'color:' + item.color"></span>
            </div>
            <div class="control-name">{{item.name}}</div>
          </li>
          <!-- <li class="control-li">
            <div class="control-check">
              <input
                type="checkbox"
                :checked="equipNubmer == 3"
                name="equipment"
                value="3"
                @click="chooseEquip(3,$event)"
              />
            </div>
            <div class="control-icon">
              <span class="iconfont icon-manhole-cover" style="color:#18c650"></span>
            </div>
            <div class="control-name">智能窨井盖</div>
          </li>
          <li class="control-li">
            <div class="control-check">
              <input
                :checked="equipNubmer == 9  "
                type="checkbox"
                name="equipment"
                value="8"
                @click="chooseVideo(9,$event)"
              />
            </div>
            <div class="control-icon">
              <span class="iconfont icon-shexiangtou" style="color:#6694fd"></span>
            </div>
            <div class="control-name">视频监控</div>
          </li>
          <li class="control-li">
            <div class="control-check">
              <input
                :checked="equipNubmer == 10  "
                type="checkbox"
                name="equipment"
                value="8"
                @click="chooseHigh(10,$event)"
              />
            </div>
            <div class="control-icon">
              <span class="iconfont icon-wangyuanj" style="color:#7f59fa"></span>
            </div>
            <div class="control-name">高空瞭望</div>
          </li>
          <li class="control-li">
            <div class="control-check">
              <input
                :checked="equipNubmer == 7  "
                type="checkbox"
                name="equipment"
                value="8"
                @click="chooseEquip(7,$event)"
              />
            </div>
            <div class="control-icon">
              <span class="iconfont icon-shanchulaji" style="color:#f1721d"></span>
            </div>
            <div class="control-name">智能垃圾桶</div>
          </li>
          <li class="control-li">
            <div class="control-check">
              <input
                :checked="equipNubmer == 8  "
                type="checkbox"
                name="equipment"
                value="8"
                @click="chooseEquip(8,$event)"
              />
            </div>
            <div class="control-icon">
              <span class="iconfont icon-shuiweijiance" style="color:#475ff4"></span>
            </div>
            <div class="control-name">水位监测</div>
          </li>-->
        </ul>
      </div>
      <div class="control-box">
        <div class="control-title">
          <img src="./img/title2.png" alt />
        </div>
        <ul class="control-list">
          <li class="control-li" v-for="(item,index) in eventList" :key="index">
            <div class="control-check">
              <input
                :checked="equipNubmer == item.id"
                type="checkbox"
                name="equipment"
                @click="chooseEventType(item,$event)"
              />
            </div>
            <div class="control-icon">
              <img :src="eventIconList[item.name]" alt="" />
            </div>
            <div class="control-name">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  const coordtransform = require('coordtransform');
export default {
  name: "map",
  data() {
    return {
      checked: true,
      tabPosition: "today",
      mapTypev: "left",
      isShowWarnInfo: false,
      binData: [],
      equipNubmer: '3',
      checkList: ["选中且禁用", "复选框 A"],
      equipList: [
        {
          name: "视频监控",
          icon: "icon-shexiangtou",
          color: "#6694fd",
          typeNumber: '10'
        },
        {
          name: "高空瞭望",
          icon: "icon-wangyuanj",
          color: "#7f59fa",
          typeNumber: '11'
        },
        {
          name: "智能窨井盖",
          icon: "icon-manhole-cover",
          color: "#18c650",
          typeNumber: '3'
        },
        {
          name: "智能垃圾桶",
          icon: "icon-shanchulaji",
          color: "#f1721d",
          typeNumber: '7'
        },
        {
          name: "水位监测",
          icon: "icon-shuiweijiance",
          color: "#475ff4",
          typeNumber: '8'
        },
        {
          name: "智能路灯",
          icon: "icon-deng",
          color: "#eaba27",
          typeNumber: '12'
        }
      ],
      eventIconList:{
        '突发事件': require('./img/tuofa.png'),
        '街面秩序': require('./img/zhixu.png'),
        '施工管理': require('./img/shigong.png'),
        '宣传广告': require('./img/guanggao.png'),
        '市容环境': require('./img/city.png'),
        '其他事件': require('./img/other.png'),
      },
      eventList: [],
      tableDataList: [],
      todayData: [],
      monthData: [],
      yearData: [],
      mapType: 1,
      thisEvent: {},
      thisItem: {},
      sbjType: 1
    };
  },
  mounted() {
    this.getBinData();
    this.getEventDataList();
    let obj = {
      name: "智能窨井盖",
      icon: "icon-manhole-cover",
      color: "#18c650",
      typeNumber: '3'
    };
    let event = {
      target: {
        checked: true
      }
    };
    // event.target.checked
    this.thisItem = obj;
    this.thisEvent = event;
    this.getEquipData(obj);
    // this.getEventData("wsjg");
  },
  methods: {
    chooseLeft() {
      this.mapType = 1;
      console.log("thisitem", this.thisItem);
      console.log("thisEvent", this.thisEvent);
      this.chooseType(this.thisItem, this.thisEvent);
    },
    chooseRight() {
      this.mapType = 2;
      console.log("thisitem", this.thisItem);
      console.log("thisEvent", this.thisEvent);
      this.chooseType(this.thisItem, this.thisEvent);
    },
    showInfo() {
      this.isShowWarnInfo = !this.isShowWarnInfo;
    },
    getEventDataList() {
      this.axios.post("/bigscreen/eventTypeName").then(response => {
        console.log('getEventDataList',response);
        this.eventList = response.data.result;
      });
    },
    chooseType(item, event) {
      if (event.target.checked) {
        this.thisItem = item;
        this.thisEvent = event;
        this.sbjType = 1;
        switch (item.typeNumber) {
          case '3':
            this.chooseEquip(item, event);
            break;
          case '7':
            this.chooseEquip(item, event);
            break;
          case '8':
            this.chooseEquip(item, event);
            break;
          case '12':
            this.chooseEquip(item, event);
            break;
          case '10':
            this.chooseVideo(item, event);
            break;
          case '11':
            this.chooseHigh(item, event);
            break;
          default:
            this.sbjType = 2;
            this.chooseEvent(item, event);
            break;
        }
      }
    },
    chooseEventType(item,event){
      if (event.target.checked) {
        this.sbjType = 2;
        this.thisItem = item;
        this.thisEvent = event;
        this.chooseEvent(item, event);
      }
    },
    chooseEquip(item, event) {
      if (event.target.checked) {
        this.getEquipData(item);
        this.equipNubmer = item.typeNumber;
      }
    },
    chooseEvent(item, event) {
      if (event.target.checked) {
        this.getEventData(item);
        this.equipNubmer = item.id;
      }
    },
    chooseHigh(item, event) {
      if (event.target.checked) {
        this.getHighData(item);
        this.equipNubmer = item.typeNumber;
      }
    },
    chooseVideo(item, event) {
      if (event.target.checked) {
        this.getVideoData(item);
        this.equipNubmer = item.typeNumber;
      }
    },
    chooseData(type) {
      this.tabPosition = type;
      console.log("type", type);
      if (type == "today") {
        this.binData = this.todayData;
      } else if (type == "month") {
        this.binData = this.monthData;
      } else {
        this.binData = this.yearData;
      }
    },
    getBinData() {
      this.axios.post("/bigscreen/wasteWarn/").then(response => {
        let data = response.data.result;
        console.log("data", data);
        let todayData = [];
        let monthData = [];
        let yearData = [];
        data.map(item => {
          let todayObj = {
            streetName: item.streetName,
            number: item.day
          };
          todayData.push(todayObj);
          let monthObj = {
            streetName: item.streetName,
            number: item.month
          };
          monthData.push(monthObj);
          let yearObj = {
            streetName: item.streetName,
            number: item.year
          };
          yearData.push(yearObj);
        });
        this.todayData = todayData;
        this.monthData = monthData;
        this.yearData = yearData;
        this.binData = todayData;
      });
    },
    initMap(data, item) {
      console.log("mapdata", data);
      var map = new AMap.Map("map", {
        // features: ['bg', 'road'],
        // mapStyle: 'amap://styles/midnight',
        center: [122.216, 30.25],
        resizeEnable: true,
        // pitch: 50,
        zoom: 14
        // viewMode: '2D'
      });
      if (this.mapType == "1") {
        var heatmap;
        map.plugin(["AMap.Heatmap"], function() {
          //初始化heatmap对象
          heatmap = new AMap.Heatmap(map, {
            radius: 30, //给定半径
            opacity: [0, 0.8]
          });
          //设置数据集：该数据为北京部分“公园”数据
          heatmap.setDataSet({
            data: data,
            max: 100
          });
        });
      } else {
        var i = -1,
          length = data.length;
        console.log("item", item);
        while (++i < length) {
          var obj = data[i];
          var markerContent = '';
          if(this.sbjType === 1){
            markerContent = `<span class='iconfont ${item.icon}' style='color: ${item.color};fontSize:20px'></span>`;
          }
          else{
            markerContent = `<img style="width:22px;" src="${this.eventIconList[item.name]}"/>`;
          }
          if(obj.lng && obj.lat){
            let position = new AMap.LngLat(obj.lng, obj.lat);
            var marker = new AMap.Marker({
              position: position,
              // 将 html 传给 content
              content: markerContent
              // 以 icon 的 [center bottom] 为原点
              // offset: new AMap.Pixel(-13, -30)
            });
            console.log(markerContent);
            // 将 markers 添加到地图
            map.add(marker);
          }
        }
      }
    },
    getEquipData(item) {
      this.axios
        .get("/iot/device/list?deviceType=" + item.typeNumber)
        .then(res => {
          console.log("map", res);
          let data = res.data.result;

          var heatmapData = [];
          var i = -1,
            length = data.length;
          while (++i < length) {
            var obj = data[i];
            var gaodeData = coordtransform.wgs84togcj02(obj.longitudeGps84Y, obj.latitudeGps84X);
            console.log('gaodeData',gaodeData);
            heatmapData.push({
              lng: gaodeData[0],
              lat: gaodeData[1],
              count: 50
            });
          }
          this.initMap(heatmapData, item);
        });
    },
    getVideoData(item) {
      this.axios.get("/iot/device/otherList").then(res => {
        console.log("map", res);
        let result = res.data.result;
        let data = [];
        result.map(item => {
          if (item.deviceType == "video") {
            data.push(item);
          }
        });

        var heatmapData = [];
        var i = -1,
          length = data.length;
        while (++i < length) {
          var obj = data[i];
          var gaodeData = coordtransform.wgs84togcj02(obj.latitudeGps84X, obj.longitudeGps84Y);
          console.log('gaodeData',gaodeData);
          heatmapData.push({
            // coordinate: [item.longitude, item.latitude],
            lng: gaodeData[0],
            lat: gaodeData[1],
            count: 10
          });
        }
        console.log("data", heatmapData);

        this.initMap(heatmapData, item);
      });
    },
    getHighData(item) {
      this.axios.get("/iot/device/otherList").then(res => {
        console.log("map", res);
        let result = res.data.result;
        let data = [];
        result.map(item => {
          if (item.deviceType == "gklw") {
            data.push(item);
          }
        });

        var heatmapData = [];
        var i = -1,
          length = data.length;
        while (++i < length) {
          var obj = data[i];
          var gaodeData = coordtransform.wgs84togcj02(obj.latitudeGps84X, obj.longitudeGps84Y);
          console.log('gaodeData',gaodeData);
          heatmapData.push({
            // coordinate: [item.longitude, item.latitude],
            lng: gaodeData[0],
            lat: gaodeData[1],
            count: 20
          });
        }

        this.initMap(heatmapData, item);
      });
    },
    getEventData(item) {
      this.axios.post("/bigscreen/eventXY?typeId=" + item.id).then(res => {
        console.log("map", res);
        let data = res.data.result;

        // var layer = new Loca.HeatmapLayer({
        //   map: map
        // })
        var heatmapData = [];
        var i = -1,
          length = data.length;
        while (++i < length) {
          var obj = data[i];
          var gaodeData = coordtransform.wgs84togcj02(obj.x84, obj.y84);
          console.log('gaodeData',gaodeData);
          heatmapData.push({
            // coordinate: [item.longitude, item.latitude],
            lng: gaodeData[0],
            lat: gaodeData[1],
            count: 50
          });
        }
        this.initMap(heatmapData, item);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 921px;
  height: 500px;
  position: relative;
}
.icon_map{
  display:inline-block;
  width: 20px;
  font-size: 14px;
}
.map-container {
  width: 921px;
  height: 500px;
  position: relative;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }
}
.bin-warn {
  width: 230px;
  height: 360px;
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 20px;
}
.warn-btn {
  color: white;
  position: relative;
  background: url("./img/alarm_icon.png") no-repeat;
  background-position: left top;
  width: 242px;
  height: 60px;
  padding: 20px 0 0 70px;
  left: -10px;
  top: -10px;
  cursor: pointer;
  // span {
  //   margin-left: 10px;
  //   transform: rotate(45deg);
  //   transition: transform 0.3s, -webkit-transform 0.3s;
  // }
  .warn-arrow {
    position: absolute;
    right: 20px;
    top: 20px;
    transition: transform 0.2s, -webkit-transform 0.2s;
    transform: rotate(180deg);
  }
  .changeDeg {
    transform: rotate(0deg);
    transition: transform 0.2s, -webkit-transform 0.2s;
  }
}
.warn-list {
  border: 1px solid #2b90f3;
  width: 228px;
  li {
    background: rgba(11, 32, 79, 0.9);
    color: white;
    cursor: pointer;
    &:nth-child(1) {
      .warn-index {
        background-color: #ff5959;
      }
      .warn-number span {
        color: #ff5959;
      }
    }
    &:nth-child(2) {
      .warn-index {
        background-color: #fe8900;
      }
      .warn-number span {
        color: #fe8900;
      }
    }
    &:nth-child(3) {
      .warn-index {
        background-color: #fed700;
      }
      .warn-number span {
        color: #fed700;
      }
    }
    .warn-info {
      display: flex;
      height: 44px;
      align-items: center;
      padding-left: 16px;
      position: relative;
    }

    .warn-hide {
      display: none;
    }
    .warn-index {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      color: #000;
      background: #2b90f3;
      margin-right: 8px;
    }
    .warn-arrow {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .warn-number {
      span {
        color: #2b90f3;
      }
    }
  }
}

.right-control {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 170px;
  height: 480px;
  background: rgba(11, 32, 79, 0.9);
  border: 1px solid #3f9af3;
  z-index: 2;
  padding: 10px;
}
.control-title {
  margin: 6px 0;
}
.control-li {
  color: white;
  display: flex;
  height: 22px;
  align-items: center;
  margin-bottom: 10px;
}
.control-icon {
  margin: 0 10px;
  width: 20px;
  span {
    font-size: 18px;
  }
}
</style>
<style lang="scss">
.warn-info {
  border-radius: 4px;
  .el-radio-button__inner {
    background: #22345f;
    color: #2a8ae9;
    border: 1px solid #2b90f3;
    width: 76px;
  }
}
.right-control {
  .control-tab {
    // padding: 10px 0 0 8px;
  }
  .el-radio-button__inner {
    background: #22345f;
    color: #2a8ae9;
    border: 1px solid #2b90f3;
    width: 74px;
    height: 30px;
    padding: 8px 10px;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid #2b90f3;
  }
}
</style>
