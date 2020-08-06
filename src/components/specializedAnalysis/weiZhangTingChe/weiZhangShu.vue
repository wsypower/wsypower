<template>
  <div class="weizhangshu">
    <div class="weizhangshu-row" flex="dir:left cross:center main:justify" v-for="item in anJianData" :key="item.id">
      <div class="weizhangshu-row-left" flex="dir:left cross:center">
        <div class="weizhangshu-row_icon" :class="item.className" flex="cross:center main:center">
          <img :src="item.iconUrl"/>
        </div>
        <div class="weizhangshu-row_text">
          {{item.name}}
        </div>
      </div>
      <div class="weizhangshu-row_num" v-if="item.id!='004'">
        <countTo
          separator=""
          :startVal="0"
          :endVal="item.num"
          :duration="2000"
        ></countTo>
      </div>
      <div class="weizhangshu-row_num"  v-else>
        <countTo
          separator=""
          :decimals="2"
          :startVal="0"
          :endVal="item.num"
          :duration="2000"
        ></countTo>%
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import countTo from 'vue-count-to';
  export default {
    name: 'weizhangshu',
    components:{
      countTo
    },
    data(){
      return {
        anJianData:[{
          id: '001',
          name: '智能发现',
          num: 32123,
          iconUrl: require('./img/icon_zhinengfaxian.png'),
          className:'first'
        },{
          id: '002',
          name: '立案数',
          num: 32123,
          iconUrl: require('./img/icon_lianshupng.png'),
          className: 'second'
        },{
          id: '003',
          name: '处置数',
          num: 1212,
          iconUrl: require('./img/icon_chuzhishu.png'),
          className: 'third'
        },{
          id: '004',
          name: '处置率',
          num: 60.55,
          iconUrl: require('./img/icon_chuzhilv.png'),
          className: 'fourth'
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .weizhangshu{
    width: 100%;
    height: 100%;
    .weizhangshu-row{
      width: 100%;
      height: 52px;
      border-image-source: linear-gradient(90deg,
        rgba(102, 148, 253, 0.5) 0%,
        rgba(102, 148, 253, 0.2) 100%);
      border-image-slice: 1;
      border-bottom: 1px solid;
      &_icon {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        &.first{
          background-color: #02f2fc;
        }
        &.second{
          background-color: #5aefc5;
        }
        &.third{
          background-color: #ffbf69;
        }
        &.fourth{
          background-color: #7854fd;
        }
      }
      &_num{
        font-family: FZZCHJW;
        font-size: 18px;
        color: #00c0ff;
      }
      &_text{
        margin-left: 20px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #ffffff;
      }
      &:last-child{
        border-width: 0px;
      }
    }
  }
</style>
