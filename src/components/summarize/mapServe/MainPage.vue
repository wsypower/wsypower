<template>
  <div id="map"></div>
</template>
<script type="text/ecmascript-6">
import 'ol/ol.css'
import {Map, View} from 'ol';
import {defaults} from 'ol/control';
import {locateTo} from "./mapUtils";

let map;
export default {
  name: "mainpage",
  data() {
    return {
      value: '111',
    }
  },
  mounted() {
    // 初始化地图底图
    this.initMap();
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
  },
  watch: {
    optionCode: function (old) {
      // locateTo(map, old);
    },
  },
  methods: {
    initMap() {
      const _this = this;
      /* 添加影像地图 */
      map = new Map({
        loadTilesWhileAnimating: true,
        target: 'map',
        view: new View({
          projection: 'EPSG:4326',
          center: [122.22190299972,30.26656000004],
          zoom: 12,
          maxZoom: 20,
          minZoom: 9
        }),
        controls: defaults({attribution: false, rotate: false, zoom: false}) // 默认控件配置
      });
      let pointer = locateTo(map,this.$store.state.optionCode);
      // 鼠标移动事件
      pointer.on('select', function (e) {
        let feature = e.target.getFeatures().getArray()[0]
        if (feature) {
          console.log(feature.get('code'))
        }
      });
      // 单击事件
      map.on('click', function ({pixel}) {
        let feature = map.forEachFeatureAtPixel(pixel, feature => feature);
        if (feature) {
          console.log('feature-code',feature.get('code'),feature.get('name'));
          if(feature.get('name').indexOf('高亭')>=0){
            _this.$store.commit('setOption', '330921001')
          }
          else{
            _this.$store.commit('setOption', feature.get('code'))
          }
        }
      });
    },
  }
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
