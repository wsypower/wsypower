<template>
  <div class="anjianshu">
    <div class="anjianshu-row" flex="dir:left cross:center">
      <div class="anjianshu-row-col">
        <div class="anjianshu-row-col-num">
          <countTo
            separator=""
            :startVal="0"
            :endVal="anJianData[0].num"
            :duration="2000"
          ></countTo>
        </div>
        <div class="anjianshu-row-col-text">
          {{anJianData[0].name}}
        </div>
      </div>
      <div class="anjianshu-row-col">
        <div class="anjianshu-row-col-num">
          <countTo
            separator=""
            :startVal="0"
            :endVal="anJianData[1].num"
            :duration="2000"
          ></countTo>
        </div>
        <div class="anjianshu-row-col-text">
          {{anJianData[1].name}}
        </div>
      </div>
    </div>
    <div class="anjianshu-row" flex="dir:left cross:center">
      <div class="anjianshu-row-col">
        <div class="anjianshu-row-col-num">
          <countTo
            separator=""
            :startVal="0"
            :endVal="anJianData[2].num"
            :duration="2000"
          ></countTo>
        </div>
        <div class="anjianshu-row-col-text">
          {{anJianData[2].name}}
        </div>
      </div>
      <div class="anjianshu-row-col">
        <div class="anjianshu-row-col-num">
          <countTo
            separator=""
            :startVal="0"
            :endVal="anJianData[3].num"
            :duration="2000"
          ></countTo>
        </div>
        <div class="anjianshu-row-col-text">
          {{anJianData[3].name}}
        </div>
      </div>
    </div>
    <div class="anjianshu-row" flex="dir:left cross:center">
      <div class="anjianshu-row-col">
        <div class="anjianshu-row-col-num">
          <countTo
            separator=""
            :startVal="0"
            :endVal="anJianData[4].num"
            :duration="2000"
          ></countTo>
        </div>
        <div class="anjianshu-row-col-text">
          {{anJianData[4].name}}
        </div>
      </div>
      <div class="anjianshu-row-col">
        <div class="anjianshu-row-col-num">
          <countTo
            separator=""
            :startVal="0"
            :endVal="anJianData[5].num"
            :duration="2000"
          ></countTo>
        </div>
        <div class="anjianshu-row-col-text">
          {{anJianData[5].name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import countTo from 'vue-count-to';
  export default {
    name: 'anJianShu',
    components:{
      countTo
    },
    data(){
      return {
        anJianData:[{
          id: '001',
          name: '总案件数',
          num: 3112
        },{
          id: '002',
          name: '一般案件数',
          num: 3232
        },{
          id: '003',
          name: '简易案件数',
          num: 3212
        },{
          id: '004',
          name: '重大案件数',
          num: 3212
        },{
          id: '005',
          name: '立案案件数',
          num: 3212
        },{
          id: '006',
          name: '决定案件数',
          num: 3212
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .anjianshu{
    width: 100%;
    height: 100%;
    .anjianshu-row{
      width: 100%;
      height: 70px;
      border-image-source: linear-gradient(90deg,
        rgba(102, 148, 253, 0.2) 0%,
        rgba(102, 148, 253, 0.5) 51%,
        rgba(102, 148, 253, 0.5) 52%,
        rgba(102, 148, 253, 0.2) 100%);
      border-image-slice: 1;
      border-bottom: 1px solid;
      .anjianshu-row-col{
        width: 50%;
        &-num{
          font-family: FZZCHJW;
          font-size: 18px;
          color: #00c0ff;
        }
        &-text{
          font-family: PingFang-SC-Bold;
          font-size: 16px;
          color: #ffffff;
        }
      }
      &:last-child{
        border-width: 0px;
      }
    }
  }
</style>
