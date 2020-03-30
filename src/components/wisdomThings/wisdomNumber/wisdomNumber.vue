<template>
  <div class="number-box">
    <ul class="wisdom-list" flex=" cross:center">
      <li class="wisdom-li" flex>
        <div class="wisdom-icon">
          <roll-animation>
            <span class="iconfont icon-manhole-cover"></span>
          </roll-animation>
        </div>
        <div class="wisdom-info">
          <p>- 智能窨井盖 -</p>
          <div>
            <span>50</span> 个
          </div>
        </div>
      </li>
      <li class="wisdom-li" flex>
        <div class="wisdom-icon">
          <roll-animation>
            <span class="iconfont icon-shanchulaji"></span>
          </roll-animation>
        </div>
        <div class="wisdom-info">
          <p>- 智能垃圾桶 -</p>
          <div>
            <span>16</span> 个
          </div>
        </div>
      </li>
      <li class="wisdom-li" flex>
        <div class="wisdom-icon">
          <roll-animation>
            <span class="iconfont icon-ludeng"></span>
          </roll-animation>
        </div>
        <div class="wisdom-info">
          <p>- 智慧路灯 -</p>
          <div>
            <span>8</span> 个
          </div>
        </div>
      </li>
      <li class="wisdom-li" flex>
        <div class="wisdom-icon">
          <roll-animation>
            <span class="iconfont icon-shuiweijiance"></span>
          </roll-animation>
        </div>
        <div class="wisdom-info">
          <p>- 水位监控 -</p>
          <div>
            <span>2</span> 个
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import RollAnimation from "../../filesDispose/rollNum/rollAnimation/rollAnimation";

export default {
  name: "number",
  components: { RollAnimation },
  data(){
    return {
      list: [{'deviceCount': 0},{'deviceCount': 0},{'deviceCount': 0} ]
    }
  },
  mounted() {
    this.getCoverData();
  },
  methods:{
    getCoverData() {
      // this.axios.get("/iot/device/state")
      //   .then(response => {
      //
      //     this.list = response.data.result.list;
      //
      //    }
      //   )
    }
  },


};
</script>

<style lang="scss" scoped>
.number-box {
  width: 100%;
  height: 128px;
  background: url("./img/number_back.png") no-repeat;
  margin-bottom: 34px;
}
.wisdom-list {
  height: 128px;
  justify-content: space-around;
  color: rgb(73, 217, 254);
}
.wisdom-icon {
  margin-right: 10px;
  .iconfont {
    font-size: 20px;
  }
}
.wisdom-info {
  p {
    font-size: 16px;
    color: white;
    font-weight: 600;
  }
  div {
    color: #f7c61d;
    font-size: 16px;
    span {
      font-family: "LCD";
      font-size: 30px;
    }
  }
}
</style>
