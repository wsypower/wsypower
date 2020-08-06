<template>
  <div class="zhiHuiShiZhen" flex="dir:left main:justify">
    <div class="title_icon"></div>
    <div class="zhiHuiShiZhen-right">
      <div class="zhiHuiShiZhen-right-header">设备概况</div>
      <div class="zhiHuiShiZhen-right-body" flex>
        <div class="shebei-item" v-for="item in showData" :key="item.id" flex="dir:left cross:center">
          <div class="shebei-item_left" flex="cross:center main:center">
            <img :src="item.iconUrl">
          </div>
          <div class="shebei-item_right">
            <div class="shebei-item_right-num">
              <countTo
                separator=""
                :startVal="0"
                :endVal="item.num"
                :duration="2000"
              ></countTo>
            </div>
            <div class="shebei-item_right-text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import countTo from 'vue-count-to';
  export default {
    name: 'zhiHuiShiZhen',
    components:{
      countTo
    },
    data(){
      return {
        //定时器时间
        timer: 600000,
        showData:[{
          id: '001',
          name: '排水设备',
          num: 3128,
          iconUrl: require('./img/icon_paishui.png')
        },
          {
            id: '002',
            name: '智慧路灯',
            num: 145,
            iconUrl: require('./img/icon_ludeng.png')
          },{
            id: '003',
            name: '气瓶',
            num: 629,
            iconUrl: require('./img/icon_qiping.png')
          },{
            id: '004',
            name: '环卫车辆',
            num: 109,
            iconUrl: require('./img/icon_huanweiche.png')
          },{
            id: '005',
            name: '渣土车辆',
            num: 68,
            iconUrl: require('./img/icon_zhatuche.png')
          }]
      }
    },
    computed: {
      optionCode() {
        return this.$store.state.optionCode;
      },
      userId() {
        return this.$store.state.userId;
      }
    },
    watch: {
      optionCode: function () {
        this.acquire();
      },
    },
    created() {
      this.timer = SCREEN_CONFIG.setTimer
    },
    mounted() {
      this.acquire();
    },
    methods:{
      acquire() {

        // this.axios.post('/bigscreen/eventArea', this.qs.stringify({
        //   userId: this.userId,
        //   placecode: this.optionCode,
        // })).then(function (response) {
        //   if (response.data.code !== 0) {
        //     console.log(response)
        //   } else {
        //     this.hours = response.data.result.xData;
        //     this.title = response.data.result.yData;
        //     this.data = response.data.result.zData;
        //     this.pieChartInit()
        //   }
        // }.bind(this))
        //   .catch(function (error) {
        //     console.log(error)
        //   }.bind(this));
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'zhiHuiShiZhen';
</style>
