<template>
  <div class="cover">
    <div class="header">智能窨井盖</div>
    <div class="body" flex>
      <div class="left">
        <ul class="cover-list">
          <li class="cover-li">
            <div class="cover-name blue">
              <span class="iconfont icon-manhole-cover"></span> 布控
            </div>
            <div class="cover-number">{{allNumber}}</div>
          </li>
          <li class="cover-li">
            <div class="cover-name green">
              <span class="iconfont icon-manhole-cover"></span> 正常
            </div>
            <div class="cover-number">{{normalNumber}}</div>
          </li>
          <li class="cover-li">
            <div class="cover-name yellow">
              <span class="iconfont icon-manhole-cover"></span> 移动告警
            </div>
            <div class="cover-number">{{warnNubmer}}</div>
          </li>
          <li class="cover-li">
            <div class="cover-name red">
              <span class="iconfont icon-manhole-cover"></span> 待检修
            </div>
            <div class="cover-number">0</div>
          </li>
        </ul>
      </div>
      <div class="right" id="chart">
        <instrument
          title="正常运行率"
          starClor="#7BE52B"
          endClor="#24A700"
          :percent="per"
          shadowColor="#29bd00"
          titlePosition="200"
        ></instrument>
      </div>
    </div>
  </div>
</template>

<script>
import Instrument from "../../summarize/instrument/instrument";
export default {
  components: { Instrument },
  data() {
    return {
      list:[],
      normalNumber:0,
      warnNubmer:0,
      allNumber:0,
      per:100
    };
  },
  methods: {
     getCoverData() {
      this.axios.get("/iot/device/list?deviceType=3")
        .then(response => {
          console.log('cover',response)
          let data = response.data.result;
          this.allNumber = data.length;
          let normalNumber = 0;
          let warnNubmer = 0;

          data.map(item=>{
            if(item.alarmStateName=="告警") {
              warnNubmer = warnNubmer + 1;
            }else {
              normalNumber = normalNumber + 1
            }
          })
          this.normalNumber = normalNumber;
          this.warnNubmer = warnNubmer;
          this.per = parseInt( (this.normalNumber / this.allNumber) * 100 ) || 100
          console.log('pre',this.per);
         }
        )
    }
  },
  mounted() {
    this.getCoverData();
  }
};
</script>

<style lang="scss" scoped>
.cover {
  margin-right: 20px;
}
.header {
  height: 45px;
  background: url("./img/title.png");
  width: 180px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 45px;
  margin-bottom: 10px;
  font-weight: 600;
}
.body {
  width: 450px;
  height: 283px;
  background: url("./img/small_back.png") no-repeat;
  padding: 20px;
}
.cover-list {
  margin: 0;
  padding: 0;
  list-style: none;
  color: white;
  padding-top: 10px;
}
.cover-li {
  .iconfont {
    font-size: 32px;
  }
}
.left {
  width: 200px;
  height: 250px;
  background: #1c2670;
  margin-right: 20px;
}
.right {
  width: 200px;
  height: 250px;
  background: #1c2670;
}

.cover-li {
  display: flex;
  justify-content: space-around;
  height: 50px;
  align-items: center;
  margin-bottom: 12px;
}
.cover-name {
  display: flex;
  align-items: center;
  font-size: 16px;
  width: 110px;
  .iconfont {
    margin-right: 10px;
  }
}
.cover-number {
  font-size: 20px;
  color: #f7c61d;
}
.blue .iconfont {
  color: #16c0db;
}
.green .iconfont {
  color: #16db4e;
}
.yellow .iconfont {
  color: #fec721;
}
.red .iconfont {
  color: #ff5959;
}
</style>
