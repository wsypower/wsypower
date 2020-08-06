<template>
  <div class="weiZhangTingChe" flex="dir:top main:justify">
    <div class="weiZhangTingChe_top" flex="dir:left">
      <div class="title_icon"></div>
      <div class="weiZhangTingChe_top-right">
        <wei-zhang-shu></wei-zhang-shu>
      </div>
    </div>
    <gao-fa-wei-zhi></gao-fa-wei-zhi>
  </div>
</template>
<script type="text/ecmascript-6">
  import WeiZhangShu from './weiZhangShu'
  import GaoFaWeiZhi from './gaoFaWeiZhi'
  export default {
    name: 'weiZhangTingChe',
    components:{
      WeiZhangShu,
      GaoFaWeiZhi
    },
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
  @import 'weiZhangTingChe';
</style>
