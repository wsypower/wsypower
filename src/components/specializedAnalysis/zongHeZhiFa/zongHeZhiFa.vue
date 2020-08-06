<template>
  <div class="zongHeZhiFa" flex="dir:top main:justify">
    <div class="zongHeZhiFa_top" flex="dir:left">
      <div class="title_icon"></div>
      <div class="zongHeZhiFa_top-right">
        <an-jian-shu></an-jian-shu>
      </div>
    </div>
    <an-you-zhan-bi></an-you-zhan-bi>
    <an-jian-qu-shi></an-jian-qu-shi>
  </div>
</template>
<script type="text/ecmascript-6">
  import AnJianShu from './anJianShu'
  import AnYouZhanBi from './anYouZhanBi'
  import AnJianQuShi from './anJianQuShi'
  export default {
    name: 'zongHeZhiFa',
    components:{
      AnJianShu,
      AnYouZhanBi,
      AnJianQuShi
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
  @import 'zongHeZhiFa'
</style>
