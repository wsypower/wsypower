<template>
  <div class="stateIcon" flex="dir:left">
    <div class="statue-item" v-for="item in dataList" :key="item.imgsrc" flex>
      <div class="statue-cion" flex="cross:center main:center">
        <img :src="item.imgsrc" alt="" />
      </div>
      <div class="statue-item-title" flex="dir:top main:justify">
        <div class="statue-item-title-text">
          {{ item.value }}
        </div>
        <div class="statue-item-title-nums">
          <countTo
            :startVal="item.datacreatVal"
            :endVal="item.datacreat"
            :duration="2000"
          ></countTo>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import countTo from 'vue-count-to';

export default {
  name: "stateIcon",
  components: {countTo},
  data(){
    return {
      interval: '',
      //定时器时间
      timer: 600000,
      dataList: [
        {
          value: '乡镇街道',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/xzjd.png'),
        },
        {
          value: '社区数',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/sqs.png'),
        },
        {
          value: '受理员',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/sly.png'),
        },
        {
          value: '监控数',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/jks.png'),
        },
        {
          value: '网格数',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/wgs.png'),
        },
        {
          value: '执法队员',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/zfdy.png'),
        },
        {
          value: '执法车辆',
          grand: 0,
          datacreatVal: 0,
          datacreat: 0,
          imgsrc: require('./img/zfcl.png'),
        }
        // ,
        // {
        //   value: '协管人员',
        //   grand: 0,
        //   datacreatVal: 0,
        //   datacreat: 0,
        //   imgsrc: require('./img/xgry.png'),
        // }
      ]
    }
  },
  created(){
    this.timer = SCREEN_CONFIG.setTimer
  },
  mounted(){
    this.cycleTime()
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
      this.cycleTime()
    },
  },
  methods: {
    cycleTime(){
      clearInterval(this.interval)
      this.acquire()
      this.interval = setInterval(() => {
        this.acquire()
      }, this.timer);
    },
    acquire(){
      this.axios.post('/bigscreen/areaSituation', this.qs.stringify({
        userId: this.userId,
        placecode: this.optionCode
      })).then(function (response){
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          // let upData = this.dataList;
          // upData.map((v, i, arr) => {
          //   arr[i].datacreatVal = parseInt(arr[i].datacreat);
          // })
          this.dataList[0].datacreat = 2; //parseInt(response.data.result.xzjds)
          this.dataList[1].datacreat = parseInt(response.data.result.sqs);
          this.dataList[2].datacreat = parseInt(response.data.result.slys);
          this.dataList[3].datacreat = parseInt(response.data.result.jks);
          this.dataList[4].datacreat = parseInt(response.data.result.wgs);
          this.dataList[5].datacreat = parseInt(response.data.result.zfdys);
          this.dataList[6].datacreat = parseInt(response.data.result.zfcls);
          console.log('this.dataList',this.dataList);
        }
      }.bind(this))
        .catch(function (error){
          console.log(error)
        }.bind(this));
    },
  }
}
</script>

<style scoped lang="scss">
@import "stateIcon";
</style>
