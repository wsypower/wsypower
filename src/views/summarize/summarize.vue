<template>
  <div class="summarize">
    <div class="summarize_header">
      <exponent></exponent>
    </div>
    <div class="summarize_content" flex>
      <div class="summarize_content_map">
        <ol-map @click-Back="clickPrint"></ol-map>
      </div>
      <!--<div class="summarize_content_icon">-->
        <!--<state-icon></state-icon>-->
      <!--</div>-->
      <div class="summarize_content_chart">
        <gross-chart></gross-chart>
      </div>
    </div>
    <div class="summarize_footer">
      <introduce></introduce>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Introduce from "../../components/summarize/introduce/introduce";
import Exponent from "../../components/summarize/exponent/exponent";
// import StateIcon from "../../components/summarize/stateIcon/stateIcon";
import GrossChart from "../../components/summarize/grossChart/grossChart";
//import Mainpage from "../../components/summarize/mapServe/MainPage";
import olMap from "../../components/map/olMap";
export default {
  name: "summarize",
  components: {olMap, GrossChart, Exponent, Introduce},
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
