<template>
  <div class="exponent" flex="cross:center main:center">
    <div
      class="exponent__item"
      v-for="item in dataList"
      :key="item.imgsrc"
      flex
    >
      <div class="exponent__item_icon" flex="main:center">
        <!--转圈的圆形-->
        <roll-animation>
          <img :src="item.imgsrc" alt="" />
        </roll-animation>
      </div>
      <div class="exponent__item_title" flex="cross:center">
        <div class="">{{ item.name }}：</div>
        <div class="exponent__item_title_nums" flex="cross:center main:center">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import RollAnimation from "../../filesDispose/rollNum/rollAnimation/rollAnimation";
export default {
  name: "exponent",
  components: {RollAnimation},
  data() {
    return {
      timer: 600000,
      dataList: [
        {
          name: '文明指数',
          value: 96,
          imgsrc: require('./img/wenmingzhishu.png'),
        },
        {
          name: '整洁指数',
          value:97,
          imgsrc: require('./img/zhengjiezhishu.png'),

        },
        {
          name: '绿色指数',
          value: 97,
          imgsrc: require('./img/lvsezhishu.png'),

        },
        {
          name: '安全指数',
          value: 99,
          imgsrc: require('./img/anquanzhishu.png'),
        },
        {
          name: '效率指数',
          value:99,
          imgsrc: require('./img/xiaolvzhishu.png'),
        }
      ]
    }
  },
  computed: {
    optionCode(){
      return this.$store.state.optionCode;
    },
    userId(){
      return this.$store.state.userId;
    }
  },
  watch: {
    optionCode: function (){
      this.cycleTime();
    }
  },
  created(){
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted(){
    this.cycleTime();
  },
  methods:{
    cycleTime(){
      clearInterval(this.interval);
      this.getDataList();
      this.interval = setInterval(() => {
        this.getDataList()
      }, this.timer);
    },
    getDataList(){
      this.axios.post('/bigscreen/getCGFiveExpornet', this.qs.stringify({
        placecode: this.optionCode,
        userId: this.userId
      })).then(function (response){
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          console.log('getCGFiveExpornet',response.data);
          this.dataList[0].value = response.data.result.wmzs;
          this.dataList[1].value = response.data.result.zjzs;
          this.dataList[2].value = response.data.result.lszs;
          this.dataList[3].value = response.data.result.aqzs;
          this.dataList[4].value = response.data.result.xlzs;
        }
      }.bind(this))
    }
  }
}
</script>

<style scoped lang="scss">
@import "exponent";
</style>
