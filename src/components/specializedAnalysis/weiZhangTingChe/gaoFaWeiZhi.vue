<template>
  <div class="gaoFaWeiZhi">
    <div class="gaoFaWeiZhi-header">案件趋势</div>
    <div class="gaoFaWeiZhi-body">
      <ul class="gaoFaWeiZhi-body_thead">
        <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center">排名</span><span>路段位置</span><span>发现次数</span></li>
      </ul>
      <ul class="gaoFaWeiZhi-body_tbody">
        <my-scroll>
          <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center"><i>1</i></span><span>xxxx路与xxxx路交叉口</span><span>200000</span></li>
          <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center"><i>2</i></span><span>xxxx路与xxxx路交叉口</span><span>200000</span></li>
          <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center"><i>3</i></span><span>xxxx路与xxxx路交叉口</span><span>200000</span></li>
          <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center"><i>4</i></span><span>xxxx路与xxxx路交叉口</span><span>200000</span></li>
          <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center"><i>5</i></span><span>xxxx路与xxxx路交叉口</span><span>200000</span></li>
          <li flex="dir:left cross:center"><span flex="dir:left cross:center main:center"><i>6</i></span><span>xxxx路与xxxx路交叉口</span><span>200000</span></li>
        </my-scroll>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'gaoFaWeiZhi',
    data(){
      return{

      }
    }
  }
</script>
<style lang="scss" scoped>
  .gaoFaWeiZhi{
    height: 620px;
    width: 100%;
    &-header{
      width: 100%;
      height: 20px;
      border-left: 5px solid #00c0ff;
      padding-left: 8px;
      margin-bottom: 8px;
      font-family: FZZCHJW;
      font-size: 18px;
      color: #ffffff;
      line-height: 23px;
    }
    &-body{
      width: 484px;
      height: 594px;
      background: url("./img/back-1.png");
      background-size: 100% 100%;
      padding: 0px 40px;
      ul li span{
        text-align: left;
        &:nth-child(1){
          width: 50px;
        }
        &:nth-child(2){
          padding-left: 20px;
          width: 280px;
        }
        &:nth-child(3){
          width: 70px;
        }
      }
      &_thead{
        height: 60px;
        width: 100%;
        border-image-source: linear-gradient(90deg,
          rgba(30, 191, 245, 0.2) 0%,
          rgba(0, 254, 255, 0.98) 51%,
          #02fbfe 52%,
          rgba(30, 191, 245, 0.5) 76%,
          rgba(30, 191, 245, 0.2) 100%);
        border-image-slice: 1;
        border-bottom: 1px solid;
        li{
          height: 100%;
          span{
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;

          }
        }
      }
      &_tbody{
        width: 100%;
        li{
          width: 100%;
          height: 49px;
          border-bottom: 1px solid #171a6e;
          span{
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            color: #93c9ff;
            i{
              display:block;
              width: 24px;
              height: 24px;
              background-color: #00c0ff;
              border-radius: 6px;
              line-height: 24px;
              text-align: center;
              font-family: PingFang-SC-Heavy;
              font-size: 16px;
              color: #000000;
            }
          }
          &:first-child{
            span i{
              width: 30px;
              height: 31px;
              background: url("./img/icon_01.png");
              border-radius: unset;
            }
          }
          &:nth-child(2){
            span i{
              width: 30px;
              height: 31px;
              background: url("./img/icon_02.png");
              border-radius: unset;
            }
          }
          &:nth-child(3){
            span i{
              width: 30px;
              height: 31px;
              background: url("./img/icon_03.png");
              border-radius: unset;
            }
          }
        }
      }
    }
  }
</style>
