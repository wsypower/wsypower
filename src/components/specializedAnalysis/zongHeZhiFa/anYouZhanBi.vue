<template>
  <div class="anYouZhanBi">
    <div class="anYouZhanBi-header">案由占比</div>
    <div class="anYouZhanBi-body">

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
  .anYouZhanBi{
    height: 290px;
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
      height: 264px;
      background: url("./img/back-1.png");
      background-size: 100% 100%;
    }
  }
</style>
