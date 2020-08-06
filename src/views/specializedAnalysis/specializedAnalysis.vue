<template>
  <div class="specialized-analysis-page" flex="dir:left cross:center main:justify">
    <div class="specialized-analysis_left" flex="dir:top main:justify">
      <shirongshimao></shirongshimao>
      <zhihuishizhen></zhihuishizhen>
    </div>
    <div class="specialized-analysis_center" flex="dir:top main:justify">
      <zonghezhifa></zonghezhifa>
    </div>
    <div class="specialized-analysis_right" flex="dir:top main:justify">
      <weizhangtingche></weizhangtingche>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Shirongshimao from "../../components/specializedAnalysis/shiRongShiMao/shiRongShiMao";
  import Zhihuishizhen from "../../components/specializedAnalysis/zhiHuiShiZhen/zhiHuiShiZhen";
  import Zonghezhifa from "../../components/specializedAnalysis/zongHeZhiFa/zongHeZhiFa";
  import Weizhangtingche from "../../components/specializedAnalysis/weiZhangTingChe/weiZhangTingChe";
export default {
  name: 'specializedAnalysis',
  components:{
    Shirongshimao,
    Zhihuishizhen,
    Zonghezhifa,
    Weizhangtingche
  }

}
</script>
<style lang="scss" scoped>
  @import "specializedAnalysis";
</style>
