<template>
  <div class="introduce_two" flex="dir:top">
    <div class="introduce_item">
      <div class="introduce_item-header"></div>
      <div class="introduce_item-content">
        <state-icon></state-icon>
      </div>
    </div>
    <div class="introduce_item introduce_item-back">
      <div class="introduce_item-header"></div>
      <div class="introduce_item-content" flex="dir:left">
        <div
          class="introduce_item_area"
          flex="cross:center main:center"
          v-for="item in area"
          :class="{ navactve: item.code == optionCode }"
          @click="areaClick(item.value, item.code)"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
    <div class="introduce_item">
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="people.startVal"
          :endVal="people.endVal"
          :duration="people.grand"
          :decimals="people.decimals"
        ></countTo>
      </div>
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="cityarea.startVal"
          :endVal="cityarea.endVal"
          :duration="cityarea.grand"
          :decimals="cityarea.decimals"
        ></countTo>
      </div>
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="landarea.startVal"
          :endVal="landarea.endVal"
          :duration="landarea.grand"
          :decimals="landarea.decimals"
        ></countTo>
      </div>
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="seaarea.startVal"
          :endVal="seaarea.endVal"
          :duration="seaarea.grand"
          :decimals="seaarea.decimals"
        ></countTo>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import countTo from 'vue-count-to';
import StateIcon from "../stateIcon/stateIcon";

export default {
  name: "introduceTwo",
  components: {countTo, StateIcon},
  mounted() {
    //this.uplodData(this.$store.state.optionCode)
  },
  created() {

  },
  watch: {
    // optionCode: function (val) {
    //   this.uplodData(val)
    // },
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
    optionHover() {
      return {
        step: 0.5,
        limitMoveNum: 4,
      }
    },

    area() {
      return [
        {
          value: '普陀山镇',
          code: '330921001'
        },
        {
          value: '六横镇',
          code: '330921106'
        },
        {
          value: '桃花镇',
          code: '330921101'
        },
        {
          value: '虾峙镇',
          code: '330921103'
        },
        {
          value: '东极镇',
          code: '330921105'
        },
        {
          value: '沈家门街道',
          code: '330921102'
        },
        {
          value: '东港街道',
          code: '330921200'
        },
        {
          value: '朱家尖街道',
          code: '330921200'
        },
        {
          value: '展茅街道',
          code: '330921200'
        }
      ]
    }
  },
  data() {
    return {
      people: {
        startVal: 0,
        endVal: 39.12,
        grand: 1000,
        decimals: 2
      },
      cityarea: {
        startVal: 0,
        endVal: 6728,
        grand: 1000,
        decimals: 2
      },
      landarea: {
        startVal: 0,
        endVal:458.6,
        grand: 1000,
        decimals: 2
      },
      seaarea: {
        startVal: 0,
        endVal: 6269.4,
        grand: 1000,
        decimals: 2
      }
    }
  },
  methods: {
    replica(area) {
      this.exhibition = area
      this.people.startVal = this.people.endVal
      this.people.endVal = area.people
      this.cityarea.startVal = this.cityarea.endVal
      this.cityarea.endVal = area.area
    },
    areaClick(val, code) {
      console.log(val)
      console.log(code)
      // if(code!=='330921001'){
      //
      // }
      // else{
        this.$store.commit('setOption', code)
      // }

    },
  },
}
</script>

<style scoped lang="scss">
@import "introduce_two";
</style>
