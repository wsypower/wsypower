<template>
  <div class="summarize">
    <div class="summarize_header" flex="dir:left cross:center main:center">
      <div class="h-left"></div>
      <exponent></exponent>
      <div class="h-right"></div>
    </div>
    <div class="summarize_main-content" flex="dir:left cross:center main:justify">
      <div class="summarize_left">
        <gross-chart></gross-chart>
      </div>
      <div class="summarize_content" flex="dir:top cross:center main:justify">
        <div class="summarize_content_map">
          <!--<ol-map @click-Back="clickPrint"></ol-map>-->
          <mainpage></mainpage>
        </div>
        <div class="summarize_footer">
          <introduce></introduce>
        </div>
      </div>
      <div class="summarize_right">
        <introduce-two></introduce-two>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Introduce from "../../components/summarize/introduce/introduce";
import Exponent from "../../components/summarize/exponent/exponent";
import GrossChart from "../../components/summarize/grossChart/grossChart";
import Mainpage from "../../components/summarize/mapServe/MainPage";
import olMap from "../../components/map/olMap";
import IntroduceTwo from "../../components/summarize/introduce/two";
export default {
  name: "summarize",
  components: {olMap, GrossChart, Exponent, Introduce,IntroduceTwo, Mainpage},
  data() {
    return {
    }
  },
  methods: {
    clickPrint(val) {
      if(val === '330921100'){
        this.$store.commit('setOption', '330921001');
      }
      else{
        this.$store.commit('setOption', val);
      }
      console.log('clickPrint',val)
    }
  },
}
</script>

<style scoped lang="scss">
@import "summarize";
</style>
