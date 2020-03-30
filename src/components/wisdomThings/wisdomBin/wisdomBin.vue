<template>
  <div class="bin">
    <div class="header">
      智能垃圾桶
      <!-- <span class="right-open">
        <img src="./img/icon_open.png" alt />
      </span> -->
    </div>
    <div class="body">
      <div class="top">
        <div class="bin-info" flex>
          <div class="bin-box">
            <div class="right-line">
              <img src="./img/bin_line.png" alt />
            </div>
            <div class="bin-icon">
              <img src="./img/bin_normal.png" alt /> 正常
            </div>
            <div class="bin-number">{{numberInfo.normalCount}}</div>
          </div>
          <div class="bin-box">
            <div class="right-line">
              <img src="./img/bin_line.png" alt />
            </div>
            <div class="bin-icon">
              <img src="./img/bin_full.png" alt /> 待清运
            </div>
            <div class="bin-number">{{numberInfo.alarmCount}}</div>
          </div>
          <div class="bin-box">
            <div class="bin-icon">
              <img src="./img/bin_error.png" alt /> 待检修
            </div>
            <div class="bin-number">{{numberInfo.offlineCount}}</div>
          </div>
        </div>
      </div>
      <div class="list">
        <happy-scroll color="#073ec8" size="5" resize>
          <ul class="ul-box" style="width:446px">
            <li class="ul-body" v-for="(item, index) in tableDataList" :key="index">
              <span>
                <i>{{ index + 1 }}</i>
              </span>
              <span>
                {{ item.streetName }}报警
                <div class="number-color">{{item.year}}</div>起
              </span>
              <!-- <span class="type-span">
                <div class="type-box">{{ item.type }}</div>
              </span> -->
            </li>
          </ul>
        </happy-scroll>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bin",
  data() {
    return {
      numberInfo:{
        normalCount:0,
        alarmCount:0,
        offlineCount: 0
      },
      tableDataList: [
        {
          streetName: '',
          day: 0,
          month: 0,
          year: 0
        }
      ]
    };
  },
  mounted(){
    this.getData()
    this.getWarnData()
  },
  methods:{
    getData() {
      this.axios.get("/iot/device/state?deviceType=7")
        .then(response => {
          this.numberInfo = response.data.result;
          console.log('numberInfo',this.numberInfo);
         }
        )
    },
    getWarnData(){
      this.axios.post("/bigscreen/wasteWarn/")
        .then(response => {
          this.tableDataList = response.data.result;
          console.log('tableDataList',this.tableDataList);
         }
        )
    }
  },

};
</script>
<style lang="scss">
.list {
  .happy-scroll-container {
    height: 220px !important;
  }
}
</style>
<style lang="scss" scoped>
.header {
  height: 45px;
  background: url("./img/title.png") no-repeat;
  width: 180px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 45px;
  margin-bottom: 10px;
  font-weight: 600;
  position: relative;
  .right-open {
    position: absolute;
    right: -270px;
    cursor: pointer;
  }
}
.body {
  width: 450px;
  height: 283px;
  background: url("./img/small_back.png") no-repeat;
  // padding: 10px;
  // background-size: contain;
  padding: 10px 2px;
}
.bin-info {
  height: 50px;
  background: #13144b;
  align-items: center;
}
.bin-box {
  color: white;
  display: flex;
  font-size: 14px;
  width: 33.3%;
  justify-content: space-around;
  position: relative;
}
.right-line {
  position: absolute;
  right: 0;
  top: -6px;
}
.bin-number {
  color: #f7c61d;
  font-size: 20px;
}
.bin-icon {
  height: 30px;
  display: flex;
  align-items: center;
  img {
    margin-right: 4px;
  }
}

.ul-box {
  li {
    height: 40px;
    line-height: 40px;
    margin-top: 4px;
    list-style-type: none;
    &:first-child {
      margin-top: 0px;
    }
    span {
      display: inline-flex;
      text-align: left;

      &:nth-child(1) {
        width: 70px;
        padding-left: 30px;
      }
      &:nth-child(2) {
        width: 250px;
      }
      &:nth-child(3) {
        width: 100px;
      }
    }
  }
}

.number-color {
  color: #2b90f3;
  padding: 0px 5px;
}
.type-box {
  display: none;
  width: 50px;
  height: 22px;
  // background: #2b90f3;
  border-radius: 11px 11px 11px 0;
  color: #000;
}
.type-span {
  line-height: 22px;
  // text-align: right;
  padding-left: 46px;
  .type-box {
    text-align: center;
  }
}

.ul-body {
  height: 38px;
  line-height: 38px;
  background-color: rgba(28, 125, 250, 0.2);
  span {
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    letter-spacing: 0px;
    color: #ffffff;
    i {
      display: inline-block;
      width: 26px;
      height: 26px;
      border-radius: 26px;
      background-color: #00c0ff;
      color: #000000;
      text-align: center;
      vertical-align: middle;
      line-height: 26px;
      font-style: unset;
    }
  }

  &:nth-child(1) {
    i {
      background-color: #ff5959;
    }
    .number-color {
      color: #ff5959;
    }
    .type-box {
      display: block;
      background-color: #ff5959;
    }
  }
  &:nth-child(2) {
    i {
      background-color: #fe8900;
    }
    .number-color {
      color: #fe8900;
    }
    .type-box {
      display: block;
      background-color: #fe8900;
    }
  }
  &:nth-child(3) {
    i {
      background-color: #fed700;
    }
    .number-color {
      color: #fed700;
    }
    .type-box {
      display: block;
      background-color: #fed700;
    }
  }
}
</style>
