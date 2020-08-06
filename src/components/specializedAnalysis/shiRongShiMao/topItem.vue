<template>
  <div class="top-item" :class="{margin5:index!==0}" flex="dir:left cross:top">
    <div class="top-icon" :class="{one:index===0,two:index===1,three:index===2}"></div>
    <img src="./img/QQ01.png">
    <div class="top-item-message" :class="{border0:index===2}"  flex="dir:top">
      <div class="top-item-message-title">鲜丰水果</div>
      <div class="top-item-message-address text-01">地址：地址地址地址地址地址地址地址地址地址地址</div>
      <div class="top-item-message-content text-01"><span>店外经营：3次</span><span>整改率：98.3%</span></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'topItem',
    props:{
      index:{
        type: Number,
        default() {
          return 0;
        }
      },
      topData: {
        type:Object,
        default(){
          return {
            id: '',
            name: '',
            imgurl: '',
            address: '',
            type: '',
            num: '',
            rate: ''
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .top-item{
    width: 100%;
    height: 90px;
    position: relative;
    .top-icon{
      position: absolute;
      top: -7px;
      left: 0px;
      width: 38px;
      height: 44px;
      &.one{
        background: url("./img/icon_01.png");
      }
      &.two{
        background: url("./img/icon_02.png");
      }
      &.three{
        background: url("./img/icon_03.png");
      }
    }
    .img{
      width: 130px;
      height: 80px;
      border: solid 1px #19beec;
    }
    .top-item-message{
      flex: 1;
      margin-left: 15px;
      height: 100%;
      border-bottom: 1px solid ;
      border-image-source: linear-gradient(90deg, #3665db 0%, rgba(58, 132, 235, 0.2) 100%);
      border-image-slice: 1;
      &.border0{
        border-width: 0px;
      }
      &-title{
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .text-01{
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #93c9ff;
      }
      &-address{
        margin-top: 6px;
      }
      &-content{
        span:last-child{
          margin-left: 20px;
        }
      }
    }
    &.margin5{
      margin-top: 5px;
    }
  }
</style>
