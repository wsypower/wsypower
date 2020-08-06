<template>
  <div class="anJianQuShi">
    <div class="anJianQuShi-header">案件趋势</div>
    <div class="anJianQuShi-body">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: '',
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
  .anJianQuShi{
    height: 310px;
    width: 100%;
    &-header{
      width: 100%;
      height: 20px;
      border-left: 5px solid #00c0ff;
      padding-left: 8px;
      margin-bottom: 8px;
      margin-top: 10px;
      font-family: FZZCHJW;
      font-size: 18px;
      color: #ffffff;
      line-height: 23px;
    }
    &-body{
      width: 484px;
      height: 273px;
      background: url("./img/back-2.png");
      background-size: 100% 100%;
    }
  }
</style>
